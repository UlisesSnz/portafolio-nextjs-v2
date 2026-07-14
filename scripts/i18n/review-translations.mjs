import {readFile, rename, writeFile} from 'node:fs/promises'
import {resolve} from 'node:path'

const [, , manifestArg = 'scripts/i18n/translations.en.json'] = process.argv
const manifestPath = resolve(manifestArg)
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'))

const REQUIRED_SEO_IMAGE_ALTS = {
  '0159a69e-52ca-4a0a-a57b-dcec1b85e00c': {
    source: 'Arquitectura de sitio web personal con Next.js',
    en: 'Personal website architecture built with Next.js',
  },
  '1682ab7b-c31d-4c6c-9f38-3ee5b8bc34d0': {
    source: 'Diagrama de HAOS en Proxmox',
    en: 'Diagram of HAOS running on Proxmox',
  },
  '616b7092-5141-4df6-bbe0-1633fb06d617': {
    source: 'Portada de guía de gramática inglesa',
    en: 'Cover image for the English grammar guide',
  },
}

for (const [documentId, translation] of Object.entries(REQUIRED_SEO_IMAGE_ALTS)) {
  manifest.documents[documentId].translations['seo.image.alt'] = translation
}

const TEXT_OVERRIDES = {
  ' y ': ' and ',
  'Blog y Portafolio: Sitio web personal con Next.js': 'Blog and Portfolio: A Personal Website Built with Next.js',
  '¿Te imaginas construir desde cero con una tecnología que recién conoces? En este post relato todo el proceso de desarrollo y los diferentes obstáculos que atravesé en el camino.': "Can you imagine building something from scratch with a technology you've only just learned? In this post, I recount the entire development process and the obstacles I encountered along the way.",
  'Guía de instalación de HAOS en Proxmox': 'Installing HAOS on Proxmox: A Step-by-Step Guide',
  'Portada de guía de instalación de HAOS en Proxmox': 'Cover image for the guide to installing HAOS on Proxmox',
  'Asistente Avanzado de Inteligencia Artificial': 'Advanced Artificial Intelligence Assistant',
  'En este post relato todo el proceso, el cual ira desde la implementación hasta la ejecución usando una arquitectura propia.': 'In this post, I describe the entire process, from implementation to execution, using a custom architecture.',
  'Una Inteligencia Artificial con forma humana': 'A human-shaped artificial intelligence',
  'Si cometes un error y no lo corriges, eso se llama error': "If you make a mistake and do not correct it, that is another mistake",
  'Guía de Instalación y Configuración de Jest + React Testing Library': 'Installing and Configuring Jest with React Testing Library',
  'Gramática inglesa': 'English Grammar',
  'Hola Mundo': 'Hello World',
  '!Bienvenido a mi blog!': 'Welcome to my blog!',
  'Un inge guapo y musculoso': 'A handsome, muscular engineer',
  'Ingeniería en Tecnologías de la Información': 'Information Technology Engineering',
  'Python TOTAL - Programador Avanzado en 16 días': 'Python TOTAL — Advanced Programmer in 16 Days',
  'Me desenvolví de manera independiente como freelancer, enfocado en proporcionar servicios de mantenimiento y desarrollo de sitios web, así como en la implementación de nuevas funcionalidades para mejorar la experiencia del usuario. Además, tuve la oportunidad de crear un ecommerce desde cero, proporcionando a los clientes una plataforma sólida para su negocio en línea. Durante este tiempo, además de trabajar en proyectos concretos, realice implementaciones de Google Analytics para mejorar la analítica web de mis clientes. Asimismo, aproveché la oportunidad para expandir mis habilidades, sumergiéndome en el aprendizaje de tecnologías modernas de desarrollo web e inteligencia artificial.': "I worked independently as a freelance software developer, maintaining and building websites and implementing features that improved the user experience. I also built an e-commerce platform from scratch, giving the client a solid foundation for their online business, and implemented Google Analytics to improve clients' web analytics. Alongside those projects, I continued expanding my skills in modern web development and artificial intelligence.",
  'Next Js': 'Next.js',
  'Java Script': 'JavaScript',
  'Domótica': 'Home Automation',
  'Pensamientos': 'Thoughts',
  'Estudio': 'Learning',
  'Instar Proxmox': 'Install Proxmox',
  'Hacer en 2 horas algo de 15 minutos': 'Turning a 15-minute task into a two-hour one',
  'Instalaciones': 'Installation',
  'Descripción de comandos y enlaces a la documentación': 'Command descriptions and documentation links',
  'Artículos indeterminados “a” y “an”': 'Indefinite Articles “a” and “an”',
  'Articulo determinado “The”': 'The Definite Article “the”',
  'Cuando usar The': 'When to Use “the”',
  'Cuando no usar The': 'When Not to Use “the”',
  'Sustantivos contables y no contables': 'Countable and Uncountable Nouns',
  'Ejemplos de no contables': 'Examples of Uncountable Nouns',
  'Pasar de no contables a contables': 'Turning Uncountable Nouns into Countable Nouns',
  'Determinante': 'Determiner',
  'Tiempos simples': 'Simple Tenses',
  'Tiempos continuos': 'Continuous Tenses',
  'Tiempos perfectos': 'Perfect Tenses',
  'Presente simple': 'Simple Present',
  'Pasado simple': 'Simple Past',
  'Futuro simple': 'Simple Future',
  'Condicional simple': 'Simple Conditional',
  'Presente continuo': 'Present Continuous',
  'Pasado continuo': 'Past Continuous',
  'Futuro continuo': 'Future Continuous',
  'Condicional continuo': 'Conditional Continuous',
  'Presente perfecto': 'Present Perfect',
  'Pasado perfecto': 'Past Perfect',
  'Futuro perfecto': 'Future Perfect',
  'Condicional perfecto': 'Conditional Perfect',
  'Formación interrogativa': 'Interrogative Form',
  'Vocal': 'Vowel',
  'Practica usando IA': 'Practice with AI',
  'Doble posesivo': 'Double Possessive',
  'Pronombres personales sujeto': 'Subject Pronouns',
  'Pronombres personales objeto': 'Object Pronouns',
  'Composición': 'Structure',
}

const PATH_OVERRIDES = {
  '1682ab7b-c31d-4c6c-9f38-3ee5b8bc34d0': {
    'description[54].children[1].text': 'Disks',
    'description[60].children[5].text': 'vmbr0',
  },
  '616b7092-5141-4df6-bbe0-1633fb06d617': {
    'description[305].children[1].text': 'to have',
    'description[305].children[2].text': ' conjugated',
    'description[324].children[2].text': ' is used to describe ',
    'description[324].children[3].text': 'identity',
    'description[324].children[5].text': 'states or conditions',
    'description[324].children[6].text': ', including characteristics, professions, locations, and more.',
    'description[331].table.rows[1].cells[1]': 'Am I?',
    'description[337].children[2].text': ' can express ',
    'description[337].children[3].text': 'possession',
    'description[337].children[5].text': 'serve as an auxiliary verb',
    'description[337].children[6].text': '. It is used to express possession and to form the ',
    'description[337].children[7].text': 'perfect tenses',
    'description[337].children[8].text': ' in English.',
    'description[341].table.rows[3].cells[0]': "He doesn't have / He hasn't",
    'description[341].table.rows[4].cells[0]': "She doesn't have / She hasn't",
    'description[341].table.rows[7].cells[0]': "You don't have / You haven't",
    'description[341].table.rows[8].cells[0]': "They don't have / They haven't",
    'description[344].table.rows[1].cells[0]': 'Do I have? / Have I?',
    'description[344].table.rows[2].cells[0]': 'Do you have? / Have you?',
    'description[344].table.rows[3].cells[0]': 'Does he have? / Has he?',
    'description[344].table.rows[3].cells[1]': 'Has he?',
    'description[344].table.rows[4].cells[0]': 'Does she have? / Has she?',
    'description[344].table.rows[5].cells[0]': 'Does it have? / Has it?',
    'description[344].table.rows[6].cells[0]': 'Do we have? / Have we?',
    'description[344].table.rows[7].cells[0]': 'Do you have? / Have you?',
    'description[344].table.rows[8].cells[0]': 'Do they have? / Have they?',
    'description[347].children[1].text': 'the use of "to have" to express possession',
    'description[347].children[2].text': ' is explained in the next section.',
    'description[349].children[2].text': ' (can, could, must, have to, might, may, should), these rules apply.\nWe will use the verb ',
    'description[352].table.rows[5].cells[0]': 'It walks',
    'description[354].table.rows[5].cells[0]': 'It does not walk',
    'description[357].table.rows[5].cells[0]': 'Does it walk?',
  },
  'b936e7be-96d0-4fac-b1ca-1c9ef2562f62': {
    'description[82].children[5].text': 'proyecto.local',
    'description[85].children[0].text': "To be honest, this is not something I'm proud of. The day after installing Proxmox, I broke it. I wanted to remove a UI warning, but the command I ran accidentally replaced several lines in proxmoxlib.js with the expression 'data.status !== Active'. I was in trouble because I had not backed up the file, and I could not update the system because I had not configured the package repository.",
  },
}

const ENGLISH_REPLACEMENTS = [
  [/Indeterminate Article/g, 'Indefinite Article'],
  [/indeterminate article/g, 'indefinite article'],
  [/Accounting nouns/g, 'Countable nouns'],
  [/Non-Accounting/g, 'Uncountable'],
  [/non-accounting/g, 'uncountable'],
  [/determined article/g, 'definite article'],
  [/object personal pronouns/g, 'object pronouns'],
  [/Simple times/g, 'Simple tenses'],
  [/simple times/g, 'simple tenses'],
  [/Continuous times/g, 'Continuous tenses'],
  [/continuous times/g, 'continuous tenses'],
  [/Perfect times/g, 'Perfect tenses'],
  [/perfect times/g, 'perfect tenses'],
  [/Perfect timing/g, 'Perfect tenses'],
  [/Affirmative Formation/g, 'Affirmative Form'],
]

let reviewed = 0
for (const document of Object.values(manifest.documents)) {
  for (const entry of Object.values(document.translations)) {
    if (TEXT_OVERRIDES[entry.source]) {
      entry.en = TEXT_OVERRIDES[entry.source]
      reviewed += 1
    }
    for (const [pattern, replacement] of ENGLISH_REPLACEMENTS) {
      entry.en = entry.en.replace(pattern, replacement)
    }
  }
}

for (const [documentId, overrides] of Object.entries(PATH_OVERRIDES)) {
  for (const [path, translation] of Object.entries(overrides)) {
    const entry = manifest.documents[documentId]?.translations[path]
    if (!entry) throw new Error(`No existe la ruta editorial ${documentId}:${path}`)
    entry.en = translation
    reviewed += 1
  }
}

const suspiciousPatterns = [
  /Anti-Mage/i,
  /VMMR0/i,
  /Do I have me/i,
  /It is moving forward/i,
  /It does not work/i,
  /Does it work\?/i,
  /^Haber,/i,
]
const suspiciousTranslations = Object.entries(manifest.documents).flatMap(([documentId, document]) =>
  Object.entries(document.translations)
    .filter(([, entry]) => entry.en === ' y ' || suspiciousPatterns.some((pattern) => pattern.test(entry.en)))
    .map(([path]) => `${documentId}:${path}`)
)

if (suspiciousTranslations.length) {
  throw new Error(`Persisten traducciones sospechosas:\n- ${suspiciousTranslations.join('\n- ')}`)
}

manifest.generatedFrom = 'Read-only Sanity production export prepared on 2026-07-13'
manifest.review = {
  locale: 'en',
  approach: 'Machine-assisted first pass with editorial overrides for titles, terminology and key copy.',
  reviewedOverrides: reviewed,
}

const temporaryPath = `${manifestPath}.tmp`
await writeFile(temporaryPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8')
await rename(temporaryPath, manifestPath)
console.log(`Revisión aplicada: ${reviewed} reemplazos`)
