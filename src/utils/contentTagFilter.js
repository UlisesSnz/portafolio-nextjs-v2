export function getContentTagOptions(items, locale = "es") {
  const tagCollator = new Intl.Collator(locale === "es" ? "es-MX" : "en", {
    numeric: true,
    sensitivity: "base",
  });
  const tagsBySlug = new Map();
  const contentItems = Array.isArray(items) ? items : [];

  contentItems.forEach((item) => {
    item?.categories?.forEach((category) => {
      const stableKey = category?.key || category?.slug;
      if (!stableKey || !category?.name) return;

      tagsBySlug.set(stableKey, {
        value: stableKey,
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
    item?.categories?.some((category) => activeTagSet.has(category?.key || category?.slug))
  );
}

function splitTagValue(value) {
  return String(value || "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}
