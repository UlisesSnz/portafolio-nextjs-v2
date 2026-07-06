export const DEFAULT_CONTENT_TYPE_FILTER = "all";

export const CONTENT_TYPE_FILTER_OPTIONS = [
  { value: "all", label: "Todos" },
  { value: "projects", label: "Proyectos" },
  { value: "posts", label: "Posts" },
];

const VALID_TYPE_FILTER_VALUES = new Set(
  CONTENT_TYPE_FILTER_OPTIONS.map(({ value }) => value)
);

export function normalizeContentTypeFilter(type) {
  const value = Array.isArray(type) ? type[0] : type;

  return VALID_TYPE_FILTER_VALUES.has(value)
    ? value
    : DEFAULT_CONTENT_TYPE_FILTER;
}

export function filterContentItemsByType(
  items,
  type = DEFAULT_CONTENT_TYPE_FILTER
) {
  const activeType = normalizeContentTypeFilter(type);
  const contentItems = Array.isArray(items) ? items : [];

  if (activeType === "projects") {
    return contentItems.filter((item) => item?._type === "project");
  }

  if (activeType === "posts") {
    return contentItems.filter((item) => item?._type === "article");
  }

  return contentItems;
}
