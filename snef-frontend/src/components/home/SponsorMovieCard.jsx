import { Link } from 'react-router-dom';

import CategoryBadge from './CategoryBadge';

export default function SponsorMovieCard({
  sponsor,
  movie,
  aspectRatio,
  className = '',
}) {
  return (
    <Link
      to={`/preview/${movie.id}`}
      className={`sponsor-shelf-card group block cursor-pointer no-underline hover:no-underline ${className}`}
      aria-label={`Abrir previsualizaci\u00f3n de ${movie.title}`}
    >
      <div
        className="
          sponsor-shelf-card__poster
          overflow-hidden rounded-[8px] border border-white/8 bg-[#101010]
          shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]
        "
        style={{ aspectRatio }}
      >
        <img
          src={movie.cover}
          alt={`Portada de ${movie.title}`}
          className="
            h-full w-full object-cover transition duration-500 ease-out
            group-hover:scale-[1.025]
          "
          loading="lazy"
        />
      </div>

      <footer
        className="
          sponsor-shelf-card__footer
          flex min-h-[56px] flex-col items-start justify-between gap-2
          px-3 py-3 sm:flex-row sm:items-center md:min-h-[64px]
        "
      >
        <div
          className="
            sponsor-shelf-card__logo-box
            flex h-8 min-w-18 max-w-[48%] items-center justify-center
            rounded-[5px] bg-[#0F0F0F] px-2 sm:h-9 sm:min-w-20
          "
        >
          <img
            src={sponsor.logo}
            alt={`Logo de ${sponsor.name}`}
            className="max-h-5 w-auto max-w-full object-contain sm:max-h-6"
            loading="lazy"
          />
        </div>

        <CategoryBadge
          label={movie.category}
          accentColor={movie.categoryAccentColor}
          className="
            sponsor-shelf-card__category
            !min-h-7 !max-w-full !whitespace-normal !px-2 !py-1
            !text-[10px] !leading-tight sm:!max-w-[66%]
            sm:!whitespace-nowrap md:!text-xs
          "
        />
      </footer>
    </Link>
  );
}
