import { CATALOG_FILTERS } from '../../utils/catalog';

export default function CatalogFilters({
  activeFilterId,
  onChange,
}) {
  return (
    <div className="catalog-filters" aria-label="Filtros de cat\u00e1logo">
      {CATALOG_FILTERS.map((filter) => {
        const isActive = activeFilterId === filter.id;

        return (
          <button
            key={filter.id}
            type="button"
            className={`catalog-filter ${isActive ? 'catalog-filter--active' : ''}`}
            style={{ '--catalog-filter-color': filter.color }}
            onClick={() => onChange(filter.id)}
            aria-pressed={isActive}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
