import { useEffect, useState } from "react";
import axios from "axios";

function MyBookings() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [bookings, setBookings] =
    useState([]);

    const [rating, setRating] =
  useState(5);

const [comment, setComment] =
  useState("");

const [selectedMentor, setSelectedMentor] =
  useState(null);

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

    const submitFeedback =
  async () => {

    try {

      await axios.post(
        "http://localhost:5000/api/feedback",
        {
          mentorId:
            selectedMentor,

          studentId:
            user._id,

          rating,

          comment,
        }
      );

      alert(
        "Feedback Submitted"
      );

      setSelectedMentor(
        null
      );

      setRating(5);

      setComment("");

    } catch (error) {

  console.log(error);

  alert(
    error.response?.data?.message ||
    "Failed to submit feedback"
  );

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
        : booking.status === "completed"
        ? "text-blue-600"
        : "text-yellow-600"
    }`}
  >
    {booking.status}
  </span>
</p>
{
  booking.status ===
    "accepted" &&

  booking.meetingLink && (

    <div className="mt-4">

      <p className="text-sm text-gray-500 mb-2">
        Platform:
        <span className="font-bold ml-2">
          {booking.meetingPlatform}
        </span>
      </p>

      <a
        href={
          booking.meetingLink
        }
        target="_blank"
        rel="noreferrer"
        className="block bg-green-600 text-white text-center py-2 rounded-lg hover:bg-green-700"
      >
        Join Session
      </a>

    </div>

  )
}
{
  booking.status === "completed" && (
    <button
  onClick={() =>
    setSelectedMentor(
      booking.mentorId?._id
    )
  }
  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
>
  Give Feedback
</button>
  )
}

          </div>

        ))}

      </div>
        {
        selectedMentor && (

          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">

            <div className="bg-white p-6 rounded-xl w-96">

              <h2 className="text-2xl font-bold mb-4">
                Submit Feedback
              </h2>

              <select
                value={rating}
                onChange={(e) =>
                  setRating(
                    e.target.value
                  )
                }
                className="w-full border p-2 rounded mb-4"
              >
                <option value="5">⭐⭐⭐⭐⭐</option>
                <option value="4">⭐⭐⭐⭐</option>
                <option value="3">⭐⭐⭐</option>
                <option value="2">⭐⭐</option>
                <option value="1">⭐</option>
              </select>

              <textarea
                value={comment}
                onChange={(e) =>
                  setComment(
                    e.target.value
                  )
                }
                placeholder="Write feedback..."
                className="w-full border p-2 rounded mb-4"
                rows="4"
              />

              <div className="flex gap-3">

                <button
                  onClick={submitFeedback}
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Submit
                </button>

                <button
                  onClick={() =>
                    setSelectedMentor(
                      null
                    )
                  }
                  className="bg-gray-600 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>

              </div>

            </div>

          </div>

        )
      }
    </div>
  );
}

export default MyBookings;