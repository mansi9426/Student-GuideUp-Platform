import { useEffect, useState } from "react";
import axios from "axios";


function AdminMentors() {


  const [mentors, setMentors] = useState([]);

  const [search, setSearch] = useState("");



  useEffect(() => {

    fetchMentors();

  }, []);




  const fetchMentors = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/users"
      );


      const mentorUsers = res.data.filter(
        user => user.role === "mentor"
      );


      setMentors(mentorUsers);


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


      fetchMentors();


    }catch(error){

      alert("Approval Failed");

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


      fetchMentors();



    }catch(error){

      alert("Reject Failed");

    }


  };







return (


<div className="p-10 bg-gray-100 min-h-screen">



<h1 className="text-4xl font-bold mb-2">
Mentor Management
</h1>


<p className="text-gray-500 mb-8">
Approve or reject mentor requests
</p>





<input

type="text"

placeholder="Search mentor..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

className="border p-3 rounded-lg w-80 mb-8"

/>







<div className="grid md:grid-cols-3 gap-6">



{

mentors

.filter(user =>

user.name
.toLowerCase()
.includes(search.toLowerCase())

)


.map(user => (



<div

key={user._id}

className="bg-white rounded-2xl shadow p-6"

>



<h2 className="text-2xl font-bold">

{user.name}

</h2>



<p className="text-gray-500">

{user.email}

</p>




<div className="mt-4 space-y-2">


<p>
<b>College:</b> {user.college}
</p>


<p>
<b>Department:</b> {user.department}
</p>


<p>
<b>Semester:</b> {user.semester}
</p>



<p>

<b>Status:</b>


{

user.isApproved ? 

<span className="text-green-600 ml-2">
Approved
</span>

:

<span className="text-yellow-600 ml-2">
Pending
</span>

}


</p>



</div>







<div className="flex gap-3 mt-6">



<button

onClick={()=>approveMentor(user._id)}

className="flex-1 bg-green-600 text-white py-2 rounded-lg"

>

Approve

</button>






<button

onClick={()=>rejectMentor(user._id)}

className="flex-1 bg-red-600 text-white py-2 rounded-lg"

>

Reject

</button>



</div>





</div>



))


}





</div>






</div>


);


}


export default AdminMentors;