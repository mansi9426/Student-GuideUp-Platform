import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
  useState(false);

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        const res =
          await axios.post(
            "http://localhost:5000/api/auth/forgot-password",
            { email }
          );

        navigate(
  `/reset-password/${email}`
);

      } catch (error) {

        alert(
          error.response?.data?.message ||
          "Something went wrong"
        );

      } finally {

        setLoading(false);

      }
    };

    if (success) {

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100">

      <div className="bg-white p-8 rounded-3xl shadow-2xl text-center max-w-md">

        <div className="text-6xl mb-4">
          ✅
        </div>

        <h1 className="text-3xl font-bold mb-3">
          Email Sent
        </h1>

        <p className="text-gray-600">
          Password reset instructions have been generated successfully.
        </p>

      </div>

    </div>

  );
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-4">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">

        <div className="text-center mb-8">

          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">

            🔒

          </div>

         <h1 className="text-3xl font-bold text-gray-800">
  Reset Your Password
</h1>

          <p className="text-gray-500 mt-2">
  Enter your registered email address to continue
</p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>

            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
          >
            {
              loading
                ? "Processing..."
                : "Continue"
            }
          </button>

        </form>

      </div>

    </div>
  );
}

export default ForgotPassword;