import MenuFilterControl from "@/components/Shared/MenuFilterControl";
import { CONTENT_TYPE_FILTER_OPTIONS } from "@/utils/contentTypeFilter";

const TYPE_OPTIONS = CONTENT_TYPE_FILTER_OPTIONS.map((option) => ({
  ...option,
  icon:
    option.value === "projects"
      ? "folder"
      : option.value === "posts"
        ? "document"
        : "grid",
}));

const ContentTypeControls = ({
  activeType,
  basePath,
  className = "",
  query = {},
}) => {
  return (
    <MenuFilterControl
      activeValue={activeType}
      ariaLabel="Filtrar por tipo de contenido"
      basePath={basePath}
      className={className}
      options={TYPE_OPTIONS}
      paramName="type"
      query={query}
      triggerIcon="filter"
      triggerLabel="Filtrar por"
    />
  );
};

export default ContentTypeControls;
