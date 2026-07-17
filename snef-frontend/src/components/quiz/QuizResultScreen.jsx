import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import ditaIcon from '../../assets/iconos/ditas.png';
import Button from '../ui/Button';
import QuizFooterBrand from './QuizFooterBrand';

export default function QuizResultScreen({
  sponsor,
  correctAnswersCount,
  totalQuestions,
  rewardDitas,
}) {
  const navigate = useNavigate();
  const stars = Array.from({ length: totalQuestions }, (_, index) => index);

  return (
    <div className="quiz-result-shell">
      <section className="quiz-result-card">
        <h1 className="quiz-result-title">
          Resultado
        </h1>

        <div className="quiz-stars">
          {stars.map((starIndex) => {
            const isActive = starIndex < correctAnswersCount;

            return (
              <Star
                key={starIndex}
                aria-hidden="true"
                strokeWidth={1.8}
                className={`quiz-star ${
                  isActive
                    ? 'quiz-star--active'
                    : 'quiz-star--inactive'
                }`}
              />
            );
          })}
        </div>

        <p className="quiz-result-score">
          {correctAnswersCount}/{totalQuestions} respuestas correctas
        </p>

        <div className="quiz-reward-card">
          <p className="quiz-reward-label">Obtuviste:</p>

          <div className="quiz-reward-value">
            <img
              src={ditaIcon}
              alt="Ditas"
              className="quiz-reward-icon"
            />
            <span>+ {rewardDitas} ditas</span>
          </div>
        </div>

        <Button
          variant="primaryBlue"
          className="min-w-[260px] !rounded-[10px] !px-8"
          onClick={() => navigate('/home')}
        >
          Regresar a inicio
        </Button>
      </section>

      <QuizFooterBrand
        sponsor={sponsor}
        activeIndex={totalQuestions - 1}
        total={totalQuestions}
        showProgress={false}
        className="quiz-result-footer"
      />
    </div>
  );
}
