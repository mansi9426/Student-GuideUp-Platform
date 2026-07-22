import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Connections() {

  const [connections, setConnections] =
    useState([]);

  const currentUser = JSON.parse(
  localStorage.getItem("user")
);

const navigate = useNavigate();

  useEffect(() => {
    fetchConnections();
  }, []);

  const fetchConnections =
    async () => {

      try {

        const res =
  await axios.get(
    "http://localhost:5000/api/requests/accepted"
  );

const filteredConnections =
  res.data.filter(
    (connection) => {

      if (
        currentUser?.role ===
        "mentor"
      ) {
        return (
          connection.mentorId?._id?.toString() ===
          currentUser._id?.toString()
        );
      }

      return (
        connection.menteeId?._id?.toString() ===
        currentUser._id?.toString()
      );
    }
  );

setConnections(
  filteredConnections
);

      } catch (error) {

        console.log(error);

      }
    };

  /*
  ========================
  Book Session
  ========================
  */
  const bookSession =
    async (mentorId) => {

      const user =
        JSON.parse(
          localStorage.getItem(
            "user"
          )
        );

      const date =
        prompt(
          "Enter Date (Example: 20 May)"
        );

      const time =
        prompt(
          "Enter Time (Example: 5 PM)"
        );

      if (
        !date ||
        !time
      )
        return;

      try {

        await axios.post(
          "http://localhost:5000/api/sessions",
          {
            mentorId,

            menteeId:
              user._id,

            date,

            time,
          }
        );

        alert(
          "Session Booked"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Booking Failed"
        );

      }
    };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-5xl font-bold text-center mb-10 text-gray-800">

        My Connections

      </h1>

      <div className="grid md:grid-cols-3 gap-8">

        {connections.map(
          (connection) => (

            <div
              key={
                connection._id
              }
              className="bg-white rounded-3xl shadow-xl p-6 hover:scale-105 transition duration-300"
            >

              {/* Avatar */}
              <div className="flex items-center gap-4 mb-5">

                <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center text-2xl font-bold">

                  {connection.mentorId?.name?.charAt(
                    0
                  )}

                </div>

                <div>

                  <h2 className="text-2xl font-bold">

                    {
                      connection
                        .mentorId
                        ?.name
                    }

                  </h2>

                  <p className="text-gray-500">

                    Mentor

                  </p>

                </div>

              </div>

              {/* Details */}
              <div className="space-y-3">

                <p>
                  <span className="font-semibold">
                    Mentee:
                  </span>{" "}
                  {
                    connection
                      .menteeId
                      ?.name
                  }
                </p>

                <p>
                  <span className="font-semibold">
                    Skills:
                  </span>{" "}
                  {connection
                    .mentorId
                    ?.skills ||
                    "Not Added"}
                </p>

                <p>
                  <span className="font-semibold">
                    Subjects:
                  </span>{" "}
                  {connection
                    .mentorId
                    ?.subjects ||
                    "Not Added"}
                </p>

                <p>
                  <span className="font-semibold">
                    Status:
                  </span>{" "}

                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">

                    accepted

                  </span>

                </p>

              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-6">

                <button
  onClick={() =>
    navigate(
      `/chat/${
        currentUser.role === "mentor"
          ? connection.menteeId?._id
          : connection.mentorId?._id
      }`
    )
  }
  className="flex-1 bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
>
  Chat
</button>
                <button
                  onClick={() =>
                    bookSession(
                      connection
                        .mentorId
                        ._id
                    )
                  }
                  className="flex-1 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
                >

                  Session

                </button>

              </div>

            </div>
          )
        )}

      </div>
    </div>
  );
}

export default Connections;