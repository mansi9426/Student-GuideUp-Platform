import { useEffect, useState } from "react";
import axios from "axios";

function Requests() {
  const [requests, setRequests] = useState([]);

  const currentUser = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    fetchRequests();

    const interval = setInterval(() => {
      fetchRequests();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/requests"
      );

      console.log("Current User:", currentUser);

console.log("All Requests:", res.data);

const filteredRequests = res.data.filter(
  (request) =>
    request.mentorId?._id ===
    currentUser._id
);

console.log(
  "Filtered Requests:",
  filteredRequests
);

      if (currentUser.role === "mentor") {
        setRequests(
          res.data.filter(
            (request) =>
              request.mentorId?._id ===
              currentUser._id
          )
        );
      } else {
        setRequests(
          res.data.filter(
            (request) =>
              request.menteeId?._id ===
              currentUser._id
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (
    id,
    status
  ) => {
    try {
      await axios.put(
        `http://localhost:5000/api/requests/${id}`,
        { status }
      );

      fetchRequests();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-5xl font-bold text-center mb-10 text-gray-800">
        Mentorship Requests
      </h1>

      <div className="grid md:grid-cols-3 gap-8">

        {requests.map((request) => (

          <div
            key={request._id}
            className="bg-white rounded-3xl shadow-xl p-6 hover:scale-105 transition duration-300"
          >

            <div className="flex items-center gap-4 mb-5">

              <div className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center text-2xl font-bold">

                {currentUser.role === "mentor"
                  ? request.menteeId?.name?.charAt(0)
                  : request.mentorId?.name?.charAt(0)}

              </div>

              <div>

                <h2 className="text-2xl font-bold">

                  {currentUser.role === "mentor"
                    ? request.menteeId?.name
                    : request.mentorId?.name}

                </h2>

                <p className="text-gray-500">

                  {currentUser.role === "mentor"
                    ? request.menteeId?.email
                    : request.mentorId?.email}

                </p>

              </div>

            </div>

            <div className="space-y-3">

              <p>
                <span className="font-semibold">
                  Status:
                </span>{" "}

                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold
                  ${
                    request.status === "accepted"
                      ? "bg-green-100 text-green-700"
                      : request.status === "rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {request.status}
                </span>
              </p>

            </div>

            {currentUser.role === "mentor" &&
              request.status === "pending" && (

              <div className="flex gap-3 mt-5">

                <button
                  onClick={() =>
                    updateStatus(
                      request._id,
                      "accepted"
                    )
                  }
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl"
                >
                  Accept
                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      request._id,
                      "rejected"
                    )
                  }
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
                >
                  Reject
                </button>

              </div>

            )}

          </div>

        ))}

      </div>
    </div>
  );
}

export default Requests;