import { cinemaSponsors } from '../data/sponsors/homeCinemaSponsors';
import { sponsorShelves } from '../data/sponsors/sponsorShelves';

export const CATALOG_FILTERS = [
  {
    id: 'all',
    label: 'Todas',
    category: null,
    color: '#FFFFFF',
  },
  {
    id: 'seguridad-financiera',
    label: 'Seguridad financiera',
    category: 'Seguridad financiera',
    color: '#E13B8A',
  },
  {
    id: 'control-financiero',
    label: 'Control financiero',
    category: 'Control financiero',
    color: '#8DCD21',
  },
  {
    id: 'resiliencia-financiera',
    label: 'Resiliencia financiera',
    category: 'Resiliencia financiera',
    color: '#F08725',
  },
  {
    id: 'libertad-financiera',
    label: 'Libertad financiera',
    category: 'Libertad financiera',
    color: '#22ADE4',
  },
];

const catalogSections = [
  {
    id: 'sala-de-cine',
    title: 'Nuestra selecci\u00f3n disponible en salas de cine',
    type: 'cinema',
    sponsors: cinemaSponsors,
  },
  {
    id: 'oro',
    title: 'Nuestra selecci\u00f3n Oro',
    type: 'oro',
    get sponsors() {
      return sponsorShelves.oro?.sponsors ?? [];
    },
  },
  {
    id: 'plata',
    title: 'Nuestra selecci\u00f3n Plata',
    type: 'plata',
    get sponsors() {
      return sponsorShelves.plata?.sponsors ?? [];
    },
  },
  {
    id: 'bronce',
    title: 'Nuestra selecci\u00f3n Bronce',
    type: 'bronce',
    get sponsors() {
      return sponsorShelves.bronce?.sponsors ?? [];
    },
  },
];

export function getCatalogSections() {
  return catalogSections.map((section) => ({
    id: section.id,
    title: section.title,
    type: section.type,
    movies: normalizeSponsorMovies({
      sponsors: section.sponsors,
      sectionType: section.type,
    }),
  }));
}

export function filterCatalogSections(sections, activeFilterId) {
  const activeFilter = getCatalogFilterById(activeFilterId);

  if (!activeFilter?.category) {
    return sections;
  }

  return sections
    .map((section) => ({
      ...section,
      movies: section.movies.filter(
        (movie) => movie.category === activeFilter.category,
      ),
    }))
    .filter((section) => section.movies.length > 0);
}

export function getCatalogFilterById(filterId) {
  return CATALOG_FILTERS.find((filter) => filter.id === filterId)
    ?? CATALOG_FILTERS[0];
}

function normalizeSponsorMovies({ sponsors = [], sectionType }) {
  return sponsors.flatMap((sponsor) =>
    sponsor.movies.map((movie) => normalizeMovie({
      movie,
      sponsor,
      sectionType,
    })),
  );
}

function normalizeMovie({ movie, sponsor, sectionType }) {
  const categoryAccentColor = getCategoryAccentColor(movie.category);

  return {
    ...movie,
    cover: movie.cover ?? movie.coverDesktop ?? movie.previewCover ?? movie.coverMobile,
    coverDesktop: movie.coverDesktop ?? movie.cover ?? movie.previewCover,
    coverMobile: movie.coverMobile ?? movie.cover ?? movie.coverDesktop,
    previewCover: movie.previewCover ?? movie.coverDesktop ?? movie.cover,
    sponsor: sponsor.name,
    sponsorLogo: sponsor.logo,
    sponsorData: sponsor,
    sectionType,
    categoryAccentColor: categoryAccentColor ?? movie.categoryAccentColor,
  };
}

function getCategoryAccentColor(category) {
  return CATALOG_FILTERS.find((filter) => filter.category === category)?.color;
}
