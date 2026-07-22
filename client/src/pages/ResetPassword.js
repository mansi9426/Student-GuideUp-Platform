import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ResetPassword() {

  const { email } = useParams();

  const [success, setSuccess] =
  useState(false);

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      if (
        password !==
        confirmPassword
      ) {

        alert(
          "Passwords do not match"
        );

        return;

      }

      try {

        const res =
          await axios.post(
            "http://localhost:5000/api/auth/reset-password",
            {
              email,
              password,
            }
          );

        setSuccess(true);
        setPassword("");

setConfirmPassword("");

      } catch (error) {

        alert(
          error.response?.data?.message ||
          "Failed to reset password"
        );

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
          Password Updated
        </h1>

        <p className="text-gray-600 mb-6">
          Your password has been updated successfully.
        </p>

        <button
          onClick={() =>
            window.location.href = "/login"
          }
          className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
        >
          Go To Login
        </button>

      </div>

    </div>

  );
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100">

      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-3">
  Create New Password
</h1>

    <p className="text-center text-gray-500 mb-6">
  Choose a strong password for your account.
</p>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="w-full border p-3 rounded-xl"
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
            className="w-full border p-3 rounded-xl"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl"
          >
            Update Password
          </button>

        </form>

      </div>

    </div>
  );
}

export default ResetPassword;