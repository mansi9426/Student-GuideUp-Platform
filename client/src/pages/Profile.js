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

      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-2xl">

        {/* Avatar */}
        <div className="flex flex-col items-center">

          <div className="w-28 h-28 rounded-full bg-black text-white flex items-center justify-center text-5xl font-bold mb-4">

            {user?.name?.charAt(
              0
            )}

          </div>

          <h1 className="text-4xl font-bold">

            {user?.name}

          </h1>

          <p className="text-gray-500 mt-2">

            {user?.email}

          </p>

        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-5 mt-10">

          <div className="bg-gray-100 p-5 rounded-2xl">

            <h3 className="font-semibold text-gray-600 mb-2">

              College

            </h3>

            <p>

              {user?.college}

            </p>

          </div>

          <div className="bg-gray-100 p-5 rounded-2xl">

            <h3 className="font-semibold text-gray-600 mb-2">

              Department

            </h3>

            <p>

              {user?.department}

            </p>

          </div>

          <div className="bg-gray-100 p-5 rounded-2xl">

            <h3 className="font-semibold text-gray-600 mb-2">

              Semester

            </h3>

            <p>

              {user?.semester}

            </p>

          </div>

          <div className="bg-gray-100 p-5 rounded-2xl">

            <h3 className="font-semibold text-gray-600 mb-2">

              Role

            </h3>

            <p className="capitalize">

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
  );
}

export default Profile;