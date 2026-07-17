import Button from '../ui/Button';

export default function QuizIncorrectModal({
  isOpen,
  explanation,
  onClose,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="quiz-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quiz-incorrect-title"
    >
      <div className="quiz-incorrect-modal">
        <h2 id="quiz-incorrect-title" className="quiz-incorrect-title">
          Respuesta incorrecta
        </h2>

        <div className="quiz-incorrect-explanation">
          <h3 className="quiz-incorrect-explanation-title">
            Justificación y explicación.
          </h3>

          <p className="quiz-incorrect-explanation-text">
            {explanation}
          </p>
        </div>

        <div className="quiz-incorrect-actions">
          <Button
            variant="primaryGreen"
            className="min-w-[170px] !h-12 !rounded-[10px] !px-8"
            onClick={onClose}
          >
            Entendido
          </Button>
        </div>
      </div>
    </div>
  );
}
