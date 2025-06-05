import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import Navbar from "./NavBar";

export const QuizPage = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/quiz/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setQuiz(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchQuiz();
  }, [id]);

  const handleSelect = (qIndex, selectedOption) => {
    setAnswers({
      ...answers,
      [qIndex]: selectedOption,
    });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/quiz/${id}/submit`,
        {
          answers,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setScore(res.data.score);
    } catch (err) {
      console.error(err);
    }
  };

  if (!quiz) return <div className="text-center mt-10">Loading quiz...</div>;

  return (
    <div>
        <Navbar />
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">{quiz.topic} Quiz</h1>
      {quiz.questions.map((q, index) => (
        <div key={index} className="mb-6">
          <p className="font-semibold mb-2">
            {index + 1}. {q.question}
          </p>
          <div className="grid gap-2">
            {q.options.map((opt, optIndex) => (
              <label
                key={optIndex}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={opt}
                  checked={answers[index] === opt}
                  onChange={() => handleSelect(index, opt)}
                  className="accent-blue-600"
                />
                {opt}
              </label>
            ))}
          </div>
        </div>
      ))}
      {score === null ? (
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Quiz
        </button>
      ) : (
        <div
          className={`mt-4 font-bold text-lg ${
            score === 0 ? "text-red-600" : "text-green-600"
          }`}
        >
          Your Score: {score}/{quiz.questions.length}
        </div>
      )}
    </div>
    </div>
  );
};
