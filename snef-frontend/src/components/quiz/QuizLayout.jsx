export default function QuizLayout({ children }) {
  return (
    <main className="quiz-page">
      <section className="quiz-shell">
        {children}
      </section>
    </main>
  );
}
