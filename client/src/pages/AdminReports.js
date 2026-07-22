import React, {useEffect, useState} from "react";
import axios from "axios";


const AdminReports = () => {


const [reports,setReports] = useState({});


useEffect(()=>{

    fetchReports();

},[]);



const fetchReports = async()=>{

    try{

        const res = await axios.get(
            "http://localhost:5000/api/admin/reports"
        );


        setReports(res.data);


    }catch(error){

        console.log(error);

    }

};



return(

<div className="container mt-4">


<h2>
Admin Reports
</h2>



<div className="row mt-4">


<div className="col-md-4">

<div className="card p-3 shadow">

<h5>Total Users</h5>

<h2>
{reports.totalUsers}
</h2>

</div>

</div>




<div className="col-md-4">

<div className="card p-3 shadow">

<h5>Total Mentors</h5>

<h2>
{reports.totalMentors}
</h2>

</div>

</div>




<div className="col-md-4">

<div className="card p-3 shadow">

<h5>Total Students</h5>

<h2>
{reports.totalStudents}
</h2>

</div>

</div>




<div className="col-md-4 mt-3">

<div className="card p-3 shadow">

<h5>Total Notes</h5>

<h2>
{reports.totalNotes}
</h2>

</div>

</div>



<div className="col-md-4 mt-3">

<div className="card p-3 shadow">

<h5>Total Sessions</h5>

<h2>
{reports.totalSessions}
</h2>

</div>

</div>



</div>


</div>


)

}


export default AdminReports;