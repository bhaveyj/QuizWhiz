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
      
      <div className="bg-gray-100">
        <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-10 bg-white rounded-xl shadow-md mt-5">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          {quiz.topic} Quiz
        </h1>

        {quiz.questions.map((q, index) => (
          <div key={index} className="mb-8 border-b pb-6">
            <p className="text-lg font-medium text-gray-700 mb-4">
              {index + 1}. {q.question}
            </p>
            <div className="grid gap-3">
              {q.options.map((opt, optIndex) => (
                <label
                  key={optIndex}
                  className={`flex items-center gap-3 p-3 rounded-md border cursor-pointer transition-all ${
                    answers[index] === opt
                      ? "bg-blue-50 border-blue-500"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={opt}
                    checked={answers[index] === opt}
                    onChange={() => handleSelect(index, opt)}
                    className="accent-blue-600"
                  />
                  <span className="text-gray-800">{opt}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        {score === null ? (
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg shadow hover:bg-blue-700 transition"
          >
            Submit Quiz
          </button>
        ) : (
          <div
            className={`mt-6 text-center text-2xl font-bold ${
              score === 0 ? "text-red-600" : "text-green-600"
            }`}
          >
            Your Score: {score}/{quiz.questions.length}
          </div>
        )}
      </div>
      </div>
    </div>
  );
};
