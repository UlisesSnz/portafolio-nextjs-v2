import {createClient} from 'next-sanity'
import {EXPECTED_COUNTS, legacyMetadataId, metadataId, translationId} from './lib.mjs'
import {SEO_DOCUMENTS} from './content-config.mjs'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_WRITE_TOKEN

if (!projectId || !dataset) {
  throw new Error('Faltan NEXT_PUBLIC_SANITY_PROJECT_ID o NEXT_PUBLIC_SANITY_DATASET.')
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2026-07-01',
  useCdn: false,
  perspective: 'published',
})

const types = [...Object.keys(EXPECTED_COUNTS), 'seoPage']
const documents = await client.fetch(`*[
  _type in $types &&
  !(_id in path("drafts.**")) &&
  language in ["es", "en"]
]{
  _id,
  _type,
  language,
  key,
  slug,
  categories[]{_ref, "language": @->language, "key": @->key}
}`, {types})

const metadata = await client.fetch(`*[_type == "translation.metadata"]{
  _id,
  schemaTypes,
  translations[]{_key, language, value->{_id, _type, language, key}}
}`)

const errors = []
if (metadata.length !== 31) {
  errors.push(`translation.metadata: se esperaban 31 documentos, se encontraron ${metadata.length}`)
}

for (const document of metadata) {
  if (document._id.includes('.')) {
    errors.push(`${document._id}: el ID contiene un punto y requiere autenticación`)
  }
  if (new Set((document.translations || []).map(({_key}) => _key)).size !== document.translations?.length) {
    errors.push(`${document._id}: contiene _key duplicadas`)
  }
}
for (const [type, sourceCount] of Object.entries({...EXPECTED_COUNTS, seoPage: SEO_DOCUMENTS.length})) {
  for (const locale of ['es', 'en']) {
    const count = documents.filter((document) => document._type === type && document.language === locale).length
    if (count !== sourceCount) errors.push(`${type}/${locale}: se esperaban ${sourceCount}, se encontraron ${count}`)
  }
}

const slugKeys = new Set()
for (const document of documents) {
  if (document.slug?.current) {
    const slugKey = `${document._type}:${document.language}:${document.slug.current}`
    if (slugKeys.has(slugKey)) errors.push(`slug duplicado: ${slugKey}`)
    slugKeys.add(slugKey)
  }

  for (const category of document.categories || []) {
    if (category.language !== document.language) {
      errors.push(`${document._id}: categoría ${category._ref} pertenece a ${category.language || 'sin idioma'}`)
    }
  }
}

const metadataById = new Map(metadata.map((document) => [document._id, document]))
for (const document of documents.filter(({language}) => language === 'es')) {
  const expectedMetadataId = metadataId(document._id)
  const pair = metadataById.get(expectedMetadataId)
  const spanish = pair?.translations?.find(({language}) => language === 'es')?.value
  const english = pair?.translations?.find(({language}) => language === 'en')?.value
  const expectedEnglishId = document._type === 'seoPage'
    ? document._id.replace(/-es$/, '-en')
    : translationId(document._id)
  if (
    pair?.schemaTypes?.length !== 1 ||
    pair.schemaTypes[0] !== document._type ||
    spanish?._id !== document._id ||
    english?._id !== expectedEnglishId
  ) {
    errors.push(`${document._id}: metadata incompleta o inconsistente`)
  }
  if (metadataById.has(legacyMetadataId(document._id))) {
    errors.push(`${document._id}: conserva metadata privada legacy`)
  }
  if (document._type === 'category' && spanish?.key !== english?.key) {
    errors.push(`${document._id}: las categorías traducidas no comparten key`)
  }
}

if (errors.length) {
  throw new Error(`La auditoría encontró problemas:\n- ${errors.join('\n- ')}`)
}

console.log('Auditoría remota aprobada:')
console.log(`- ${documents.length} documentos localizados publicados`)
console.log(`- ${metadata.length} documentos translation.metadata`)
console.log('- slugs únicos por tipo/idioma')
console.log('- referencias de categorías en el idioma correcto')
