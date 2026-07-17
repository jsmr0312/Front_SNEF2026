import { useNavigate, useParams } from 'react-router-dom';

import MoviePreviewHero from '../../components/movie-preview/MoviePreviewHero';
import Button from '../../components/ui/Button';
import Navbar from '../../components/ui/Navbar';
import { getPlatformMovieById } from '../../data/sponsors/platformMovies';

export default function MoviePreview() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const previewData = getPlatformMovieById(movieId);

  if (!previewData) {
    return (
      <main className="snef-page min-h-screen">
        <Navbar />

        <section className="flex min-h-[calc(100vh_-_122px)] items-center justify-center px-4 py-10">
          <div className="snef-panel max-w-[560px] p-8 text-center md:p-10">
            <p className="mb-3 text-sm font-medium text-[#22ADE4]">
              Previsualizaci&oacute;n
            </p>

            <h1 className="mb-4 text-3xl font-semibold text-white">
              Pel&iacute;cula no encontrada
            </h1>

            <p className="mx-auto mb-8 max-w-[420px] text-base leading-7 text-[#999999]">
              No encontramos este contenido en la selecci&oacute;n local de la plataforma.
            </p>

            <Button variant="primary" onClick={() => navigate('/home')}>
              Volver al inicio
            </Button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="snef-page min-h-screen">
      <Navbar variant="overlay" />

      <MoviePreviewHero
        sponsor={previewData.sponsor}
        movie={previewData.movie}
      />
    </main>
  );
}
