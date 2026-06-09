import { useEffect, useState } from "react";
import axios from "axios";

function MyBookings() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [bookings, setBookings] =
    useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings =
    async () => {

      try {

        const res =
          await axios.get(
            `http://localhost:5000/api/session-slots/student/${user._id}`
          );

        setBookings(
          res.data
        );

      } catch (error) {

        console.log(error);

      }
    };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-5xl font-bold text-center mb-10">

        My Bookings

      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        {bookings.map((booking) => (

          <div
            key={booking._id}
            className="bg-white p-6 rounded-2xl shadow-lg"
          >

            <h2 className="text-2xl font-bold mb-3">
              {booking.title}
            </h2>

            <p>
              <b>Mentor:</b>{" "}
              {booking.mentorId?.name}
            </p>

            <p>
              <b>Date:</b>{" "}
              {booking.date}
            </p>

            <p>
              <b>Time:</b>{" "}
              {booking.time}
            </p>

            <p>
              <b>Type:</b>{" "}
              {booking.sessionType}
            </p>

            <p className="mt-3">
              <b>Status:</b>{" "}
              <span
                className={`font-bold
                ${
                  booking.status === "accepted"
                    ? "text-green-600"
                    : booking.status === "rejected"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                {booking.status}
              </span>
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default MyBookings;