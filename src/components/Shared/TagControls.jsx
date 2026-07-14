import MultiMenuFilterControl from "@/components/Shared/MultiMenuFilterControl";
import { useTranslations } from 'next-intl';

const TagControls = ({
  activeTags,
  basePath,
  className = "",
  options,
  query = {},
}) => {
  const t = useTranslations('Filters');

  return (
    <MultiMenuFilterControl
      activeValues={activeTags}
      allLabel={t('all')}
      ariaLabel={t('filterTagsAria')}
      basePath={basePath}
      className={className}
      options={options}
      paramName="tags"
      query={query}
      triggerIcon="tag"
      triggerLabel={t('filterTags')}
      unitLabel={activeTags.length === 1 ? t('tag') : t('tags')}
    />
  );
};

export default TagControls;
