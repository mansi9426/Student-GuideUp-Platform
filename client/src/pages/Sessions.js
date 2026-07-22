import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

function Sessions() {

  const updateBookingStatus =
  async (
    slotId,
    bookingId,
    status
  ) => {

    try {
    console.log(
  "slotId =",
  slotId
);

console.log(
  "bookingId =",
  bookingId
);
      await axios.put(
        `http://localhost:5000/api/session-slots/${slotId}/booking/${bookingId}`,
        { status }
      );

      fetchSessions();

      alert(
        `Booking ${status}`
      );

    } catch (error) {

      console.log(error);

      alert(
        "Update Failed"
      );

    }
  };
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [sessions, setSessions] =
    useState([]);

  useEffect(() => {
    fetchSessions();
  }, []);

  /*
  ========================
  Fetch Mentor Slots
  ========================
  */
  const fetchSessions =
    async () => {

      try {

        const res =
          await axios.get(
            `http://localhost:5000/api/session-slots/mentor/${user._id}`
          );

          console.log(
  JSON.stringify(res.data, null, 2)
);

        setSessions(
          res.data
        );

      } catch (error) {

        console.log(error);

      }
    };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-5xl font-bold text-center mb-10 text-gray-800">

        My Sessions

      </h1>

      <div className="grid md:grid-cols-3 gap-8">

        {sessions.map(
          (session) => (

            <div
              key={session._id}
              className="bg-white rounded-3xl shadow-xl p-6"
            >

              <h2 className="text-2xl font-bold mb-4">
                {session.title}
              </h2>

              <p className="mb-2">
                <span className="font-semibold">
                  Date:
                </span>{" "}
                {session.date}
              </p>

              <p className="mb-2">
                <span className="font-semibold">
                  Time:
                </span>{" "}
                {session.time}
              </p>

              <p className="mb-2">
                <span className="font-semibold">
                  Type:
                </span>{" "}
                {session.sessionType}
              </p>

              <p className="mb-2">
                <span className="font-semibold">
                  Capacity:
                </span>{" "}
                {session.capacity}
              </p>

              <p className="mb-4">
                <span className="font-semibold">
                  Booked Students:
                </span>{" "}
                {session.bookedStudents.length}
              </p>

              <hr className="my-4" />

              <h3 className="text-lg font-bold mb-3">
                Students
              </h3>

              {session.bookedStudents
                .length === 0 ? (

                <p className="text-gray-500">
                  No students booked yet
                </p>

              ) : (

                session.bookedStudents.map(
                  (student) => (

                    <div
                      key={student._id}
                      className="border rounded-lg p-3 mb-3"
                    >

                     <p className="font-semibold">
  {student.studentId?.name}
</p>

<p className="text-sm text-gray-500">
  {student.studentId?.email}
</p>

<p className="text-sm mt-2">
  Status:
  <span
  className={`font-bold ml-2
    ${
      student.status === "accepted"
        ? "text-green-600"
        : student.status === "rejected"
        ? "text-red-600"
        : student.status === "completed"
        ? "text-blue-600"
        : student.status === "cancelled"
        ? "text-gray-600"
        : "text-yellow-600"
    }`}
>
  {student.status}
</span>
</p> 
   {student.status === "pending" && (

  <div className="flex gap-2 mt-3">

    <button
      onClick={() =>
        updateBookingStatus(
          session._id,
          student._id,
          "accepted"
        )
      }
      className="bg-green-600 text-white px-3 py-1 rounded"
    >
      Accept
    </button>

    <button
      onClick={() =>
        updateBookingStatus(
          session._id,
          student._id,
          "rejected"
        )
      }
      className="bg-red-600 text-white px-3 py-1 rounded"
    >
      Reject
    </button>

    <button
  onClick={() =>
    updateBookingStatus(
      session._id,
      student._id,
      "completed"
    )
  }
  className="bg-blue-600 text-white px-3 py-1 rounded"
>
  Complete
</button>

  </div>

)}

{student.status === "accepted" && (

  <div className="flex gap-2 mt-3">

    <button
      onClick={() =>
        updateBookingStatus(
          session._id,
          student._id,
          "completed"
        )
      }
      className="bg-blue-600 text-white px-3 py-1 rounded"
    >
      Complete
    </button>

    <button
      onClick={() =>
        updateBookingStatus(
          session._id,
          student._id,
          "cancelled"
        )
      }
      className="bg-gray-600 text-white px-3 py-1 rounded"
    >
      Cancel
    </button>

  </div>

)}
                    </div>

                  )
                )

              )}

            </div>

          )
        )}

      </div>

    </div>
  );
}

export default Sessions;