import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const QuizDetails = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BACKEND_URL}/quiz/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setQuiz(response.data.quiz);
      } catch (err) {
        console.error("Error fetching quiz details", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-10 text-gray-600">Loading quiz details...</div>;
  }

  if (!quiz) {
    return <div className="text-center mt-10 text-red-500">Quiz not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-4">{quiz.topic} Quiz</h1>
      <p className="text-gray-700 mb-2 capitalize">
        Difficulty: <span className="font-semibold">{quiz.difficulty}</span>
      </p>
      <p className="text-gray-700 mb-4">
        Score:{" "}
        <span className={quiz.score === 0 ? "text-red-600 font-bold" : "text-green-600 font-bold"}>
          {quiz.score ?? "Not attempted"}
        </span>
      </p>

      <div className="space-y-6">
        {quiz.questions.map((q, index) => (
          <div key={index} className="border p-4 rounded-md">
            <h2 className="font-semibold mb-2">
              Q{index + 1}: {q.question}
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              {q.options.map((opt, i) => (
                <li
                  key={i}
                  className={`
                    ${opt === q.answer ? "text-green-700 font-semibold" : ""}
                    ${q.selected === opt && opt !== q.answer ? "text-red-600" : ""}
                  `}
                >
                  {opt}
                  {opt === q.answer ? " ✅" : ""}
                  {q.selected === opt && opt !== q.answer ? " ❌ (your choice)" : ""}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
