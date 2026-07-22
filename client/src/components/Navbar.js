import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // Login/Register page par Navbar hide
  if (
  location.pathname === "/login" ||
  location.pathname === "/register" ||
  location.pathname === "/admin" ||
  !token
) {
  return null;
}
   console.log(user);
  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav className="bg-black text-white px-8 py-4 shadow-lg">
      <div className="flex items-center justify-between">

        <Link
          to="/dashboard"
          className="text-3xl font-bold tracking-wide"
        >
          GuideUp
        </Link>

        <div className="flex items-center gap-6 text-lg">

          {user?.role === "student" && (
  <Link
    to="/mentors"
    className="hover:text-gray-300 transition"
  >
    Mentors
  </Link>
)}

          {user?.role === "mentor" && (
  <Link
    to="/requests"
    className="hover:text-gray-300 transition"
  >
    Requests
  </Link>
)}

          {user?.role !== "admin" && (
  <Link
    to="/connections"
    className="hover:text-gray-300 transition"
  >
    Connections
  </Link>
)}
     {user?.role === "student" && (
  <Link
    to="/available-sessions"
    className="hover:text-gray-300 transition"
  >
    Sessions
  </Link>
)}
    {user?.role === "student" && (
  <Link
    to="/my-bookings"
    className="hover:text-gray-300 transition"
  >
    My Bookings
  </Link>
)}

          {user?.role === "mentor" && (
  <Link
    to="/sessions"
    className="hover:text-gray-300 transition"
  >
    Sessions
  </Link>
)}

          {user?.role !== "admin" && (
  <Link
  to="/connections"
  className="hover:text-gray-300 transition"
>
  Chat
</Link>
)}

          {user?.role === "admin" && (
  <Link
    to="/admin"
    className="hover:text-gray-300 transition"
  >
    Admin Panel
  </Link>
)}

        {user?.role === "mentor" && (
  <Link
    to="/create-slot"
    className="hover:text-gray-300 transition"
  >
    Create Slot
  </Link>
)}

        {user?.role === "mentor" && (
  <Link
    to="/upload-note"
    className="hover:text-gray-300 transition"
  >
    Upload Notes
  </Link>
)}

        {user?.role === "student" && (
  <Link
    to="/notes-library"
    className="hover:text-gray-300 transition"
  >
    Notes
  </Link>
)}

        {user?.role === "mentor" && (
  <Link
    to="/feedback"
    className="hover:text-gray-300 transition"
  >
    Feedback
  </Link>
)}
          <Link
            to="/profile"
            className="hover:text-gray-300 transition"
          >
            Profile
          </Link>

          <span className="text-sm text-gray-300">
            {user?.name}
          </span>

          <button
            onClick={logoutHandler}
            className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition"
          >
            Logout
          </button>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;