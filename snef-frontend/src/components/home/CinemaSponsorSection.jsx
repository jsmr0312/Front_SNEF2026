import { cinemaSponsors } from '../../data/sponsors/homeCinemaSponsors';
import CinemaHeroSlider from './CinemaHeroSlider';

export default function CinemaSponsorSection({
  sponsors = cinemaSponsors,
}) {
  if (!sponsors.length) {
    return null;
  }

  return (
    <section
      className="snef-layout-container py-10 md:py-16"
      aria-labelledby="cinema-section-title"
    >
      <h1
        id="cinema-section-title"
        className="cinema-sponsor-section__title mb-8 max-w-[1100px] text-3xl font-semibold leading-tight tracking-[-0.03em] text-white md:mb-12 md:text-5xl"
      >
        Nuestra selecci&oacute;n disponible en salas de cine
      </h1>

      <CinemaHeroSlider sponsors={sponsors} />
    </section>
  );
}
