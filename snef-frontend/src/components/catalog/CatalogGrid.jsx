import SponsorMovieCard from '../home/SponsorMovieCard';

const sectionLayouts = {
  cinema: {
    aspectRatio: '2400 / 870',
    gridClassName: 'catalog-grid--cinema',
  },
  oro: {
    aspectRatio: '600 / 870',
    gridClassName: 'catalog-grid--oro',
  },
  plata: {
    aspectRatio: '600 / 600',
    gridClassName: 'catalog-grid--plata',
  },
  bronce: {
    aspectRatio: '600 / 330',
    gridClassName: 'catalog-grid--bronce',
  },
};

export default function CatalogGrid({
  movies,
  sectionType,
}) {
  const layout = sectionLayouts[sectionType] ?? sectionLayouts.oro;

  return (
    <div className={`catalog-grid ${layout.gridClassName}`}>
      {movies.map((movie) => (
        <SponsorMovieCard
          key={movie.id}
          sponsor={{
            name: movie.sponsor,
            logo: movie.sponsorLogo,
          }}
          movie={movie}
          aspectRatio={layout.aspectRatio}
          className="catalog-movie-card"
        />
      ))}
    </div>
  );
}
