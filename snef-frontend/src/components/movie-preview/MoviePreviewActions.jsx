import { Film, Heart, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import Button from '../ui/Button';
import { isMovieWatched } from '../../utils/movieProgress';

export default function MoviePreviewActions({ movie }) {
  const navigate = useNavigate();
  const hasWatchedMovie = isMovieWatched(movie.id);

  return (
    <div className="movie-preview__actions flex flex-wrap items-center gap-3 md:gap-4">
      <Button
        variant="primaryGreen"
        icon={Play}
        className="min-w-[150px] !rounded-full !px-7"
        onClick={() => navigate(`/watch/${movie.id}`)}
      >
        Ver ahora
      </Button>

      <div
        className="movie-preview__quiz-action"
        tabIndex={hasWatchedMovie ? undefined : 0}
      >
        <Button
          variant="primaryBlue"
          icon={Film}
          className="min-w-[150px] !rounded-full !px-7"
          onClick={() => navigate(`/quiz/${movie.id}`)}
          disabled={!hasWatchedMovie}
          title={
            hasWatchedMovie
              ? 'Abrir Quiz'
              : 'Disponible al terminar la pelicula'
          }
        >
          Abrir Quiz
        </Button>

        {!hasWatchedMovie && (
          <span className="movie-preview__quiz-lock" role="tooltip">
            Disponible al terminar la pel&iacute;cula
          </span>
        )}
      </div>

      <button
        type="button"
        className="
          inline-flex h-12 w-12 items-center justify-center rounded-full
          bg-white text-[#141414] shadow-[0_16px_34px_rgba(0,0,0,0.25)]
          transition-all duration-300 ease-out
          hover:-translate-y-0.5 hover:bg-[#F5F5F5]
          focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4
          focus-visible:outline-[#22ADE4]
          active:scale-95
        "
        aria-label="Agregar a favoritos"
      >
        <Heart size={21} strokeWidth={2.4} />
      </button>
    </div>
  );
}
