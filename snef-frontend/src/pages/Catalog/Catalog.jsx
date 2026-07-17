import { useMemo, useState } from 'react';

import CatalogFilters from '../../components/catalog/CatalogFilters';
import CatalogSection from '../../components/catalog/CatalogSection';
import Navbar from '../../components/ui/Navbar';
import {
  CATALOG_FILTERS,
  filterCatalogSections,
  getCatalogSections,
} from '../../utils/catalog';

export default function Catalog() {
  const [activeFilterId, setActiveFilterId] = useState(CATALOG_FILTERS[0].id);

  const catalogSections = useMemo(() => getCatalogSections(), []);
  const visibleSections = useMemo(
    () => filterCatalogSections(catalogSections, activeFilterId),
    [catalogSections, activeFilterId],
  );

  return (
    <main className="snef-page catalog-page">
      <Navbar />

      <div className="catalog-container snef-layout-container">
        <header className="catalog-header">
          <h1 className="catalog-title">Cat&aacute;logo completo</h1>

          <CatalogFilters
            activeFilterId={activeFilterId}
            onChange={setActiveFilterId}
          />
        </header>

        {visibleSections.length > 0 ? (
          visibleSections.map((section) => (
            <CatalogSection
              key={section.id}
              title={section.title}
              type={section.type}
              movies={section.movies}
            />
          ))
        ) : (
          <p className="catalog-empty">
            No hay pel&iacute;culas disponibles para este filtro.
          </p>
        )}
      </div>
    </main>
  );
}
