import { useEffect, useState } from "react";
import axios from "axios";


function AdminNotes() {


  const [notes, setNotes] = useState([]);

  const [search, setSearch] = useState("");



  useEffect(() => {

    fetchNotes();

  }, []);




  const fetchNotes = async()=>{

    try{

      const res = await axios.get(
        "http://localhost:5000/api/notes"
      );


      setNotes(res.data);


    }catch(error){

      console.log(error);

    }

  };





  const deleteNote = async(id)=>{


    try{


      await axios.delete(
        `http://localhost:5000/api/notes/${id}`
      );


      alert("Note Deleted");


      fetchNotes();



    }catch(error){


      alert("Delete Failed");


    }


  };





return (

<div className="p-10 bg-gray-100 min-h-screen">



<h1 className="text-4xl font-bold mb-2">
Notes Management
</h1>


<p className="text-gray-500 mb-8">
Manage student uploaded notes
</p>





<input

type="text"

placeholder="Search notes..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

className="border p-3 rounded-lg w-80 mb-8"

/>







<div className="grid md:grid-cols-3 gap-6">



{

notes

.filter(note =>

note.title
?.toLowerCase()
.includes(search.toLowerCase())

)


.map(note=>(


<div

key={note._id}

className="bg-white rounded-2xl shadow p-6"

>



<h2 className="text-xl font-bold mb-3">

{note.title}

</h2>




<p className="text-gray-600">

{note.description}

</p>




<p className="mt-3">

<b>Subject:</b> {note.subject}

</p>



<p>
  <b>Uploaded By:</b> {note.mentorId?.name || "Mentor"}
</p>






<div className="flex gap-3 mt-5">



<a

href={`http://localhost:5000${note.fileUrl}`}

target="_blank"

rel="noreferrer"

className="flex-1 bg-blue-600 text-white text-center py-2 rounded-lg"

>

View

</a>






<button

onClick={()=>deleteNote(note._id)}

className="flex-1 bg-red-600 text-white py-2 rounded-lg"

>

Delete

</button>




</div>




</div>



))


}





</div>





</div>

);


}


export default AdminNotes;