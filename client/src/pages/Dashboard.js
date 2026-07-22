import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [studentStats, setStudentStats] =
useState({
  connectedMentors: 0,
  pendingRequests: 0,
  upcomingSessions: 0,
});

  const [stats, setStats] =
  useState({
    totalSlots: 0,
    totalStudents: 0,
    pendingRequests: 0,
    acceptedSessions: 0,
    averageRating: 0,
  });
  const [recentFeedbacks,
  setRecentFeedbacks] =
  useState([]);
  useEffect(() => {

  if (user?.role === "mentor") {

    fetchStats();
    fetchFeedbacks();

  }

  if (user?.role === "student") {

    fetchStudentStats();

  }

}, []);

  const fetchStats = async () => {

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
  const fetchFeedbacks = async () => {

  try {

    const res =
      await axios.get(
        `http://localhost:5000/api/feedback/${user._id}`
      );

    setRecentFeedbacks(
      res.data.slice(0, 3)
    );

  } catch (error) {

    console.log(error);

  }

};
  const fetchStudentStats = async () => {

  try {

    const res =
      await axios.get(
        "http://localhost:5000/api/requests"
      );
  
    const myRequests =
  res.data.filter(
    (request) =>
      request.menteeId?._id ===
      user._id
  );
    const connectedMentors =
      myRequests.filter(
        (request) =>
          request.status === "accepted"
      ).length;

    const pendingRequests =
      myRequests.filter(
        (request) =>
          request.status === "pending"
      ).length;

    setStudentStats({
  connectedMentors,
  pendingRequests,
  upcomingSessions: connectedMentors,
});

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

      <p className="text-lg mb-8 text-gray-600">
        Welcome {user?.name}
      </p>

      {user?.role === "mentor" && (

        <div className="grid md:grid-cols-5 gap-6 mb-10">

          <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-lg">

            <h2 className="text-lg font-semibold">
              Total Slots
            </h2>

            <p className="text-4xl font-bold mt-3">
              {stats.totalSlots}
            </p>

          </div>

          <div className="bg-green-600 text-white p-6 rounded-2xl shadow-lg">

            <h2 className="text-lg font-semibold">
              Total Students
            </h2>

            <p className="text-4xl font-bold mt-3">
              {stats.totalStudents}
            </p>

          </div>

          <div className="bg-yellow-500 text-white p-6 rounded-2xl shadow-lg">

            <h2 className="text-lg font-semibold">
              Pending Requests
            </h2>

            <p className="text-4xl font-bold mt-3">
              {stats.pendingRequests}
            </p>

          </div>

          <div className="bg-purple-600 text-white p-6 rounded-2xl shadow-lg">

            <h2 className="text-lg font-semibold">
              Accepted Sessions
            </h2>

            <p className="text-4xl font-bold mt-3">
              {stats.acceptedSessions}
            </p>

          </div>

          <div className="bg-pink-600 text-white p-6 rounded-2xl shadow-lg">

  <h2 className="text-lg font-semibold">
    Rating
  </h2>

  <p className="text-4xl font-bold mt-3">
    ⭐ {stats.averageRating}
  </p>

</div>

        </div>

      )}
      {user?.role === "mentor" && (

  <div className="bg-white rounded-2xl shadow-lg p-6 mb-10">

    <h2 className="text-2xl font-bold mb-5">
      Quick Actions
    </h2>

    <div className="flex flex-wrap gap-4">

      <button
        onClick={() =>
          navigate("/create-slot")
        }
        className="bg-blue-600 text-white px-5 py-3 rounded-xl"
      >
        Create Slot
      </button>

      <button
        onClick={() =>
          navigate("/sessions")
        }
        className="bg-green-600 text-white px-5 py-3 rounded-xl"
      >
        View Sessions
      </button>

      <button
        onClick={() =>
          navigate("/feedback")
        }
        className="bg-pink-600 text-white px-5 py-3 rounded-xl"
      >
        View Feedback
      </button>

      <button
        onClick={() =>
          navigate("/upload-note")
        }
        className="bg-purple-600 text-white px-5 py-3 rounded-xl"
      >
        Upload Notes
      </button>

    </div>

  </div>

)}
     {user?.role === "mentor" && (

  <div className="bg-white rounded-2xl shadow-lg p-6 mb-10">

    <h2 className="text-2xl font-bold mb-5">
      Recent Feedback
    </h2>

    {
      recentFeedbacks.length === 0 ? (

        <p className="text-gray-500">
          No feedback yet
        </p>

      ) : (

        recentFeedbacks.map(
          (feedback) => (

            <div
              key={feedback._id}
              className="border-b py-3"
            >

              <p className="font-bold text-yellow-600">
                ⭐ {feedback.rating}/5
              </p>

              <p className="text-gray-700">
                {feedback.comment}
              </p>

              <p className="text-sm text-gray-500">
                {feedback.studentId?.name}
              </p>

            </div>

          )
        )

      )
    }

  </div>

)}

{user?.role === "student" && (

  <div className="grid md:grid-cols-4 gap-6 mb-10">

    <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-lg font-semibold">
        Connected Mentors
      </h2>
      <p className="text-4xl font-bold mt-3">
  {studentStats.connectedMentors}
</p>
    </div>

    <div className="bg-green-600 text-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-lg font-semibold">
        Upcoming Sessions
      </h2>
      <p className="text-4xl font-bold mt-3">
        {studentStats.upcomingSessions}
      </p>
    </div>

    <div className="bg-yellow-500 text-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-lg font-semibold">
        Pending Requests
      </h2>
      <p className="text-4xl font-bold mt-3">
        {studentStats.pendingRequests}
      </p>
    </div>

    <div className="bg-purple-600 text-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-lg font-semibold">
        Resources Downloaded
      </h2>
      <p className="text-4xl font-bold mt-3">
        0
      </p>
    </div>

  </div>

)}
{user?.role === "student" && (

  <div className="bg-white rounded-2xl shadow-lg p-6 mb-10">

    <h2 className="text-2xl font-bold mb-5">
      Quick Actions
    </h2>

    <div className="flex flex-wrap gap-4">

      <button
        onClick={() =>
          navigate("/mentors")
        }
        className="bg-blue-600 text-white px-5 py-3 rounded-xl"
      >
        Find Mentor
      </button>

      <button
        onClick={() =>
          navigate("/my-bookings")
        }
        className="bg-green-600 text-white px-5 py-3 rounded-xl"
      >
        My Booking
      </button>

      <button
        onClick={() =>
          navigate("/notes-library")
        }
        className="bg-purple-600 text-white px-5 py-3 rounded-xl"
      >
        Resource Library
      </button>

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