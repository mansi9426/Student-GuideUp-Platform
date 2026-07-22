import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Admin() {

  const [users, setUsers] = useState([]);

  const [stats, setStats] = useState({
    students: 0,
    mentors: 0,
    pending: 0,
    sessions: 0,
  });

  const [search, setSearch] = useState("");


  useEffect(() => {
    fetchUsers();
  }, []);


  const fetchUsers = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/users"
      );

      setUsers(res.data);

      const allUsers = res.data;


      setStats({

        students: allUsers.filter(
          user => user.role === "student"
        ).length,


        mentors: allUsers.filter(
          user =>
            user.role === "mentor" &&
            user.isApproved === true
        ).length,


        pending: allUsers.filter(
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



  const approveMentor = async(id)=>{

    try{

      await axios.put(
        `http://localhost:5000/api/users/approve-mentor/${id}`
      );


      alert("Mentor Approved");

      fetchUsers();


    }catch(error){

      alert("Failed");

    }

  };



  const rejectMentor = async(id)=>{

    try{

      await axios.put(
        `http://localhost:5000/api/users/${id}`,
        {
          mentorRequest:"rejected"
        }
      );


      alert("Mentor Rejected");

      fetchUsers();


    }catch(error){

      alert("Failed");

    }

  };



return (

<div className="min-h-screen flex bg-gray-100">


{/* Sidebar */}

<div className="w-64 bg-slate-900 text-white min-h-screen">


<div className="p-6 border-b border-slate-700">

<h1 className="text-3xl font-bold">
GuideUp
</h1>

<p className="text-sm text-gray-400">
Admin Dashboard
</p>

</div>



<nav className="mt-6">


<Link to="/admin/dashboard">

<button className="w-full px-6 py-4 flex gap-3 hover:bg-slate-800">

<i className="bi bi-speedometer2"></i>

Dashboard

</button>

</Link>



<Link to="/admin/users">

<button className="w-full px-6 py-4 flex gap-3 hover:bg-slate-800">

<i className="bi bi-people-fill"></i>

Users

</button>

</Link>




<Link to="/admin/mentors">

<button className="w-full px-6 py-4 flex gap-3 hover:bg-slate-800">

<i className="bi bi-person-video3"></i>

Mentors

</button>

</Link>




<Link to="/admin/sessions">

<button className="w-full px-6 py-4 flex gap-3 hover:bg-slate-800">

<i className="bi bi-calendar-check"></i>

Sessions

</button>

</Link>



<Link to="/admin/notes">

<button className="w-full px-6 py-4 flex gap-3 hover:bg-slate-800">

<i className="bi bi-journal-bookmark"></i>

Notes

</button>

</Link>




<Link to="/admin/reports">

<button className="w-full px-6 py-4 flex gap-3 hover:bg-slate-800">

<i className="bi bi-bar-chart"></i>

Reports

</button>

</Link>




<Link to="/admin/settings">

<button className="w-full px-6 py-4 flex gap-3 hover:bg-slate-800">

<i className="bi bi-gear-fill"></i>

Settings

</button>

</Link>


</nav>


</div>





{/* Main Content */}


<div className="flex-1 p-10">


<h1 className="text-4xl font-bold">
Dashboard
</h1>


<p className="text-gray-500 mb-8">
Welcome Admin 👋
</p>



<input

type="text"

placeholder="Search users..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

className="border p-3 rounded-lg w-80 mb-8"

/>





{/* Cards */}


<div className="grid grid-cols-4 gap-6 mb-10">


<div className="bg-blue-600 text-white p-6 rounded-xl">

<h2>
Students
</h2>

<p className="text-4xl">
{stats.students}
</p>

</div>




<div className="bg-green-600 text-white p-6 rounded-xl">

<h2>
Mentors
</h2>

<p className="text-4xl">
{stats.mentors}
</p>

</div>




<div className="bg-yellow-500 text-white p-6 rounded-xl">

<h2>
Pending
</h2>

<p className="text-4xl">
{stats.pending}
</p>

</div>




<div className="bg-purple-600 text-white p-6 rounded-xl">

<h2>
Sessions
</h2>

<p className="text-4xl">
{stats.sessions}
</p>

</div>


</div>






{/* Mentor Approval */}


<div className="grid md:grid-cols-3 gap-6">


{

users

.filter(user=>

user.role==="mentor" &&

user.isApproved===false &&

(
user.name.toLowerCase().includes(search.toLowerCase()) ||

user.email.toLowerCase().includes(search.toLowerCase())

)

)

.map(user=>(


<div 
key={user._id}
className="bg-white p-6 rounded-xl shadow"
>


<h2 className="text-xl font-bold">
{user.name}
</h2>


<p>
{user.email}
</p>


<p>
<b>College:</b> {user.college}
</p>


<p>
<b>Department:</b> {user.department}
</p>


<p>
<b>Semester:</b> {user.semester}
</p>



<div className="flex gap-3 mt-4">


<button

onClick={()=>approveMentor(user._id)}

className="bg-green-600 text-white px-4 py-2 rounded"

>
Approve
</button>



<button

onClick={()=>rejectMentor(user._id)}

className="bg-red-600 text-white px-4 py-2 rounded"

>
Reject
</button>


</div>



</div>


))


}


</div>



</div>


</div>


);

}


export default Admin;