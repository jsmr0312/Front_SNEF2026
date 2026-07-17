import logoCondusef from '../../assets/Materiales-sponsors/Sala-de-cine/Condusef/logo-condusef.png';
import pelicula1Desktop from '../../assets/Materiales-sponsors/Sala-de-cine/Condusef/Pelicula1/portada-desktop.png';
import pelicula1Preview from '../../assets/Materiales-sponsors/Sala-de-cine/Condusef/Pelicula1/portada-previsualizacion.png';
import pelicula1Responsive from '../../assets/Materiales-sponsors/Sala-de-cine/Condusef/Pelicula1/portada-responsive.png';
import pelicula2Desktop from '../../assets/Materiales-sponsors/Sala-de-cine/Condusef/Pelicula2/portada-desktop2.png';
import pelicula2Preview from '../../assets/Materiales-sponsors/Sala-de-cine/Condusef/Pelicula2/portada-previsualizacion.png';
import pelicula2Responsive from '../../assets/Materiales-sponsors/Sala-de-cine/Condusef/Pelicula2/portada-responsive.png';
import { createMovieQuiz } from './movieQuizData';
import { sampleCloudinaryVideo } from './movieVideo';

const condusefMovieAssets = {
  pelicula1: {
    coverDesktop: pelicula1Desktop,
    coverMobile: pelicula1Responsive,
    coverResponsive: pelicula1Responsive,
    previewCover: pelicula1Preview,
    thumbnail: pelicula1Responsive,
  },
  pelicula2: {
    coverDesktop: pelicula2Desktop,
    coverMobile: pelicula2Responsive,
    coverResponsive: pelicula2Responsive,
    previewCover: pelicula2Preview,
    thumbnail: pelicula2Responsive,
  },
};

const condusefMovieSynopsis =
  'Dos ni\u00f1os decididos a ahorrar para cumplir su sue\u00f1o se ven atrapados en una serie de desaf\u00edos impuestos por Mr. Metiras, quien disfruta ponerlos al l\u00edmite. Solo Dusef podr\u00eda salvar la situaci\u00f3n.';

function createCondusefCinemaMovie({
  id,
  title,
  assetKey,
}) {
  const movieAssets = condusefMovieAssets[assetKey];

  return {
    id,
    title,
    category: 'Seguridad financiera',
    categoryAccentColor: '#E13B8A',
    availabilityLabel: 'Disponible en cine',
    synopsis: condusefMovieSynopsis,
    quiz: createMovieQuiz({ rewardDitas: 30 }),
    video: sampleCloudinaryVideo,
    sponsorLogo: logoCondusef,
    ...movieAssets,
  };
}

function createCondusefCinemaSponsor({
  id,
  movieIdPrefix,
  title = 'Colecci\u00f3n Condusef',
}) {
  return {
    id,
    name: 'Condusef',
    title,
    logo: logoCondusef,
    socialLinks: {
      facebook: '#',
      x: '#',
      linkedin: '#',
    },
    movies: [
      createCondusefCinemaMovie({
        id: `${movieIdPrefix}-pelicula-1`,
        title: 'Recupera el rumbo',
        assetKey: 'pelicula1',
      }),
      createCondusefCinemaMovie({
        id: `${movieIdPrefix}-pelicula-2`,
        title: 'Drama financiero: el musical',
        assetKey: 'pelicula2',
      }),
      createCondusefCinemaMovie({
        id: `${movieIdPrefix}-pelicula-3`,
        title: 'Recupera el rumbo: gran aventura',
        assetKey: 'pelicula1',
      }),
      createCondusefCinemaMovie({
        id: `${movieIdPrefix}-pelicula-4`,
        title: 'Drama financiero: nueva vida juntos',
        assetKey: 'pelicula2',
      }),
      createCondusefCinemaMovie({
        id: `${movieIdPrefix}-pelicula-5`,
        title: 'Recupera el rumbo: reto final',
        assetKey: 'pelicula1',
      }),
    ],
  };
}

export const cinemaSponsors = [
  createCondusefCinemaSponsor({
    id: 'condusef',
    movieIdPrefix: 'condusef',
  }),
  createCondusefCinemaSponsor({
    id: 'condusef-ensayo-2',
    movieIdPrefix: 'condusef-ensayo-2',
    title: 'Colecci\u00f3n Condusef II',
  }),
  createCondusefCinemaSponsor({
    id: 'condusef-ensayo-3',
    movieIdPrefix: 'condusef-ensayo-3',
    title: 'Colecci\u00f3n Condusef III',
  }),
];

export function getFeaturedCinemaSponsor() {
  return cinemaSponsors[0] ?? null;
}

export function getCinemaMovieById(movieId) {
  for (const sponsor of cinemaSponsors) {
    const movie = sponsor.movies.find((item) => item.id === movieId);

    if (movie) {
      return { sponsor, movie };
    }
  }

  return null;
}
