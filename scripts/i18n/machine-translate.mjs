import {readFile, rename, writeFile} from 'node:fs/promises'
import {resolve} from 'node:path'
import {setTimeout as wait} from 'node:timers/promises'

const [, , inputArg = 'scripts/i18n/translations.template.json', outputArg = 'scripts/i18n/translations.en.json'] = process.argv
const inputPath = resolve(inputArg)
const outputPath = resolve(outputArg)
const manifest = JSON.parse(await readFile(inputPath, 'utf8'))

let accessToken

async function getAccessToken() {
  const response = await fetch('https://edge.microsoft.com/translate/auth')
  if (!response.ok) throw new Error(`No fue posible obtener el token de traducción: ${response.status}`)
  return response.text()
}

async function requestTranslations(entries, attempt = 1) {
  accessToken ||= await getAccessToken()
  const response = await fetch(
    'https://api-edge.cognitive.microsofttranslator.com/translate?api-version=3.0&from=es&to=en',
    {
      method: 'POST',
      headers: {
        authorization: `Bearer ${accessToken}`,
        'content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(entries.map(({source}) => ({Text: source}))),
    }
  )

  if (!response.ok) {
    if (attempt < 4) {
      if (response.status === 401) accessToken = undefined
      await wait(response.status === 429 ? 15_000 * attempt : 1_000 * attempt)
      return requestTranslations(entries, attempt + 1)
    }
    throw new Error(`Microsoft Translator respondió ${response.status}`)
  }

  const payload = await response.json()
  return payload.map((item, index) =>
    preserveOuterWhitespace(entries[index].source, item.translations[0].text)
  )
}

function preserveOuterWhitespace(source, translated) {
  const leading = source.match(/^\s*/)?.[0] || ''
  const trailing = source.match(/\s*$/)?.[0] || ''
  return `${leading}${translated.trim()}${trailing}`
}

async function translateBatch(entries) {
  return requestTranslations(entries)
}

let completed = 0
const total = Object.values(manifest.documents).reduce(
  (count, document) => count + Object.keys(document.translations).length,
  0
)

async function save() {
  const temporaryPath = `${outputPath}.tmp`
  await writeFile(temporaryPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8')
  await rename(temporaryPath, outputPath)
}

const pending = Object.values(manifest.documents)
  .flatMap((document) => Object.values(document.translations))
  .filter((entry) => !entry.en)

const batches = []
let currentBatch = []
let currentLength = 0

for (const entry of pending) {
  const entryLength = entry.source.length + 32
  if (currentBatch.length && currentLength + entryLength > 3500) {
    batches.push(currentBatch)
    currentBatch = []
    currentLength = 0
  }
  currentBatch.push(entry)
  currentLength += entryLength
}
if (currentBatch.length) batches.push(currentBatch)

for (const [index, batch] of batches.entries()) {
  const translations = await translateBatch(batch)
  batch.forEach((entry, batchIndex) => {
    entry.en = translations[batchIndex]
    completed += 1
  })

  console.log(`Lote ${index + 1}/${batches.length}: ${completed}/${pending.length} cadenas`)
  await save()

  await wait(500)
}

await save()
console.log(`Borrador guardado en ${outputPath}`)
