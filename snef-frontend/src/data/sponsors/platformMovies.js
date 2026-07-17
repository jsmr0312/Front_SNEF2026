import { cinemaSponsors } from './homeCinemaSponsors';
import { sponsorShelves } from './sponsorShelves';

export function getPlatformMovieById(movieId) {
  const cinemaMovie = findMovieInSponsors({
    movieId,
    sponsors: cinemaSponsors,
    categoryType: 'sala-de-cine',
  });

  if (cinemaMovie) {
    return cinemaMovie;
  }

  for (const shelf of Object.values(sponsorShelves)) {
    const shelfMovie = findMovieInSponsors({
      movieId,
      sponsors: shelf.sponsors,
      categoryType: shelf.id,
      shelf,
    });

    if (shelfMovie) {
      return shelfMovie;
    }
  }

  return null;
}

function findMovieInSponsors({
  movieId,
  sponsors = [],
  categoryType,
  shelf,
}) {
  for (const sponsor of sponsors) {
    const movie = sponsor.movies.find((item) => item.id === movieId);

    if (movie) {
      return {
        categoryType,
        shelf,
        sponsor,
        movie,
      };
    }
  }

  return null;
}
