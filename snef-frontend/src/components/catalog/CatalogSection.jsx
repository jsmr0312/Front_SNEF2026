import CatalogGrid from './CatalogGrid';

export default function CatalogSection({
  title,
  type,
  movies,
}) {
  if (!movies.length) {
    return null;
  }

  return (
    <section className="catalog-section" aria-labelledby={`${type}-catalog-title`}>
      <h2 id={`${type}-catalog-title`} className="catalog-section__title">
        {title}
      </h2>

      <CatalogGrid movies={movies} sectionType={type} />
    </section>
  );
}
