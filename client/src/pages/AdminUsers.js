import { useEffect, useState } from "react";
import axios from "axios";


function AdminUsers() {
  const [users, setUsers] = useState([]);
const [search, setSearch] = useState("");
const [editingUser, setEditingUser] = useState(null);

const [formData, setFormData] = useState({
  name: "",
  email: "",
  role: "",
});


useEffect(() => {
  fetchUsers();
}, []);

const fetchUsers = async () => {
  try {
    const res = await axios.get(
      "http://localhost:5000/api/users"
    );

    setUsers(res.data);

  } catch (error) {
    console.log(error);
  }
};
const deleteUser = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this user?"
  );

  if (!confirmDelete) return;

  try {
    await axios.delete(
      `http://localhost:5000/api/users/${id}`
    );

    alert("User deleted successfully");

    fetchUsers();

  } catch (error) {
    alert("Delete failed");
    console.log(error);
  }
};
const updateUser = async () => {
  try {
    await axios.put(
      `http://localhost:5000/api/users/${editingUser._id}`,
      formData
    );

    alert("User updated successfully");

    setEditingUser(null);

    fetchUsers();

  } catch (error) {
    alert("Update failed");
    console.log(error);
  }
};

  return (
    <div className="p-8">

      {editingUser && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

    <div className="bg-white rounded-2xl shadow-2xl w-[500px] p-8">

      <h2 className="text-2xl font-bold mb-6">
        Edit User
      </h2>

      <div className="space-y-4">

        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value,
            })
          }
          className="w-full border rounded-lg px-4 py-3"
        />

        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value,
            })
          }
          className="w-full border rounded-lg px-4 py-3"
        />

        <select
          value={formData.role}
          onChange={(e) =>
            setFormData({
              ...formData,
              role: e.target.value,
            })
          }
          className="w-full border rounded-lg px-4 py-3"
        >
          <option value="student">
            Student
          </option>

          <option value="mentor">
            Mentor
          </option>

          <option value="admin">
            Admin
          </option>

        </select>

      </div>

      <div className="flex justify-end gap-3 mt-8">

        <button
          onClick={() => setEditingUser(null)}
          className="px-5 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
        >
          Cancel
        </button>

        <button
          onClick={updateUser}
          className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          Save Changes
        </button>

      </div>

    </div>

  </div>
)}

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Users Management
        </h1>

        <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
          + Add User
        </button>

      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">

        <input
  type="text"
  placeholder="Search users..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full border rounded-lg px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>

        <table className="w-full">

          <thead>

            <tr className="bg-gray-100">

              <th className="text-left p-4">Name</th>

              <th className="text-left p-4">Email</th>

              <th className="text-left p-4">Role</th>

              <th className="text-left p-4">Status</th>

              <th className="text-center p-4">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

  {users
    .filter(
      (user) =>
        user.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        user.email
          .toLowerCase()
          .includes(search.toLowerCase())
    )
    .map((user) => (

      <tr
        key={user._id}
        className="border-b hover:bg-gray-50"
      >

        <td className="p-4">
          {user.name}
        </td>

        <td className="p-4">
          {user.email}
        </td>

        <td className="p-4 capitalize">
          {user.role}
        </td>

        <td className="p-4">
          {user.role === "mentor"
            ? (user.isApproved
                ? "Approved"
                : "Pending")
            : "-"}
        </td>

        <td className="p-4">

          <div className="flex gap-2">

            <button className="bg-green-600 text-white px-3 py-2 rounded">
              Approve
            </button>

            <button
  onClick={() => {
    setEditingUser(user);

    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
    });
  }}
  className="bg-yellow-500 text-white px-3 py-2 rounded hover:bg-yellow-600"
>
  Edit
</button>
            <button
  onClick={() => deleteUser(user._id)}
  className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700"
>
  Delete
</button>

          </div>

        </td>

      </tr>

    ))}

</tbody>
        </table>

      </div>

    </div>
  );
}

export default AdminUsers;