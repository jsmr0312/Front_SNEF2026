import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import QuizFooterBrand from '../../components/quiz/QuizFooterBrand';
import QuizIncorrectModal from '../../components/quiz/QuizIncorrectModal';
import QuizLayout from '../../components/quiz/QuizLayout';
import QuizOptionCard from '../../components/quiz/QuizOptionCard';
import QuizQuestionCard from '../../components/quiz/QuizQuestionCard';
import QuizResultScreen from '../../components/quiz/QuizResultScreen';
import Button from '../../components/ui/Button';
import { getPlatformMovieById } from '../../data/sponsors/platformMovies';

export default function QuizPage() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const timeoutRef = useRef(null);
  const platformMovie = getPlatformMovieById(movieId);
  const quiz = platformMovie?.movie.quiz;
  const questions = quiz?.questions ?? [];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [incorrectModalOpen, setIncorrectModalOpen] = useState(false);
  const [incorrectExplanation, setIncorrectExplanation] = useState('');
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [answerFeedback, setAnswerFeedback] = useState(null);
  const [isLocked, setIsLocked] = useState(false);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (!platformMovie || !quiz || questions.length === 0) {
    return (
      <QuizLayout>
        <div className="mx-auto max-w-[560px] rounded-[18px] border border-white/8 bg-[#1A1A1A] p-8 text-center md:p-10">
          <p className="mb-3 text-sm font-medium text-[#22ADE4]">Quiz</p>

          <h1 className="mb-4 text-3xl font-semibold text-white">
            Quiz no encontrado
          </h1>

          <p className="mx-auto mb-8 max-w-[420px] text-base leading-7 text-[#999999]">
            No encontramos preguntas disponibles para esta película.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {platformMovie && (
              <Button
                variant="secondary"
                onClick={() => navigate(`/preview/${movieId}`)}
              >
                Volver a preview
              </Button>
            )}

            <Button variant="primaryBlue" onClick={() => navigate('/home')}>
              Volver al inicio
            </Button>
          </div>
        </div>
      </QuizLayout>
    );
  }

  if (isQuizFinished) {
    return (
      <QuizLayout>
        <QuizResultScreen
          sponsor={platformMovie.sponsor}
          correctAnswersCount={correctAnswersCount}
          totalQuestions={questions.length}
          rewardDitas={quiz.rewardDitas}
        />
      </QuizLayout>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  const advanceQuestion = () => {
    setSelectedOptionId(null);
    setAnswerFeedback(null);
    setIsLocked(false);

    if (currentQuestionIndex >= questions.length - 1) {
      setIsQuizFinished(true);
      return;
    }

    setCurrentQuestionIndex((index) => index + 1);
  };

  const handleSelectOption = (option) => {
    if (isLocked) {
      return;
    }

    setSelectedOptionId(option.id);
    setIsLocked(true);
    setAnswerFeedback({
      optionId: option.id,
      status: option.isCorrect ? 'correct' : 'incorrect',
    });

    if (option.isCorrect) {
      timeoutRef.current = window.setTimeout(() => {
        setCorrectAnswersCount((count) => count + 1);
        advanceQuestion();
      }, 1000);
      return;
    }

    setIncorrectExplanation(
      option.incorrectExplanation ??
        'Revisa la información de la película y vuelve a intentarlo en el siguiente reto.',
    );
    timeoutRef.current = window.setTimeout(() => {
      setAnswerFeedback(null);
      setIncorrectModalOpen(true);
    }, 1000);
  };

  const closeIncorrectModal = () => {
    setIncorrectModalOpen(false);
    advanceQuestion();
  };

  return (
    <QuizLayout>
      <div className="w-full">
        <QuizQuestionCard
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          total={questions.length}
        />

        <div className="quiz-options-grid">
          {currentQuestion.options.map((option) => (
            <QuizOptionCard
              key={option.id}
              option={option}
              isSelected={selectedOptionId === option.id}
              isCorrectSelection={
                selectedOptionId === option.id && option.isCorrect
              }
              isLocked={isLocked}
              feedbackStatus={
                answerFeedback?.optionId === option.id
                  ? answerFeedback.status
                  : null
              }
              onSelect={handleSelectOption}
            />
          ))}
        </div>

        <QuizFooterBrand
          sponsor={platformMovie.sponsor}
          activeIndex={currentQuestionIndex}
          total={questions.length}
        />

        <QuizIncorrectModal
          isOpen={incorrectModalOpen}
          explanation={incorrectExplanation}
          onClose={closeIncorrectModal}
        />
      </div>
    </QuizLayout>
  );
}
