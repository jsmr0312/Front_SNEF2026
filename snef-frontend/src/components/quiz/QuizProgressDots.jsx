export default function QuizProgressDots({ activeIndex, total }) {
  const dots = Array.from({ length: total }, (_, index) => index);

  return (
    <div className="quiz-progress-dots" aria-label="Progreso del quiz">
      {dots.map((dotIndex) => {
        const isActive = dotIndex === activeIndex;
        const isCompleted = dotIndex < activeIndex;

        return (
          <span
            key={dotIndex}
            className={`quiz-progress-dot ${
              isActive
                ? 'quiz-progress-dot--active'
                : isCompleted
                  ? 'quiz-progress-dot--completed'
                  : ''
            }`}
          />
        );
      })}
    </div>
  );
}
