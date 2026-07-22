import { useState } from "react";
import axios from "axios";

function Profile() {

  const [user, setUser] =
    useState(
      JSON.parse(
        localStorage.getItem(
          "user"
        )
      )
    );

  const [formData, setFormData] =
    useState({
      bio: user?.bio || "",
      skills: user?.skills || "",
      subjects:
        user?.subjects || "",
    });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };

  /*
  ========================
  Update Profile
  ========================
  */
  const handleUpdate =
    async () => {

      try {

        const res =
          await axios.put(
            `http://localhost:5000/api/users/${user._id}`,
            formData
          );

        localStorage.setItem(
          "user",
          JSON.stringify(
            res.data
          )
        );

        setUser(
          res.data
        );

        alert(
          "Profile Updated"
        );

      } catch (error) {

        alert(
          "Update Failed"
        );

      }
    };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">

      <div className="bg-white shadow-xl rounded-3xl overflow-hidden w-full max-w-4xl">

        {/* Avatar */}
       {/* Profile Header */}

<div className="bg-gradient-to-r from-gray-900 to-black text-white p-10">

  <div className="flex flex-col items-center">

    <div className="w-24 h-24 rounded-full bg-white text-black flex items-center justify-center text-4xl font-bold shadow-lg">

      {user?.name?.charAt(0)}

    </div>

    <h1 className="text-4xl font-bold mt-4">

      {user?.name}

    </h1>

    <p className="text-gray-300 mt-2">

      {user?.email}

    </p>

    <span
      className={`mt-4 px-4 py-1 rounded-full text-sm font-semibold ${
        user?.isApproved
          ? "bg-green-500 text-white"
          : "bg-yellow-400 text-black"
      }`}
    >
      {user?.isApproved
        ? "Approved Mentor"
        : "Pending Approval"}
    </span>

  </div>

</div>

<div className="p-8">

        {/* Info Cards */}
       <div className="grid md:grid-cols-2 gap-4 mt-6">

          <div className="bg-white border border-gray-200 rounded-xl p-4 h-28 shadow-sm hover:shadow-md transition">
  <h3 className="text-xs font-semibold uppercase text-gray-500 mb-2">
    College
  </h3>

  <p className="text-lg font-semibold text-gray-800">
    {user?.college || "Not Added"}
  </p>
</div>

          <div className="bg-white border border-gray-200 rounded-xl p-4 h-28 shadow-sm hover:shadow-md transition">
  <h3 className="text-xs font-semibold uppercase text-gray-500 mb-2">
    Department
  </h3>

  <p className="text-lg font-semibold text-gray-800">
    {user?.department || "Not Added"}
  </p>
</div>

          <div className="bg-white border border-gray-200 rounded-xl p-4 h-28 shadow-sm hover:shadow-md transition">
  <h3 className="text-xs font-semibold uppercase text-gray-500 mb-2">
    Semester
  </h3>

  <p className="text-lg font-semibold text-gray-800">
    {user?.semester || "Not Added"}
  </p>
</div>

          <div className="bg-white border border-gray-200 rounded-xl p-4 h-28 shadow-sm hover:shadow-md transition">
  <h3 className="text-xs font-semibold uppercase text-gray-500 mb-2">
    Role
  </h3>

  <p className="text-lg font-semibold text-gray-800 capitalize">
    {user?.role}
  </p>
</div>

        </div>

        {/* Bio */}
        <div className="mt-8">

          <label className="font-semibold block mb-2">

            Bio

          </label>

          <textarea
            name="bio"
            placeholder="Write your bio..."
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            rows="4"
            value={formData.bio}
            onChange={handleChange}
          />

        </div>

        {/* Skills */}
        <div className="mt-5">

          <label className="font-semibold block mb-2">

            Skills

          </label>

          <input
            type="text"
            name="skills"
            placeholder="React, Node.js, Java..."
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            value={formData.skills}
            onChange={handleChange}
          />

        </div>

        {/* Subjects */}
        <div className="mt-5">

          <label className="font-semibold block mb-2">

            Subjects

          </label>

          <input
            type="text"
            name="subjects"
            placeholder="DBMS, DSA, CN..."
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            value={formData.subjects}
            onChange={handleChange}
          />

        </div>

        {/* Save Button */}
        <button
          onClick={handleUpdate}
          className="w-full mt-8 bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition duration-300"
        >

          Save Profile

        </button>

      </div>
    </div>
    </div>
  );
}

export default Profile;