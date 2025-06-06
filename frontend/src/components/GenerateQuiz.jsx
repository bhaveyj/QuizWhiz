import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import Navbar from "./NavBar";

export const GenerateQuiz = () => {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const navigate = useNavigate();

  const generateQuiz = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${BACKEND_URL}/quiz/generate`,
        { topic, difficulty },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const quizId = response.data.id; // Assuming the backend returns the quiz ID
      navigate(`/quiz/${quizId}`);
    } catch (error) {
      console.error("Error generating quiz:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
        <Navbar />
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Generate a Quiz</h2>

      <label className="block mb-2 font-medium">Topic</label>
      <input
        type="text"
        className="w-full mb-4 p-2 border rounded"
        placeholder="e.g., JavaScript"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />

      <label className="block mb-2 font-medium">Difficulty</label>
      <select
        className="w-full mb-4 p-2 border rounded"
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
      >
        <option value="">Select difficulty</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <button
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        onClick={generateQuiz}
      >
        Generate Quiz
      </button>
    </div>
    </div>
  );
};
