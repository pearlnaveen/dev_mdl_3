import React, { useState } from "react";

const questions = [
  {
    question: "What does JSX stand for?",
    options: [
      "JavaScript XML",
      "Java Syntax Extension",
      "JavaScript Extension",
      "JSON XML"
    ],
    answer: "JavaScript XML"
  },
  {
    question: "Which hook is used to manage state in a React component?",
    options: ["useEffect", "useState", "useContext", "useRef"],
    answer: "useState"
  },
  {
    question: "Which prop is used to give a list item a unique identity in React?",
    options: ["id", "key", "index", "unique"],
    answer: "key"
  },
  {
    question: "Which function is used to create a React component?",
    options: ["createComponent", "ReactComponent", "function", "renderComponent"],
    answer: "function"
  },
  {
    question: "What does useEffect primarily handle?",
    options: [
      "Component side effects",
      "Component styling",
      "State declaration",
      "Event creation"
    ],
    answer: "Component side effects"
  }
];

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = questions[currentQuestion];

  const handleAnswer = (option) => {
    if (selectedAnswer) return;

    setSelectedAnswer(option);

    if (option === question.answer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion === questions.length - 1) {
      setFinished(true);
    } else {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer("");
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <h1>Quiz Complete!</h1>
          <p style={styles.score}>
            You scored <strong>{score}</strong> out of{" "}
            <strong>{questions.length}</strong>
          </p>

          <button style={styles.button} onClick={restartQuiz}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <span>
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span>Score: {score}</span>
        </div>

        <div style={styles.progressBackground}>
          <div
            style={{
              ...styles.progress,
              width: `${((currentQuestion + 1) / questions.length) * 100}%`
            }}
          />
        </div>

        <h1 style={styles.question}>{question.question}</h1>

        <div style={styles.options}>
          {question.options.map((option) => {
            const isSelected = selectedAnswer === option;
            const isCorrect = option === question.answer;

            let background = "#f8fafc";
            let border = "1px solid #e2e8f0";

            if (selectedAnswer) {
              if (isCorrect) {
                background = "#dcfce7";
                border = "1px solid #22c55e";
              } else if (isSelected) {
                background = "#fee2e2";
                border = "1px solid #ef4444";
              }
            }

            return (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                disabled={Boolean(selectedAnswer)}
                style={{
                  ...styles.option,
                  background,
                  border
                }}
              >
                {option}
              </button>
            );
          })}
        </div>

        {selectedAnswer && (
          <button style={styles.button} onClick={handleNext}>
            {currentQuestion === questions.length - 1
              ? "Finish Quiz"
              : "Next Question"}
          </button>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    padding: "20px",
    fontFamily:
      "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
  },
  card: {
    width: "100%",
    maxWidth: "600px",
    background: "#ffffff",
    borderRadius: "20px",
    padding: "32px",
    boxShadow: "0 20px 50px rgba(0, 0, 0, 0.15)",
    textAlign: "center"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    color: "#64748b",
    fontSize: "14px",
    marginBottom: "12px"
  },
  progressBackground: {
    width: "100%",
    height: "8px",
    background: "#e2e8f0",
    borderRadius: "999px",
    overflow: "hidden",
    marginBottom: "32px"
  },
  progress: {
    height: "100%",
    background: "#6366f1",
    borderRadius: "999px",
    transition: "width 0.3s ease"
  },
  question: {
    color: "#0f172a",
    fontSize: "28px",
    lineHeight: 1.3,
    marginBottom: "28px"
  },
  options: {
    display: "grid",
    gap: "12px",
    marginBottom: "24px"
  },
  option: {
    width: "100%",
    padding: "16px",
    borderRadius: "12px",
    fontSize: "16px",
    textAlign: "left",
    cursor: "pointer",
    color: "#0f172a",
    transition: "all 0.2s ease"
  },
  button: {
    border: "none",
    borderRadius: "12px",
    padding: "14px 24px",
    background: "#6366f1",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer"
  },
  score: {
    fontSize: "20px",
    color: "#475569",
    margin: "20px 0 28px"
  }
};
