import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {

  const [stats, setStats] = useState({
    students: 0,
    mentors: 0,
    pending: 0,
    sessions: 0,
  });


  useEffect(() => {

    fetchStats();

  }, []);



  const fetchStats = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/users"
      );


      const users = res.data;


      setStats({

        students: users.filter(
          user => user.role === "student"
        ).length,


        mentors: users.filter(
          user =>
            user.role === "mentor" &&
            user.isApproved === true
        ).length,


        pending: users.filter(
          user =>
            user.role === "mentor" &&
            user.isApproved === false
        ).length,


        sessions: 0,

      });


    } catch(error){

      console.log(error);

    }

  };



  return (

    <div className="p-10 bg-gray-100 min-h-screen">


      <h1 className="text-4xl font-bold">
        Admin Dashboard
      </h1>


      <p className="text-gray-500 mt-2 mb-8">
        Welcome Admin 👋 Manage your GuideUp platform here.
      </p>




      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">



        <div className="bg-blue-600 text-white p-6 rounded-2xl shadow">

          <h2 className="text-lg">
            Total Students
          </h2>

          <p className="text-4xl font-bold mt-3">
            {stats.students}
          </p>

        </div>





        <div className="bg-green-600 text-white p-6 rounded-2xl shadow">

          <h2 className="text-lg">
            Approved Mentors
          </h2>

          <p className="text-4xl font-bold mt-3">
            {stats.mentors}
          </p>

        </div>





        <div className="bg-yellow-500 text-white p-6 rounded-2xl shadow">

          <h2 className="text-lg">
            Pending Requests
          </h2>

          <p className="text-4xl font-bold mt-3">
            {stats.pending}
          </p>

        </div>





        <div className="bg-purple-600 text-white p-6 rounded-2xl shadow">

          <h2 className="text-lg">
            Total Sessions
          </h2>

          <p className="text-4xl font-bold mt-3">
            {stats.sessions}
          </p>

        </div>



      </div>





      <div className="mt-10 bg-white rounded-2xl shadow p-8">


        <h2 className="text-2xl font-bold mb-4">
          Platform Overview
        </h2>


        <p className="text-gray-600">

          GuideUp is a peer-to-peer student guidance platform
          where students connect with mentors, book sessions
          and share learning resources.

        </p>


      </div>



    </div>

  );

}


export default AdminDashboard;