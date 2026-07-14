import {mkdir, writeFile} from 'node:fs/promises'
import {dirname, resolve} from 'node:path'
import {assertExpectedSource, readNdjson, selectSourceDocuments, sourceHash, stableStringify} from './lib.mjs'
import {collectTranslatableStrings} from './translatable.mjs'

const [, , sourceArg, outputArg = 'scripts/i18n/translations.template.json'] = process.argv

if (!sourceArg) {
  throw new Error('Uso: node scripts/i18n/generate-template.mjs <data.ndjson> [salida.json]')
}

const sourcePath = resolve(sourceArg)
const outputPath = resolve(outputArg)
const documents = selectSourceDocuments(await readNdjson(sourcePath))
assertExpectedSource(documents)

const template = {
  generatedFrom: sourcePath,
  documents: Object.fromEntries(documents.map((document) => [document._id, {
    type: document._type,
    sourceHash: sourceHash(document),
    slug: document.slug?.current || null,
    translations: Object.fromEntries(
      collectTranslatableStrings(document).map(({path, source}) => [path, {source, en: ''}])
    ),
  }])),
}

await mkdir(dirname(outputPath), {recursive: true})
await writeFile(outputPath, stableStringify(template), 'utf8')
console.log(`Plantilla creada: ${outputPath}`)
