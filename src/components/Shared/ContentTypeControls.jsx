import MenuFilterControl from "@/components/Shared/MenuFilterControl";
import { CONTENT_TYPE_FILTER_OPTIONS } from "@/utils/contentTypeFilter";
import { useTranslations } from 'next-intl';

const ContentTypeControls = ({
  activeType,
  basePath,
  className = "",
  query = {},
}) => {
  const t = useTranslations('Filters');
  const options = CONTENT_TYPE_FILTER_OPTIONS.map((option) => ({
    ...option,
    label: t(option.value === 'all' ? 'allContent' : option.value),
    icon: option.value === 'projects' ? 'folder' : option.value === 'posts' ? 'document' : 'grid',
  }));

  return (
    <MenuFilterControl
      activeValue={activeType}
      ariaLabel={t('filterType')}
      basePath={basePath}
      className={className}
      options={options}
      paramName="type"
      query={query}
      triggerIcon="filter"
      triggerLabel={t('filterBy')}
    />
  );
};

export default ContentTypeControls;
