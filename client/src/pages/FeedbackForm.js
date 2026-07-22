import { useState } from "react";
import axios from "axios";

function FeedbackForm() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [mentorId, setMentorId] =
    useState("");

  const [rating, setRating] =
    useState(5);

  const [comment, setComment] =
    useState("");

  const submitHandler =
    async (e) => {

      e.preventDefault();

      try {

        await axios.post(
          "http://localhost:5000/api/feedback",
          {
            mentorId,
            studentId:
              user._id,
            rating,
            comment,
          }
        );

        alert(
          "Feedback Submitted"
        );

        setMentorId("");
        setRating(5);
        setComment("");

      } catch (error) {

        console.log(error);

        alert(
          "Failed to submit feedback"
        );

      }
    };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg">

        <h1 className="text-3xl font-bold mb-6">
          Submit Feedback
        </h1>

        <form onSubmit={submitHandler}>

          <input
            type="text"
            placeholder="Mentor ID"
            value={mentorId}
            onChange={(e) =>
              setMentorId(
                e.target.value
              )
            }
            className="w-full border p-3 rounded mb-4"
            required
          />

          <select
            value={rating}
            onChange={(e) =>
              setRating(
                e.target.value
              )
            }
            className="w-full border p-3 rounded mb-4"
          >
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>

          <textarea
            placeholder="Write feedback"
            value={comment}
            onChange={(e) =>
              setComment(
                e.target.value
              )
            }
            className="w-full border p-3 rounded mb-4"
            rows="4"
            required
          />

          <button
            type="submit"
            className="bg-black text-white px-5 py-3 rounded"
          >
            Submit Feedback
          </button>

        </form>

      </div>

    </div>
  );
}

export default FeedbackForm;