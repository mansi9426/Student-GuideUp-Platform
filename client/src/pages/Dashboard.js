import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [stats, setStats] =
    useState({
      totalSlots: 0,
      totalStudents: 0,
    });

  useEffect(() => {

    console.log("USER =", user);
console.log("USER ID =", user?._id);

    if (
      user?.role === "mentor"
    ) {
      fetchStats();
    }

  }, []);

  const fetchStats =
    async () => {

      try {

        const res =
          await axios.get(
            `http://localhost:5000/api/session-slots/stats/${user._id}`
          );

        setStats(
          res.data
        );

      } catch (error) {

        console.log(error);

      }
    };

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-5xl font-bold mb-4">
        Dashboard
      </h1>

      <p className="text-lg mb-8">
        Welcome to Student GuideUp Platform
      </p>

      {user?.role === "mentor" && (

        <div className="grid md:grid-cols-2 gap-6 mb-8">

          <div className="bg-white p-6 rounded-xl shadow-lg">

            <h2 className="text-xl font-semibold">
              Total Slots
            </h2>

            <p className="text-4xl font-bold mt-2">
              {stats.totalSlots}
            </p>

          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">

            <h2 className="text-xl font-semibold">
              Total Students
            </h2>

            <p className="text-4xl font-bold mt-2">
              {stats.totalStudents}
            </p>

          </div>

        </div>

      )}

      <button
        onClick={handleLogout}
        className="bg-black text-white px-5 py-2 rounded-lg"
      >
        Logout
      </button>

    </div>
  );
}

export default Dashboard;