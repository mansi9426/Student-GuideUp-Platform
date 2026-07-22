import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminSettings = () => {

  const [admin, setAdmin] = useState({
    name: "",
    email: "",
    phone: "",
  });


  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });



  useEffect(() => {
    getAdminProfile();
  }, []);



  // Get Admin Profile

  const getAdminProfile = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/admin/profile"
      );

      setAdmin(res.data);

    } catch (error) {

      console.log(error);

    }

  };





  // Profile Input Change

  const handleProfile = (e) => {

    setAdmin({
      ...admin,
      [e.target.name]: e.target.value
    });

  };





  // Password Input Change

  const handlePassword = (e) => {

    setPassword({
      ...password,
      [e.target.name]: e.target.value
    });

  };





  // Update Profile

  const updateProfile = async (e) => {

    e.preventDefault();


    try {

      const res = await axios.put(
        "http://localhost:5000/api/admin/update-profile",
        admin
      );


      alert(res.data.message || "Profile Updated Successfully");


    } catch(error){

      console.log(error);

      alert("Profile Update Failed");

    }

  };






  // Update Password

  const updatePassword = async (e) => {

    e.preventDefault();


    console.log(password);


    if(password.newPassword !== password.confirmPassword){

      alert("New Password and Confirm Password not match");

      return;

    }



    try {


      const res = await axios.put(

        "http://localhost:5000/api/admin/change-password",

        {
          oldPassword: password.oldPassword,
          newPassword: password.newPassword
        }

      );



      alert(res.data.message || "Password Updated Successfully");



      setPassword({

        oldPassword:"",
        newPassword:"",
        confirmPassword:""

      });



    } catch(error){


      console.log(error);


      alert(
        error.response?.data?.message || 
        "Password Update Failed"
      );


    }


  };





return (

<div className="container-fluid mt-4">


<div className="row">



{/* Profile Card */}


<div className="col-md-4">


<div className="card shadow text-center p-4">


<img

src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"

alt="admin"

className="rounded-circle mx-auto"

width="120"

/>



<h4 className="mt-3">

{admin.name || "Admin"}

</h4>


<p className="text-muted">

Administrator

</p>


<hr/>


<p>
📧 {admin.email}
</p>


<p>
📞 {admin.phone || "Not Added"}
</p>



</div>


</div>





{/* Settings */}


<div className="col-md-8">





{/* Account Settings */}


<div className="card shadow">


<div className="card-header bg-primary text-white">

<h5>
Account Settings
</h5>

</div>



<div className="card-body">



<form onSubmit={updateProfile}>


<label>
Full Name
</label>


<input

className="form-control mb-3"

name="name"

value={admin.name}

onChange={handleProfile}

/>





<label>
Email
</label>


<input

className="form-control mb-3"

name="email"

value={admin.email}

onChange={handleProfile}

/>





<label>
Phone
</label>


<input

className="form-control mb-3"

name="phone"

value={admin.phone}

onChange={handleProfile}

/>




<button

type="submit"

className="btn btn-success"

>

Save Changes

</button>



</form>


</div>


</div>








{/* Password Settings */}



<div className="card shadow mt-4">


<div className="card-header bg-dark text-white">

<h5>
Security Settings
</h5>

</div>




<div className="card-body">


<form onSubmit={updatePassword}>


<label>
Old Password
</label>


<input

type="password"

className="form-control mb-3"

name="oldPassword"

value={password.oldPassword}

onChange={handlePassword}

/>




<label>
New Password
</label>


<input

type="password"

className="form-control mb-3"

name="newPassword"

value={password.newPassword}

onChange={handlePassword}

/>




<label>
Confirm Password
</label>


<input

type="password"

className="form-control mb-3"

name="confirmPassword"

value={password.confirmPassword}

onChange={handlePassword}

/>





<button

type="submit"

className="btn btn-warning"

>

Update Password

</button>



</form>


</div>


</div>




</div>


</div>


</div>


);


};


export default AdminSettings;