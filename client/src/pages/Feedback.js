import { useEffect, useState } from "react";
import axios from "axios";

function Feedback() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [feedbacks, setFeedbacks] =
    useState([]);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks =
    async () => {

      try {

        const res =
          await axios.get(
            `http://localhost:5000/api/feedback/${user._id}`
          );

        setFeedbacks(
          res.data
        );

      } catch (error) {

        console.log(error);

      }
    };

  const averageRating =
    feedbacks.length > 0
      ? (
          feedbacks.reduce(
            (sum, item) =>
              sum + item.rating,
            0
          ) / feedbacks.length
        ).toFixed(1)
      : 0;

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-5xl font-bold text-center mb-4">
        Feedback & Ratings
      </h1>

      <h2 className="text-3xl text-center mb-10">
        ⭐ {averageRating} / 5
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        {feedbacks.map(
          (feedback) => (

            <div
              key={feedback._id}
              className="bg-white p-6 rounded-xl shadow-lg"
            >

              <h3 className="text-xl font-bold mb-2">
                {feedback.studentId?.name}
              </h3>

              <p className="text-yellow-600 font-bold mb-2">
                {"⭐".repeat(
                  feedback.rating
                )}
              </p>

              <p>
                {feedback.comment}
              </p>

            </div>

          )
        )}

      </div>

    </div>
  );
}

export default Feedback;