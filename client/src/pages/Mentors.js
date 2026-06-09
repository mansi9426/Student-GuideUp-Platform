import { useEffect, useState } from "react";
import axios from "axios";

function Mentors() {
  const currentUser =
    JSON.parse(localStorage.getItem("user")) || {};

  const [mentors, setMentors] = useState([]);

  const fetchMentors = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/users"
      );

      const approvedMentors = res.data.filter(
        (user) =>
          user.role === "mentor" &&
          user.isApproved === true
      );

      setMentors(approvedMentors);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMentors();
  }, []);

  if (!currentUser._id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">
          Please Login First
        </h1>
      </div>
    );
  }

  const sendRequest = async (mentorId) => {
    try {
      await axios.post(
        "http://localhost:5000/api/requests",
        {
          mentorId,
          menteeId: currentUser._id,
        }
      );

      alert("Request Sent Successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to send request");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-5xl font-bold text-center mb-10 text-gray-800">
        Peer Mentors
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        {mentors.length > 0 ? (
          mentors.map((mentor) => (
            <div
              key={mentor._id}
              className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition duration-300"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center text-2xl font-bold">
                  {mentor.name?.charAt(0)}
                </div>

                <div>
                  <h2 className="text-2xl font-bold">
                    {mentor.name}
                  </h2>

                  <p className="text-gray-500">
                    {mentor.email}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <p>
                  <span className="font-semibold">
                    Department:
                  </span>{" "}
                  {mentor.department}
                </p>

                <p>
                  <span className="font-semibold">
                    Semester:
                  </span>{" "}
                  {mentor.semester}
                </p>

                <p>
                  <span className="font-semibold">
                    Skills:
                  </span>{" "}
                  {mentor.skills || "Not Added"}
                </p>

                <p>
                  <span className="font-semibold">
                    Subjects:
                  </span>{" "}
                  {mentor.subjects || "Not Added"}
                </p>
              </div>

              {currentUser.role === "student" && (
                <button
                  onClick={() =>
                    sendRequest(mentor._id)
                  }
                  className="w-full mt-6 bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
                >
                  Request Guidance
                </button>
              )}
            </div>
          ))
        ) : (
          <h2 className="text-center text-2xl col-span-3">
            No Approved Mentors Available
          </h2>
        )}
      </div>
    </div>
  );
}

export default Mentors;