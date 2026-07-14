import {readFile, stat} from 'node:fs/promises'
import {resolve} from 'node:path'
import {createClient} from 'next-sanity'
import {ENGLISH_SLUGS, SEO_DOCUMENTS} from './content-config.mjs'
import {
  assertExpectedSource,
  createMetadataDocument,
  readNdjson,
  selectSourceDocuments,
  sourceHash,
  stripSystemFields,
  translationId,
} from './lib.mjs'
import {applyStringTranslations} from './translatable.mjs'

function parseArguments(argv) {
  const options = {apply: false, manifest: 'scripts/i18n/translations.en.json'}

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index]
    if (argument === '--apply') options.apply = true
    else if (argument.startsWith('--')) options[argument.slice(2)] = argv[++index]
  }

  return options
}

function clone(value) {
  return structuredClone(value)
}

function seoId(key, locale) {
  return `seo-${key}-${locale}`
}

function createSeoDocument(definition, locale) {
  return {
    _id: seoId(definition.key, locale),
    _type: 'seoPage',
    language: locale,
    seo: clone(definition[locale]),
  }
}

function rewriteInternalLinks(value) {
  if (Array.isArray(value)) {
    value.forEach(rewriteInternalLinks)
    return
  }
  if (!value || typeof value !== 'object') return

  if (typeof value.href === 'string' && (value.href.startsWith('/') || value.href.startsWith('http'))) {
    try {
      const url = new URL(value.href, 'https://ulisessanchez.me')
      if (url.hostname.replace(/^www\./, '') === 'ulisessanchez.me') {
        const path = url.pathname.replace(/^\/(es|en)(?=\/|$)/, '') || '/'
        const segments = path.split('/').filter(Boolean)
        const sourceSlug = segments[1]
        if (sourceSlug) {
          const sourceEntry = Object.entries(ENGLISH_SLUGS).find(([sourceId]) =>
            sourceId && sourceSlug === currentSourceSlugs.get(sourceId)
          )
          if (sourceEntry) segments[1] = sourceEntry[1]
        }
        value.href = `/${segments.join('/')}${url.search}${url.hash}`
      }
    } catch {
      // Preserve malformed or non-URL authoring values for manual review.
    }
  }

  Object.values(value).forEach(rewriteInternalLinks)
}

let currentSourceSlugs = new Map()

const REQUIRED_FIELDS = {
  article: ['name', 'shortDescription', 'slug.current', 'description'],
  project: ['name', 'shortDescription', 'slug.current', 'description'],
  profile: ['fullName', 'headline', 'shortBiography', 'fullBiography'],
  job: ['name', 'jobTitle', 'description'],
  education: ['name', 'studyCenter', 'description'],
  category: ['name', 'key', 'slug.current'],
}

function hasValueAtPath(document, path) {
  const value = path.split('.').reduce((current, segment) => current?.[segment], document)
  return Array.isArray(value) ? value.length > 0 : value !== undefined && value !== null && value !== ''
}

function buildPlan(sourceDocuments, manifest) {
  assertExpectedSource(sourceDocuments)
  const sourceById = new Map(sourceDocuments.map((document) => [document._id, document]))
  currentSourceSlugs = new Map(
    sourceDocuments.map((document) => [document._id, document.slug?.current]).filter(([, slug]) => slug)
  )
  const errors = []

  for (const document of sourceDocuments) {
    const entry = manifest.documents[document._id]
    if (!entry) {
      errors.push(`${document._id}: no existe en el manifiesto de traducción`)
      continue
    }
    const actualHash = sourceHash(document)
    if (entry.sourceHash !== actualHash) {
      errors.push(`${document._id}: hash fuente distinto (${actualHash})`)
    }
  }

  const stages = [
    {name: '1-base-es', mutations: []},
    {name: '2-categorias-en', mutations: []},
    {name: '3-contenido-en', mutations: []},
    {name: '4-seo-bilingue', mutations: []},
  ]
  const translatedDocuments = []
  const metadataDocuments = []

  for (const source of sourceDocuments) {
    const sourceSlug = source.slug?.current
    const spanishSet = {language: 'es'}
    if (source._type === 'category') spanishSet.key = sourceSlug
    stages[0].mutations.push({kind: 'patch', id: source._id, set: spanishSet})

    const manifestEntry = manifest.documents[source._id]
    if (!manifestEntry) continue
    const translated = stripSystemFields(clone(source))
    translated._id = translationId(source._id)
    translated.language = 'en'

    const translations = Object.fromEntries(
      Object.entries(manifestEntry.translations).map(([path, entry]) => [path, entry.en])
    )
    const missing = applyStringTranslations(translated, translations)
    if (missing.length) errors.push(`${source._id}: faltan traducciones para ${missing.join(', ')}`)

    if (sourceSlug) {
      const englishSlug = ENGLISH_SLUGS[source._id]
      if (!englishSlug) errors.push(`${source._id}: falta slug inglés`)
      translated.slug = {...translated.slug, current: englishSlug}
    }

    if (source._type === 'category') translated.key = sourceSlug

    if (Array.isArray(translated.categories)) {
      translated.categories = translated.categories.map((reference) => ({
        ...reference,
        _ref: translationId(reference._ref),
      }))
    }
    rewriteInternalLinks(translated)

    for (const field of REQUIRED_FIELDS[source._type] || []) {
      if (!hasValueAtPath(translated, field)) errors.push(`${translated._id}: falta el campo obligatorio ${field}`)
    }

    const metadata = createMetadataDocument(source, translated)
    translatedDocuments.push(translated)
    metadataDocuments.push(metadata)
    const stage = source._type === 'category' ? stages[1] : stages[2]
    stage.mutations.push({kind: 'createIfNotExists', document: translated})
    stage.mutations.push({kind: 'createIfNotExists', document: metadata})
  }

  for (const definition of SEO_DOCUMENTS) {
    const spanish = createSeoDocument(definition, 'es')
    const english = createSeoDocument(definition, 'en')
    const metadata = createMetadataDocument(spanish, english)
    stages[3].mutations.push({kind: 'createIfNotExists', document: spanish})
    stages[3].mutations.push({kind: 'createIfNotExists', document: english})
    stages[3].mutations.push({kind: 'createIfNotExists', document: metadata})
    metadataDocuments.push(metadata)
  }

  const slugKeys = new Set()
  for (const document of [...sourceDocuments, ...translatedDocuments]) {
    const slug = document.slug?.current
    if (!slug) continue
    const language = document.language || 'es'
    const key = `${document._type}:${language}:${slug}`
    if (slugKeys.has(key)) errors.push(`slug duplicado: ${key}`)
    slugKeys.add(key)
  }

  for (const document of translatedDocuments.filter(({categories}) => Array.isArray(categories))) {
    for (const reference of document.categories) {
      const sourceId = reference._ref.replace(/^i18n-en-/, '')
      if (sourceById.get(sourceId)?._type !== 'category') {
        errors.push(`${document._id}: referencia de categoría inválida ${reference._ref}`)
      }
    }
  }

  if (metadataDocuments.length !== 31) {
    errors.push(`se esperaban 31 documentos translation.metadata y se prepararon ${metadataDocuments.length}`)
  }

  if (errors.length) throw new Error(`La migración no es segura:\n- ${errors.join('\n- ')}`)

  return {stages, translatedDocuments, metadataDocuments}
}

function createSanityClient({projectId, dataset, token}) {
  return createClient({
    projectId,
    dataset,
    token,
    apiVersion: '2026-07-01',
    useCdn: false,
    perspective: 'published',
  })
}

async function assertBackup(filePath) {
  if (!filePath) throw new Error('La ejecución requiere --backup <export.tar.gz>.')
  const backup = await stat(resolve(filePath))
  if (!backup.isFile() || backup.size === 0) throw new Error('El respaldo indicado no es un archivo válido.')
}

async function applyStages(client, stages) {
  for (const stage of stages) {
    let transaction = client.transaction()
    for (const mutation of stage.mutations) {
      if (mutation.kind === 'patch') {
        transaction = transaction.patch(mutation.id, {set: mutation.set})
      } else {
        transaction = transaction.createIfNotExists(mutation.document)
      }
    }
    await transaction.commit({autoGenerateArrayKeys: true})
    console.log(`Etapa aplicada: ${stage.name} (${stage.mutations.length} mutaciones)`)
  }
}

const options = parseArguments(process.argv.slice(2))
const manifest = JSON.parse(await readFile(resolve(options.manifest), 'utf8'))
let sourceDocuments
let client

if (options.apply) {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
  const token = process.env.SANITY_API_WRITE_TOKEN

  if (!projectId || !dataset || !token) {
    throw new Error('Faltan NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET o SANITY_API_WRITE_TOKEN.')
  }
  if (options['confirm-project'] !== projectId || options['confirm-dataset'] !== dataset) {
    throw new Error('Confirma el destino con --confirm-project y --confirm-dataset.')
  }
  await assertBackup(options.backup)
  client = createSanityClient({projectId, dataset, token})
  const sourceIds = Object.keys(manifest.documents)
  sourceDocuments = await client.fetch('*[_id in $sourceIds]', {sourceIds})
} else {
  if (!options.source) throw new Error('El dry run offline requiere --source <data.ndjson>.')
  sourceDocuments = selectSourceDocuments(await readNdjson(resolve(options.source)))
}

const plan = buildPlan(sourceDocuments, manifest)

console.log('Validación completada:')
console.log(`- ${sourceDocuments.length} documentos fuente con hash válido`)
console.log(`- ${plan.translatedDocuments.length} traducciones inglesas completas`)
console.log(`- ${plan.metadataDocuments.length} pares de traducción`)
console.log('- 14 documentos SEO bilingües')
console.log('- slugs únicos y referencias de categorías remapeadas')

if (options.apply) {
  await applyStages(client, plan.stages)
  console.log('Migración aplicada. Ejecuta ahora npm run i18n:audit.')
} else {
  console.log('Dry run finalizado: no se escribió en Sanity.')
}
