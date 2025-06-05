import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import Navbar from "../components/NavBar";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [recentQuizzes, setRecentQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");

        // Fetch user
        const userRes = await axios.get(`${BACKEND_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(userRes.data.user);

        // Fetch quizzes
        const quizRes = await axios.get(`${BACKEND_URL}/quiz`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRecentQuizzes(quizRes.data.slice(-3).reverse());
      } catch (e) {
        console.error("Error fetching user", e);
        navigate("/signup");
      }
    }

    fetchData();
  }, [navigate]);

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        {user ? (
          <>
            <h1 className="text-2xl font-bold mb-6">Welcome, {user.name} 👋</h1>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <Link
                to="/quiz/generate"
                className="p-4 bg-blue-600 text-white rounded shadow hover:bg-blue-700 text-center font-semibold"
              >
                ➕ Generate New Quiz
              </Link>
              <Link
                to="/quiz"
                className="p-4 bg-green-600 text-white rounded shadow hover:bg-green-700 text-center font-semibold"
              >
                📚 View My Quizzes
              </Link>
            </div>

            {/* Recent Quizzes */}
            <h2 className="text-xl font-semibold mb-4">Recent Quizzes</h2>
            {recentQuizzes.length === 0 ? (
              <p className="text-gray-500">No quizzes found.</p>
            ) : (
              <div className="space-y-4">
                {recentQuizzes.map((quiz) => (
                  <div key={quiz.id} className="border p-4 rounded shadow-sm">
                    <h3 className="font-bold text-lg">
                      {quiz.topic} ({quiz.difficulty})
                    </h3>
                    <p className="text-sm text-gray-700">
                      Score:{" "}
                      {quiz.score == null ? (
                        <span className="text-red-600">Not submitted</span>
                      ) : (
                        <span className="text-green-600">{quiz.score}/5</span>
                      )}
                    </p>
                    <Link
                      to={`/quiz/${quiz.id}`}
                      className="text-blue-600 hover:underline mt-2 inline-block"
                    >
                      🔍 View Details
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
