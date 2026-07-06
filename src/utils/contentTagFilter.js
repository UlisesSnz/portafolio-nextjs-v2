const tagCollator = new Intl.Collator("es", {
  numeric: true,
  sensitivity: "base",
});

export function getContentTagOptions(items) {
  const tagsBySlug = new Map();
  const contentItems = Array.isArray(items) ? items : [];

  contentItems.forEach((item) => {
    item?.categories?.forEach((category) => {
      if (!category?.slug || !category?.name) return;

      tagsBySlug.set(category.slug, {
        value: category.slug,
        label: category.name,
      });
    });
  });

  return [...tagsBySlug.values()].sort((tagA, tagB) =>
    tagCollator.compare(tagA.label, tagB.label)
  );
}

export function normalizeContentTags(tags, options = []) {
  const rawTags = Array.isArray(tags)
    ? tags.flatMap(splitTagValue)
    : splitTagValue(tags);
  const allowedTags = options.length
    ? new Set(options.map(({ value }) => value))
    : null;
  const normalizedTags = [];

  rawTags.forEach((tag) => {
    if (!tag || normalizedTags.includes(tag)) return;
    if (allowedTags && !allowedTags.has(tag)) return;

    normalizedTags.push(tag);
  });

  return normalizedTags;
}

export function formatContentTagsQuery(tags) {
  const normalizedTags = normalizeContentTags(tags);

  return normalizedTags.length ? normalizedTags.join(",") : undefined;
}

export function filterContentItemsByTags(items, tags = []) {
  const activeTags = normalizeContentTags(tags);
  const contentItems = Array.isArray(items) ? items : [];

  if (!activeTags.length) return contentItems;

  const activeTagSet = new Set(activeTags);

  return contentItems.filter((item) =>
    item?.categories?.some((category) => activeTagSet.has(category?.slug))
  );
}

function splitTagValue(value) {
  return String(value || "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}
