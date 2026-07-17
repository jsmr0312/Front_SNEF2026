export default function QuizQuestionCard({ question, questionNumber, total }) {
  return (
    <article className="quiz-question-card">
      <p className="quiz-question-count">
        Pregunta {questionNumber} de {total}
      </p>

      <h1 className="quiz-question-title">
        {question.prompt}
      </h1>
    </article>
  );
}
