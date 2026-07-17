import { X } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import WatchEndScreen from '../../components/watch/WatchEndScreen';
import WatchPlayer from '../../components/watch/WatchPlayer';
import Button from '../../components/ui/Button';
import { getPlatformMovieById } from '../../data/sponsors/platformMovies';
import { markMovieAsWatched } from '../../utils/movieProgress';

export default function WatchPage() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const previewData = getPlatformMovieById(movieId);
  const [isFinished, setIsFinished] = useState(false);

  const goToPreview = () => {
    navigate(previewData ? `/preview/${previewData.movie.id}` : '/home');
  };

  const handleEnded = useCallback(() => {
    markMovieAsWatched(movieId);
    setIsFinished(true);
  }, [movieId]);

  if (!previewData) {
    return (
      <main className="watch-page watch-page--centered">
        <section className="watch-message">
          <p className="watch-message__eyebrow">Reproductor</p>
          <h1>Pel&iacute;cula no encontrada</h1>
          <p>No encontramos este contenido en la selecci&oacute;n local.</p>
          <Button variant="primary" onClick={() => navigate('/home')}>
            Volver al inicio
          </Button>
        </section>
      </main>
    );
  }

  const { movie, sponsor } = previewData;

  if (!movie.video) {
    return (
      <main className="watch-page watch-page--centered">
        <section className="watch-message">
          <p className="watch-message__eyebrow">Reproductor</p>
          <h1>Video no disponible</h1>
          <p>Esta pel&iacute;cula todav&iacute;a no tiene un video conectado.</p>
          <Button variant="primary" onClick={goToPreview}>
            Regresar a preview
          </Button>
        </section>
      </main>
    );
  }

  if (isFinished) {
    return (
      <main className="watch-page">
        <WatchEndScreen movie={movie} sponsor={sponsor} />
      </main>
    );
  }

  return (
    <main className="watch-page watch-page--player">
      <button
        type="button"
        className="watch-page__close"
        onClick={goToPreview}
        aria-label="Cerrar reproductor"
      >
        <X size={34} strokeWidth={3} />
      </button>

      <WatchPlayer movie={movie} video={movie.video} onEnded={handleEnded} />
    </main>
  );
}
