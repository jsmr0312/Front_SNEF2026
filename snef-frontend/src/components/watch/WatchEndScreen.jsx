import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import SponsorSocialLinks from '../movie-preview/SponsorSocialLinks';
import AutoQuizButton from './AutoQuizButton';

export default function WatchEndScreen({ movie, sponsor }) {
  const navigate = useNavigate();
  const backgroundImage = movie.previewCover ?? movie.coverDesktop ?? movie.cover;

  const openPreview = () => {
    navigate(`/preview/${movie.id}`);
  };

  const openQuiz = useCallback(() => {
    navigate(`/quiz/${movie.id}`);
  }, [movie.id, navigate]);

  return (
    <section className="watch-end-screen">
      <img
        src={backgroundImage}
        alt=""
        className="watch-end-screen__background"
        aria-hidden="true"
      />

      <div className="watch-end-screen__overlay" aria-hidden="true" />

      <div className="watch-end-screen__content">
        <div className="watch-end-screen__brand-row">
          <img
            src={sponsor.logo}
            alt={`Logo de ${sponsor.name}`}
            className="watch-end-screen__logo"
          />

          <SponsorSocialLinks socialLinks={sponsor.socialLinks} />
        </div>

        <h1 className="watch-end-screen__title">{movie.title}</h1>

        <div className="watch-end-screen__actions">
          <button
            type="button"
            className="watch-end-screen__back-button"
            onClick={openPreview}
          >
            Regresar
          </button>

          <AutoQuizButton onOpenQuiz={openQuiz} />
        </div>
      </div>
    </section>
  );
}
