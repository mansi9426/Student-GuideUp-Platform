import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Register() {

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      college: "",
      department: "",
      semester: "",
      role: "student",
    });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const res =
          await axios.post(
            "http://localhost:5000/api/auth/register",
            formData
          );

        alert(
          res.data.message
        );

      } catch (error) {

        alert(
          error.response.data
            .message
        );

      }
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black px-4 py-10">

      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-6">

        <h1 className="text-4xl font-bold text-center mb-2">

          Create Account

        </h1>

        <p className="text-center text-gray-500 mb-8">

          Join GuideUp Platform

        </p>

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-4"
        >

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            onChange={
              handleChange
            }
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            onChange={
              handleChange
            }
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            onChange={
              handleChange
            }
          />

          <input
            type="text"
            name="college"
            placeholder="College"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            onChange={
              handleChange
            }
          />

          <input
            type="text"
            name="department"
            placeholder="Department"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            onChange={
              handleChange
            }
          />

          <input
            type="text"
            name="semester"
            placeholder="Semester"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            onChange={
              handleChange
            }
          />

          {/* Role Dropdown */}
          <select
            name="role"
            value={
              formData.role
            }
            onChange={
              handleChange
            }
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          >

            <option value="student">

              Student

            </option>

            <option value="mentor">

              Mentor

            </option>

          </select>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition duration-300"
          >

            Register

          </button>

        </form>

        <p className="text-center mt-6 text-gray-600">

          Already have an account?{" "}

          <Link
            to="/login"
            className="font-semibold text-black"
          >

            Login

          </Link>

        </p>

      </div>
    </div>
  );
}

export default Register;