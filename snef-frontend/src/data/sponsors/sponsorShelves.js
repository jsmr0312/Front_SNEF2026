import condusefLogo from '../../assets/Materiales-sponsors/Oro/Condusef/logo-condusef.png';
import condusefCover from '../../assets/Materiales-sponsors/Oro/Condusef/Pelicula1/portada-desktop.png';
import condusefPreview from '../../assets/Materiales-sponsors/Oro/Condusef/Pelicula1/portada-previsualizacion.png';
import fintechLogo from '../../assets/Materiales-sponsors/Oro/FinTech/logo-fintech.svg';
import fintechCover from '../../assets/Materiales-sponsors/Oro/FinTech/Pelicula1/portada-desktop.png';
import fintechPreview from '../../assets/Materiales-sponsors/Oro/FinTech/Pelicula1/portada-previsualizacion.png';
import { createMovieQuiz } from './movieQuizData';
import { sampleCloudinaryVideo } from './movieVideo';

const sponsorAssetSets = {
  condusef: {
    sponsorName: 'Condusef',
    logo: condusefLogo,
    cover: condusefCover,
    previewCover: condusefPreview,
    titleBase: 'Dusef salva el d\u00eda',
    categoryAccentColor: '#E18831',
    synopsis:
      'Dusef acompaña a una comunidad que aprende a organizar su dinero, distinguir riesgos y tomar decisiones financieras con más confianza.',
    socialLinks: {
      facebook: '#',
      x: '#',
      linkedin: '#',
    },
  },
  fintech: {
    sponsorName: 'FinTech M\u00e9xico',
    logo: fintechLogo,
    cover: fintechCover,
    previewCover: fintechPreview,
    titleBase: 'Combate financiero',
    categoryAccentColor: '#8DCD21',
    synopsis:
      'Una aventura sobre metas, pagos responsables y herramientas digitales que ayudan a convertir pequeños hábitos en grandes avances.',
    socialLinks: {
      facebook: '#',
      x: '#',
      linkedin: '#',
    },
  },
};

const thematicCategories = [
  'Resiliencia financiera',
  'Control financiero',
  'Seguridad financiera',
  'Libertad financiera',
];

const categoryAccentColors = {
  'Resiliencia financiera': '#F08725',
  'Control financiero': '#8DCD21',
  'Seguridad financiera': '#E13B8A',
  'Libertad financiera': '#22ADE4',
};

function createMockMovies({
  shelfId,
  sponsorId,
  sponsorIndex,
  moviesPerSponsor,
  assetSet,
}) {
  return Array.from({ length: moviesPerSponsor }, (_, movieIndex) => {
    const category =
      thematicCategories[
        (sponsorIndex + movieIndex) % thematicCategories.length
      ];
    const movieNumber = movieIndex + 1;

    return {
      id: `${shelfId}-${sponsorId}-pelicula-${movieNumber}`,
      title: `${assetSet.titleBase} ${movieNumber}`,
      category,
      categoryAccentColor:
        categoryAccentColors[category] ?? assetSet.categoryAccentColor,
      cover: assetSet.cover,
      coverDesktop: assetSet.cover,
      coverMobile: assetSet.cover,
      previewCover: assetSet.previewCover,
      synopsis: assetSet.synopsis,
      quiz: createMovieQuiz({ rewardDitas: 30 }),
      video: sampleCloudinaryVideo,
    };
  });
}

function createMockSponsor({
  shelfId,
  index,
  moviesPerSponsor,
}) {
  const isCondusef = index % 2 === 1;
  const assetKey = isCondusef ? 'condusef' : 'fintech';
  const assetSet = sponsorAssetSets[assetKey];
  const sponsorSequence = Math.ceil(index / 2);
  const sponsorId = `${assetKey}-${sponsorSequence}`;

  return {
    id: sponsorId,
    name: `${assetSet.sponsorName} ${sponsorSequence}`,
    logo: assetSet.logo,
    socialLinks: assetSet.socialLinks,
    movies: createMockMovies({
      shelfId,
      sponsorId,
      sponsorIndex: index - 1,
      moviesPerSponsor,
      assetSet,
    }),
  };
}

function createMockSponsors({ shelfId, totalSponsors, moviesPerSponsor }) {
  return Array.from({ length: totalSponsors }, (_, sponsorIndex) =>
    createMockSponsor({
      shelfId,
      index: sponsorIndex + 1,
      moviesPerSponsor,
    }),
  );
}

export const sponsorShelves = {
  oro: {
    id: 'oro',
    title: 'Nuestra selecci\u00f3n Oro',
    layout: 'sponsor-stack',
    rowCount: 3,
    moviesPerSponsor: 3,
    aspectRatio: '600 / 870',
    sponsors: createMockSponsors({
      shelfId: 'oro',
      totalSponsors: 9,
      moviesPerSponsor: 3,
    }),
  },
  plata: {
    id: 'plata',
    title: 'Nuestra selecci\u00f3n Plata',
    layout: 'sponsor-stack',
    rowCount: 2,
    moviesPerSponsor: 2,
    aspectRatio: '600 / 600',
    sponsors: createMockSponsors({
      shelfId: 'plata',
      totalSponsors: 8,
      moviesPerSponsor: 2,
    }),
  },
  bronce: {
    id: 'bronce',
    title: 'Nuestra selecci\u00f3n Bronce',
    layout: 'row-fill',
    rowCount: 2,
    moviesPerSponsor: 1,
    aspectRatio: '600 / 330',
    sponsors: createMockSponsors({
      shelfId: 'bronce',
      totalSponsors: 8,
      moviesPerSponsor: 1,
    }),
  },
};

export function getSponsorShelfById(shelfId) {
  return sponsorShelves[shelfId] ?? null;
}
