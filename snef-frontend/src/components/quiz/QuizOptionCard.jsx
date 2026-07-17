import { getQuizOptionColor } from './quizOptionColors';

export default function QuizOptionCard({
  option,
  isSelected,
  isCorrectSelection,
  isLocked,
  feedbackStatus,
  onSelect,
}) {
  const color = getQuizOptionColor(option.color);
  const selectedBoxShadow = isCorrectSelection
    ? `0 0 0 1px ${color.border}, 0 0 32px ${color.glow}`
    : `0 0 0 1px ${color.border}, 0 18px 36px rgba(0, 0, 0, 0.24)`;

  return (
    <button
      type="button"
      disabled={isLocked}
      className={`quiz-option-card ${
        feedbackStatus === 'correct'
          ? 'quiz-option-card--correct-flash'
          : feedbackStatus === 'incorrect'
            ? 'quiz-option-card--incorrect-flash'
            : ''
      }`}
      style={{
        '--option-color': color.border,
        borderColor: color.border,
        background: isSelected
          ? `linear-gradient(145deg, ${color.tint}, #141414 62%)`
          : '#141414',
        boxShadow: isSelected ? selectedBoxShadow : 'none',
      }}
      aria-pressed={isSelected}
      data-quiz-option-id={option.id}
      onClick={() => onSelect(option)}
    >
      <span className="quiz-option-text">
        {option.text}
      </span>
    </button>
  );
}
