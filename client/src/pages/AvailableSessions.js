import { useEffect, useState } from "react";
import axios from "axios";

function AvailableSessions() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [slots, setSlots] =
    useState([]);

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots =
    async () => {
      try {

        const res =
          await axios.get(
            "http://localhost:5000/api/session-slots"
          );

        setSlots(
          res.data
        );

      } catch (error) {

        console.log(error);

      }
    };

  const bookSession =
    async (slotId) => {

      try {

        const res =
          await axios.put(
            `http://localhost:5000/api/session-slots/book/${slotId}`,
            {
              studentId:
                user._id,
            }
          );

        alert(
          res.data.message
        );

        fetchSlots();

      } catch (error) {

        alert(
          error.response?.data?.message ||
          "Booking Failed"
        );

      }
    };

  return (
    <div className="p-10">

      <h1 className="text-4xl font-bold mb-8">
        Available Sessions
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        {slots.map((slot) => (

          <div
            key={slot._id}
            className="bg-white p-6 rounded-xl shadow"
          >

            <h2 className="text-2xl font-bold">
              {slot.title}
            </h2>

            <p>
              Mentor:{" "}
              {slot.mentorId?.name}
            </p>

            <p>
              Date:{" "}
              {slot.date}
            </p>

            <p>
              Time:{" "}
              {slot.time}
            </p>

            <p>
              Type:{" "}
              {slot.sessionType}
            </p>

            <p>
              Seats:{" "}
              {slot.capacity}
            </p>

            <button
              onClick={() =>
                bookSession(
                  slot._id
                )
              }
              className="bg-black text-white px-4 py-2 rounded mt-4"
            >
              Book Session
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default AvailableSessions;