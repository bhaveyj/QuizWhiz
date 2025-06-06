import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import Navbar from "./NavBar";

export const AllQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
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
  const filteredQuizzes = selectedDifficulty
    ? quizzes.filter((quiz) => quiz.difficulty === selectedDifficulty)
    : quizzes;

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="max-w-5xl mx-auto mt-10 px-6 pb-10">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-700">
          Your Quizzes
        </h1>
        <div className="mb-6 text-right">
          <label className="mr-2 font-medium text-gray-700">Filter by:</label>
          <select
            className="border px-3 py-2 rounded-md text-gray-700"
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
          >
            <option value="">All</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        {selectedDifficulty && (
          <button
            onClick={() => setSelectedDifficulty("")}
            className="ml-3 text-blue-600 underline text-sm"
          >
            Clear Filter
          </button>
        )}

        {filteredQuizzes.length === 0 ? (
          <p className="text-gray-600 text-center text-lg">
            No quizzes found for this filter.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="bg-white p-5 rounded-xl shadow-lg border hover:shadow-xl transition-shadow duration-300"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-1">
                  {quiz.topic}
                </h2>
                <p className="text-gray-500 capitalize mb-1">
                  <span className="font-medium text-gray-700">Difficulty:</span>{" "}
                  {quiz.difficulty}
                </p>
                <p className="text-gray-700 mb-1">
                  <span className="font-medium">Questions:</span>{" "}
                  {quiz.questions.length}
                </p>
                <p className="mb-1">
                  <span className="font-medium">Score:</span>{" "}
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
                <p className="text-sm text-gray-400 mb-4">
                  Created on: {new Date(quiz.createdAt).toLocaleDateString()}
                </p>
                <button
                  onClick={() => navigate(`/quiz/${quiz.id}`)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition duration-300"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
