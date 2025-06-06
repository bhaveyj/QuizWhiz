import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signup");
  };



return (
  <div>
  <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
    <div className="text-2xl font-bold text-blue-600">QuizWhiz</div>

    <div className="flex items-center gap-4">
      {[
        { to: "/dashboard", label: "Dashboard" },
        { to: "/quiz", label: "Your Quizzes" },
        { to: "/quiz/generate", label: "Generate Quiz" },
      ].map(({ to, label }) => (
        <Link
          key={to}
          to={to}
          className="bg-blue-600 border border-blue-600 text-white px-4 py-2 rounded-full hover:bg-transparent hover:text-blue-600 hover:opacity-70 transition"
        >
          {label}
        </Link>
      ))}

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-transparent hover:text-red-500 border border-red-500 transition"
      >
        Logout
      </button>
    </div>
  </nav>
  </div>
);
}

export default Navbar;
