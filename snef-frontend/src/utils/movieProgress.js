const MOVIE_PROGRESS_STORAGE_KEY = 'snefMovieProgress';

export function getMovieProgress() {
  try {
    return JSON.parse(localStorage.getItem(MOVIE_PROGRESS_STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

export function markMovieAsWatched(movieId) {
  const progress = getMovieProgress();

  progress[movieId] = {
    ...(progress[movieId] || {}),
    watched: true,
    watchedAt: new Date().toISOString(),
  };

  localStorage.setItem(MOVIE_PROGRESS_STORAGE_KEY, JSON.stringify(progress));
}

export function isMovieWatched(movieId) {
  const progress = getMovieProgress();

  return Boolean(progress[movieId]?.watched);
}
