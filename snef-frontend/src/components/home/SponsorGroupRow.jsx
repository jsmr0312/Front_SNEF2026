import SponsorMovieCard from './SponsorMovieCard';

export default function SponsorGroupRow({
  sponsor,
  moviesPerSponsor,
  aspectRatio,
}) {
  if (!sponsor) {
    return null;
  }

  const movies = sponsor.movies.slice(0, moviesPerSponsor);

  return (
    <article
      className="sponsor-shelf-sponsor-group"
      aria-label={`${sponsor.name}: ${movies.length} pel\u00edculas`}
    >
      <h3 className="sr-only">{sponsor.name}</h3>

      <div className="grid auto-cols-max grid-flow-col gap-3 md:gap-5 xl:gap-6">
        {movies.map((movie) => (
          <SponsorMovieCard
            key={movie.id}
            sponsor={sponsor}
            movie={movie}
            aspectRatio={aspectRatio}
          />
        ))}
      </div>
    </article>
  );
}
