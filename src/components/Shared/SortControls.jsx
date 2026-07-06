import MenuFilterControl from "@/components/Shared/MenuFilterControl";
import { CONTENT_SORT_OPTIONS } from "@/utils/contentSort";

const SORT_OPTIONS = CONTENT_SORT_OPTIONS.map((option) => ({
  ...option,
  icon:
    option.value === "date-desc"
      ? "clock"
      : option.value === "name-desc"
        ? "arrowDown"
        : "arrowUp",
}));

const SortControls = ({
  activeSort,
  basePath,
  className = "",
  query = {},
}) => {
  return (
    <MenuFilterControl
      activeValue={activeSort}
      ariaLabel="Ordenar contenido"
      basePath={basePath}
      className={className}
      options={SORT_OPTIONS}
      paramName="sort"
      query={query}
      triggerIcon="sort"
      triggerLabel="Ordenar por"
    />
  );
};

export default SortControls;
