import MenuFilterControl from "@/components/Shared/MenuFilterControl";
import { CONTENT_SORT_OPTIONS } from "@/utils/contentSort";
import { useTranslations } from 'next-intl';

const SortControls = ({
  activeSort,
  basePath,
  className = "",
  query = {},
}) => {
  const t = useTranslations('Filters');
  const labelKeys = {
    'date-desc': 'latest',
    'date-asc': 'oldest',
    'name-asc': 'alphabeticalAsc',
    'name-desc': 'alphabeticalDesc',
  };
  const options = CONTENT_SORT_OPTIONS.map((option) => ({
    ...option,
    label: t(labelKeys[option.value]),
    icon: option.value === 'date-desc' ? 'clock' : option.value === 'name-desc' ? 'arrowDown' : 'arrowUp',
  }));

  return (
    <MenuFilterControl
      activeValue={activeSort}
      ariaLabel={t('sortAria')}
      basePath={basePath}
      className={className}
      options={options}
      paramName="sort"
      query={query}
      triggerIcon="sort"
      triggerLabel={t('sort')}
    />
  );
};

export default SortControls;
