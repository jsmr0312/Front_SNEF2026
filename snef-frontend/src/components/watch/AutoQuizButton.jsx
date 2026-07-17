import { useEffect, useState } from 'react';

export const AUTO_QUIZ_REDIRECT_SECONDS = 5;

export default function AutoQuizButton({
  onOpenQuiz,
  delaySeconds = AUTO_QUIZ_REDIRECT_SECONDS,
}) {
  const [remainingSeconds, setRemainingSeconds] = useState(delaySeconds);

  useEffect(() => {
    const startedAt = Date.now();
    const intervalId = window.setInterval(() => {
      const elapsedSeconds = Math.floor((Date.now() - startedAt) / 1000);
      setRemainingSeconds(Math.max(delaySeconds - elapsedSeconds, 0));
    }, 250);
    const timeoutId = window.setTimeout(onOpenQuiz, delaySeconds * 1000);

    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(timeoutId);
    };
  }, [delaySeconds, onOpenQuiz]);

  return (
    <button
      type="button"
      className="auto-quiz-button"
      onClick={onOpenQuiz}
      style={{ '--auto-quiz-duration': `${delaySeconds}s` }}
    >
      <span>Abrir Quiz en {remainingSeconds}</span>
    </button>
  );
}
