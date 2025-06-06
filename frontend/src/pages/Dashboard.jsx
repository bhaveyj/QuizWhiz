import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import Navbar from "../components/NavBar";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [recentQuizzes, setRecentQuizzes] = useState([]);
  const [summary, setSummary] = useState({ total: 0, perfectScore: 0});
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

  useEffect(() => {
  const fetchSummary = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${BACKEND_URL}/quiz/summary`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSummary(res.data);
    } catch (error) {
      console.error("Error fetching quiz summary", error);
    }
  };

  fetchSummary(); 
}, []); 


  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 bg-white mt-10">
        {user ? (
          <>
            <h1 className="text-2xl font-bold mb-6">Welcome, {user.name} 👋</h1>

            {/* Dashboard Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="p-4 bg-blue-100 text-blue-800 rounded shadow text-center">
                <p className="text-xl font-bold">{summary.total}</p>
                <p className="text-sm">Total Quizzes</p>
              </div>
              <div className="p-4 bg-green-100 text-green-800 rounded shadow text-center">
                <p className="text-xl font-bold">
                  {summary.perfectScore}
                </p>
                <p className="text-sm">Perfect Scores</p>
              </div>
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
