import SponsorSocialLinks from '../movie-preview/SponsorSocialLinks';
import QuizProgressDots from './QuizProgressDots';

export default function QuizFooterBrand({
  sponsor,
  activeIndex,
  total,
  showProgress = true,
  className = '',
}) {
  return (
    <footer className={`quiz-footer ${className}`}>
      <div className="quiz-footer-brand">
        <div className="quiz-footer-logo">
          <img
            src={sponsor.logo}
            alt={`Logo de ${sponsor.name}`}
            className="quiz-footer-logo-image"
          />
        </div>

        <SponsorSocialLinks socialLinks={sponsor.socialLinks} />
      </div>

      {showProgress && (
        <QuizProgressDots activeIndex={activeIndex} total={total} />
      )}
    </footer>
  );
}
