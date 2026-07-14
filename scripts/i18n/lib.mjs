import {createHash} from 'node:crypto'
import {readFile} from 'node:fs/promises'

export const SOURCE_TYPES = [
  'article',
  'project',
  'profile',
  'job',
  'education',
  'category',
]

export const EXPECTED_COUNTS = {
  article: 6,
  project: 1,
  profile: 1,
  job: 1,
  education: 2,
  category: 13,
}

const SYSTEM_FIELDS = new Set(['_createdAt', '_rev', '_updatedAt', 'language', 'key'])

function canonicalize(value) {
  if (Array.isArray(value)) return value.map(canonicalize)

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([key]) => !SYSTEM_FIELDS.has(key))
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([key, child]) => [key, canonicalize(child)])
    )
  }

  return value
}

export function sourceHash(document) {
  return createHash('sha256')
    .update(JSON.stringify(canonicalize(document)))
    .digest('hex')
}

export function translationId(sourceId) {
  return `i18n-en-${sourceId}`
}

export function metadataId(sourceId) {
  return `translation-metadata-${sourceId}`
}

export function legacyMetadataId(sourceId) {
  return `translation.metadata-${sourceId}`
}

export async function readNdjson(filePath) {
  const contents = await readFile(filePath, 'utf8')

  return contents
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line) => JSON.parse(line))
}

export function selectSourceDocuments(documents) {
  return documents
    .filter((document) => SOURCE_TYPES.includes(document._type))
    .filter((document) => !document._id.startsWith('drafts.'))
    .sort((left, right) => left._id.localeCompare(right._id))
}

export function assertExpectedSource(documents) {
  const counts = Object.fromEntries(SOURCE_TYPES.map((type) => [type, 0]))

  for (const document of documents) counts[document._type] += 1

  const errors = Object.entries(EXPECTED_COUNTS)
    .filter(([type, expected]) => counts[type] !== expected)
    .map(([type, expected]) => `${type}: se esperaban ${expected}, se encontraron ${counts[type]}`)

  if (errors.length) {
    throw new Error(`El conjunto fuente no coincide con la instantánea aprobada:\n- ${errors.join('\n- ')}`)
  }
}

export function createMetadataDocument(sourceDocument, translatedDocument) {
  return {
    _id: metadataId(sourceDocument._id),
    _type: 'translation.metadata',
    schemaTypes: [sourceDocument._type],
    translations: [
      {
        _key: 'translation-es',
        _type: 'internationalizedArrayReferenceValue',
        language: 'es',
        value: {_type: 'reference', _ref: sourceDocument._id},
      },
      {
        _key: 'translation-en',
        _type: 'internationalizedArrayReferenceValue',
        language: 'en',
        value: {_type: 'reference', _ref: translatedDocument._id},
      },
    ],
  }
}

export function stripSystemFields(document) {
  return Object.fromEntries(
    Object.entries(document).filter(([key]) => !['_createdAt', '_rev', '_updatedAt'].includes(key))
  )
}

export function stableStringify(value) {
  return `${JSON.stringify(value, null, 2)}\n`
}
