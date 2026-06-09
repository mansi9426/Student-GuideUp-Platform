import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

function Admin() {
  const [users, setUsers] =
    useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers =
    async () => {
      try {
        const res =
          await axios.get(
            "http://localhost:5000/api/users"
          );

        setUsers(
          res.data
        );
      } catch (error) {
        console.log(
          error
        );
      }
    };

  const approveMentor =
    async (id) => {
      try {
        await axios.put(
  `http://localhost:5000/api/users/approve-mentor/${id}`
);
        

        alert(
          "Mentor Approved"
        );

        fetchUsers();
      } catch (error) {
        alert(
          "Failed"
        );
      }
    };

  const rejectMentor =
    async (id) => {
      try {
        await axios.put(
          `http://localhost:5000/api/users/${id}`,
          {
            mentorRequest:
              "rejected",
          }
        );

        alert(
          "Mentor Rejected"
        );

        fetchUsers();
      } catch (error) {
        alert(
          "Failed"
        );
      }
    };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-5xl font-bold text-center mb-10">
        Admin Panel
      </h1>

      <div className="grid md:grid-cols-3 gap-8">

        {users
          .filter(
  (user) =>
    user.role === "mentor" &&
    user.isApproved === false
)
          .map((user) => (

            <div
              key={user._id}
              className="bg-white rounded-3xl shadow-xl p-6"
            >

              <div className="flex items-center gap-4 mb-5">

                <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center text-2xl font-bold">

                  {user.name.charAt(
                    0
                  )}

                </div>

                <div>

                  <h2 className="text-2xl font-bold">

                    {user.name}

                  </h2>

                  <p className="text-gray-500">

                    {user.email}

                  </p>

                </div>

              </div>

              <div className="space-y-2 mb-5">

                <p>
                  <span className="font-semibold">
                    College:
                  </span>{" "}
                  {user.college}
                </p>

                <p>
                  <span className="font-semibold">
                    Department:
                  </span>{" "}
                  {user.department}
                </p>

                <p>
                  <span className="font-semibold">
                    Semester:
                  </span>{" "}
                  {user.semester}
                </p>

              </div>

              <div className="flex gap-3">

                <button
                  onClick={() =>
                    approveMentor(
                      user._id
                    )
                  }
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl"
                >
                  Approve
                </button>

                <button
                  onClick={() =>
                    rejectMentor(
                      user._id
                    )
                  }
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl"
                >
                  Reject
                </button>

              </div>

            </div>
          ))}

      </div>
    </div>
  );
}

export default Admin;