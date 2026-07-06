import MultiMenuFilterControl from "@/components/Shared/MultiMenuFilterControl";

const TagControls = ({
  activeTags,
  basePath,
  className = "",
  options,
  query = {},
}) => {
  return (
    <MultiMenuFilterControl
      activeValues={activeTags}
      allLabel="Todas"
      ariaLabel="Filtrar por etiquetas"
      basePath={basePath}
      className={className}
      options={options}
      paramName="tags"
      query={query}
      triggerIcon="tag"
      triggerLabel="Filtrar etiquetas"
      unitLabel={activeTags.length === 1 ? "etiqueta" : "etiquetas"}
    />
  );
};

export default TagControls;
