const TOP_LEVEL_FIELDS = {
  article: ['name', 'shortDescription'],
  project: ['name', 'shortDescription'],
  profile: ['headline', 'shortBiography'],
  job: ['jobTitle', 'location', 'description'],
  education: ['name', 'description'],
  category: ['name'],
}

function visitPortableText(value, path, visitor) {
  if (!Array.isArray(value)) return

  value.forEach((item, index) => {
    const itemPath = `${path}[${index}]`

    if (item?._type === 'block') {
      item.children?.forEach((child, childIndex) => {
        const isInlineCode = Array.isArray(child?.marks) && child.marks.includes('code')
        if (!isInlineCode && typeof child?.text === 'string' && child.text.trim()) {
          visitor(child, 'text', `${itemPath}.children[${childIndex}].text`)
        }
      })
    }

    if (item?._type === 'image') {
      for (const field of ['alt', 'caption']) {
        if (typeof item[field] === 'string' && item[field].trim()) {
          visitor(item, field, `${itemPath}.${field}`)
        }
      }
    }

    if (item?._type === 'portableTable') {
      item.table?.rows?.forEach((row, rowIndex) => {
        row.cells?.forEach((cell, cellIndex) => {
          if (typeof cell === 'string' && cell.trim()) {
            visitor(row.cells, cellIndex, `${itemPath}.table.rows[${rowIndex}].cells[${cellIndex}]`)
          }
        })
      })
    }
  })
}

export function visitTranslatableStrings(document, visitor) {
  for (const field of TOP_LEVEL_FIELDS[document._type] || []) {
    if (typeof document[field] === 'string' && document[field].trim()) {
      visitor(document, field, field)
    }
  }

  if (document._type === 'profile') visitPortableText(document.fullBiography, 'fullBiography', visitor)
  if (document._type === 'article' || document._type === 'project') {
    visitPortableText(document.description, 'description', visitor)
  }

  for (const field of ['alt', 'caption']) {
    if (typeof document.coverImage?.[field] === 'string' && document.coverImage[field].trim()) {
      visitor(document.coverImage, field, `coverImage.${field}`)
    }
    if (typeof document.profileImage?.[field] === 'string' && document.profileImage[field].trim()) {
      visitor(document.profileImage, field, `profileImage.${field}`)
    }
  }

  for (const field of ['title', 'description']) {
    if (typeof document.seo?.[field] === 'string' && document.seo[field].trim()) {
      visitor(document.seo, field, `seo.${field}`)
    }
  }

  if (typeof document.seo?.image?.alt === 'string' && document.seo.image.alt.trim()) {
    visitor(document.seo.image, 'alt', 'seo.image.alt')
  }
}

export function collectTranslatableStrings(document) {
  const entries = []
  visitTranslatableStrings(document, (owner, key, path) => {
    entries.push({path, source: owner[key]})
  })
  return entries
}

export function applyStringTranslations(document, translations) {
  const missing = []

  visitTranslatableStrings(document, (owner, key, path) => {
    const translated = translations[path]
    if (typeof translated !== 'string' || !translated.trim()) {
      missing.push(path)
      return
    }
    owner[key] = translated
  })

  return missing
}
