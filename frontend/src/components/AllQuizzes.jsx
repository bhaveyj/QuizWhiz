import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const AllQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BACKEND_URL}/quiz`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setQuizzes(response.data);
      } catch (err) {
        console.error("Failed to fetch quizzes", err);
        // navigate("/signin"); // optional redirect if unauthorized
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6">Your Quizzes</h1>
      {quizzes.length === 0 ? (
        <p className="text-gray-600">No quizzes found. Generate one!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quizzes.map((quiz) => (
            <div key={quiz.id} className="border p-4 rounded shadow-md bg-white">
              <h2 className="text-xl font-semibold">{quiz.topic}</h2>
              <p className="text-gray-600 capitalize">Difficulty: {quiz.difficulty}</p>
              <p className="text-gray-800">Questions: {quiz.questions.length}</p>
              <p className="mt-1">
                Score:{" "}
                <span
                  className={
                    quiz.score === 0
                      ? "text-red-600 font-bold"
                      : "text-green-600 font-bold"
                  }
                >
                  {quiz.score ?? "Not attempted"}
                </span>
              </p>
              
              <p className="text-sm text-gray-400 mt-1">
                Created on: {new Date(quiz.createdAt).toLocaleDateString()}
              </p>
              <button
      onClick={() => navigate(`/quiz/${quiz.id}`)}
      className="mt-3 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
    >View Details</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
