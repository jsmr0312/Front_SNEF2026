import AvailabilityBadge from '../home/AvailabilityBadge';
import CategoryBadge from '../home/CategoryBadge';
import MoviePreviewActions from './MoviePreviewActions';
import SponsorSocialLinks from './SponsorSocialLinks';

const PREVIEW_READABILITY_GRADIENT = `
  linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.82) 0%,
    rgba(0, 0, 0, 0.68) 24%,
    rgba(0, 0, 0, 0.32) 48%,
    rgba(0, 0, 0, 0.04) 72%,
    rgba(0, 0, 0, 0) 100%
  )
`;

export default function MoviePreviewHero({ sponsor, movie }) {
  const previewImage = movie.previewCover ?? movie.coverDesktop;

  return (
    <section className="movie-preview relative min-h-screen overflow-hidden bg-[#141414]">
      <img
        src={previewImage}
        alt={`Previsualizaci\u00f3n de ${movie.title}`}
        className="
          absolute inset-0 h-full w-full object-cover
          object-[62%_center] md:object-center
        "
      />

      <div
        aria-hidden="true"
        className="movie-preview__readability-gradient pointer-events-none absolute inset-0 z-[1]"
        style={{ background: PREVIEW_READABILITY_GRADIENT }}
      />

      <div
        aria-hidden="true"
        className="movie-preview__bottom-gradient pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[28%] bg-gradient-to-b from-transparent to-[#101010]"
      />

      <div
        className="
          movie-preview__content snef-layout-container relative z-[2] flex
          min-h-screen items-start pt-[190px] pb-12
          md:pt-[210px] md:pb-16
        "
      >
        <div className="movie-preview__info w-full max-w-[560px]">
          <div className="movie-preview__brand-row mb-6 flex flex-wrap items-center gap-3">
            <div
              className="
                movie-preview__logo-card flex h-[34px] min-w-[54px]
                items-center justify-center rounded-[7px]
                bg-transparent px-0
              "
            >
              <img
                src={sponsor.logo}
                alt={`Logo de ${sponsor.name}`}
                className="block max-h-7 w-auto object-contain"
              />
            </div>

            <SponsorSocialLinks socialLinks={sponsor.socialLinks} />
          </div>

          <h1 className="movie-preview__title mb-6 max-w-[560px] text-[clamp(46px,4.4vw,72px)] font-semibold leading-[0.95] tracking-[-0.055em] text-white drop-shadow-[0_14px_32px_rgba(0,0,0,0.42)]">
            {movie.title}
          </h1>

          <div className="movie-preview__badges mb-6 flex flex-wrap items-center gap-3">
            <CategoryBadge
              label={movie.category}
              accentColor="#E18831"
            />

            {movie.availabilityLabel && (
              <AvailabilityBadge
                label={movie.availabilityLabel}
              />
            )}
          </div>

          <p className="movie-preview__synopsis mb-8 max-w-[540px] text-base leading-[1.55] text-white/86 md:text-lg">
            {movie.synopsis}
          </p>

          <MoviePreviewActions movie={movie} />
        </div>
      </div>
    </section>
  );
}
