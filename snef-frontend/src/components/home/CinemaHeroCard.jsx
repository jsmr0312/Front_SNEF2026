import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import AvailabilityBadge from './AvailabilityBadge';
import CategoryBadge from './CategoryBadge';

const CINEMA_MOVIE_LOOP_MS = 4000;

export default function CinemaHeroCard({
  sponsor,
  isActive = true,
  onSelect,
  style,
}) {
  const movies = useMemo(() => sponsor.movies ?? [], [sponsor.movies]);
  const [activeMovieIndex, setActiveMovieIndex] = useState(0);
  const [loopResetKey, setLoopResetKey] = useState(0);
  const safeActiveMovieIndex = Math.min(activeMovieIndex, movies.length - 1);
  const activeMovie = movies[safeActiveMovieIndex];

  useEffect(() => {
    if (!isActive || movies.length <= 1) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setActiveMovieIndex((currentIndex) => (currentIndex + 1) % movies.length);
    }, CINEMA_MOVIE_LOOP_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isActive, loopResetKey, movies.length]);

  if (!activeMovie) {
    return null;
  }

  const frameClasses = `
        cinema-hero-card ${isActive ? 'cinema-hero-card--active' : 'cinema-hero-card--inactive'}
        absolute left-1/2 top-0 isolate h-full w-full overflow-hidden rounded-[24px]
        border border-white/10 bg-[#F4F4F2]
        shadow-[0_28px_70px_rgba(0,0,0,0.34)]
        md:rounded-[30px]
        cursor-pointer no-underline hover:no-underline
        will-change-transform
      `;

  const handleFrameClick = (event) => {
    if (!isActive) {
      event.preventDefault();
      onSelect?.();
    }
  };

  const handleThumbnailClick = (movieIndex) => {
    setActiveMovieIndex(movieIndex);
    setLoopResetKey((currentKey) => currentKey + 1);
  };

  return (
    <article
      aria-hidden={!isActive}
      aria-label={
        isActive
          ? `${sponsor.title ?? `Colecci\u00f3n ${sponsor.name}`}: ${activeMovie.title}`
          : `Seleccionar ${sponsor.name}`
      }
      style={style}
      className={frameClasses}
      onClick={handleFrameClick}
    >
      <div className="cinema-hero-card__visual relative h-full w-full overflow-hidden rounded-[inherit]">
        <picture>
          <source media="(max-width: 767px)" srcSet={activeMovie.coverMobile} />

          <img
            key={activeMovie.id}
            src={activeMovie.coverDesktop}
            alt={`Portada de ${activeMovie.title}`}
            className="absolute inset-0 h-full w-full object-cover animate-[fadeIn_480ms_ease]"
          />
        </picture>

        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/58" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/28 via-transparent to-black/12" />

        <div className="cinema-hero-card__logo-badge absolute left-4 top-4 z-10 rounded-[8px] bg-[#101010]/92 px-5 py-3 shadow-[0_14px_34px_rgba(0,0,0,0.24)] md:left-8 md:top-8 md:px-9 md:py-4">
          <img
            src={sponsor.logo}
            alt={`Logo de ${sponsor.name}`}
            className="cinema-hero-card__logo h-6 w-20 object-contain md:h-9 md:w-28"
          />
        </div>

        <div className="cinema-hero-card__availability absolute right-4 top-4 z-10 flex flex-wrap justify-end gap-3 md:right-8 md:top-8">
          <CategoryBadge
            label={activeMovie.category}
            accentColor={activeMovie.categoryAccentColor}
            className="hidden w-fit md:inline-flex"
          />

          <AvailabilityBadge
            label={activeMovie.availabilityLabel}
            className="cinema-hero-card__availability-badge"
          />
        </div>

        <Link
          to={`/preview/${activeMovie.id}`}
          aria-label={`Abrir previsualizaci\u00f3n de ${activeMovie.title}`}
          className="absolute inset-0 z-[1]"
          tabIndex={isActive ? 0 : -1}
        />

        <div className="cinema-hero-card__content absolute inset-x-0 bottom-0 z-10 p-5 md:p-10">
          <Link
            to={`/preview/${activeMovie.id}`}
            tabIndex={isActive ? 0 : -1}
            className="cinema-hero-card__title-link relative z-20 block w-fit max-w-[860px] text-white no-underline hover:no-underline"
          >
            <span className="cinema-hero-card__title block text-4xl font-semibold leading-none text-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)] md:text-[64px]">
              Colecci&oacute;n
            </span>
          </Link>

          <p className="cinema-hero-card__sponsor-name mt-2 text-xl font-medium leading-tight text-[#F5F5F5] md:text-3xl">
            {sponsor.name}
          </p>

          <Link
            to={`/watch/${activeMovie.id}`}
            tabIndex={isActive ? 0 : -1}
            className="
              cinema-hero-card__watch-button
              mt-4 inline-flex min-h-11 items-center justify-center
              rounded-full bg-[#8DCD21] px-7 py-3 text-sm font-semibold
              leading-none text-white no-underline shadow-[0_14px_30px_rgba(141,205,33,0.24)]
              transition duration-300 hover:-translate-y-0.5 hover:bg-[#9BD11F]
              hover:text-white hover:no-underline
              focus-visible:outline focus-visible:outline-2
              focus-visible:outline-offset-4 focus-visible:outline-[#22ADE4]
              md:mt-5 md:min-h-12 md:px-8 md:text-base
            "
          >
            Ver ahora
          </Link>
        </div>
      </div>

      <div className="cinema-movie-thumbnails relative z-20 flex gap-3 md:justify-end md:gap-4">
        {movies.map((movie, movieIndex) => {
          const isActiveThumbnail = movieIndex === safeActiveMovieIndex;
          const thumbnailImage =
            movie.coverResponsive
            ?? movie.coverMobile
            ?? movie.responsiveCover
            ?? movie.thumbnail
            ?? movie.coverDesktop
            ?? movie.previewCover
            ?? movie.cover;

          return (
            <button
              key={movie.id}
              type="button"
              tabIndex={isActive ? 0 : -1}
              className={`cinema-movie-thumb ${isActiveThumbnail ? 'cinema-movie-thumb--active' : ''}`}
              aria-label={`Mostrar ${movie.title}`}
              aria-pressed={isActiveThumbnail}
              onClick={() => handleThumbnailClick(movieIndex)}
            >
              <span className="cinema-movie-thumb__image-wrap">
                <img
                  src={thumbnailImage}
                  alt={`Miniatura de ${movie.title}`}
                  loading="lazy"
                />
              </span>
            </button>
          );
        })}
      </div>
    </article>
  );
}
