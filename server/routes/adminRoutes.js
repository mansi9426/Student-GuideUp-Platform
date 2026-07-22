const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Note = require("../models/Note");
const Session = require("../models/Session");


// =======================
// Admin Reports API
// =======================

router.get("/reports", async (req, res) => {

    try {

        const totalUsers = await User.countDocuments();

        const totalMentors = await User.countDocuments({
            role: "mentor"
        });

        const totalStudents = await User.countDocuments({
            role: "student"
        });


        const totalNotes = await Note.countDocuments();

        const totalSessions = await Session.countDocuments();


        res.json({
            totalUsers,
            totalMentors,
            totalStudents,
            totalNotes,
            totalSessions
        });


    } catch(error){

        res.status(500).json({
            message:error.message
        });

    }

});





// =======================
// Get Admin Profile
// =======================

router.get("/profile", async(req,res)=>{

    try{

        const admin = await User.findOne({
            role:"admin"
        }).select("-password");


        res.json(admin);


    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

});






// =======================
// Update Admin Profile
// =======================

router.put("/update-profile", async(req,res)=>{

    try{

        const {name,email,phone} = req.body;


        const admin = await User.findOneAndUpdate(
            {
                role:"admin"
            },
            {
                name,
                email,
                phone
            },
            {
                new:true
            }
        );


        res.json({
            message:"Profile Updated Successfully",
            admin
        });



    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

});







// =======================
// Change Admin Password
// =======================

router.put("/change-password", async(req,res)=>{

    try{

        const {
            oldPassword,
            newPassword
        } = req.body;



        const admin = await User.findOne({
            role:"admin"
        });



        if(!admin){

            return res.status(404).json({
                message:"Admin not found"
            });

        }



        if(admin.password !== oldPassword){

            return res.status(400).json({
                message:"Old password incorrect"
            });

        }



        admin.password = newPassword;


        await admin.save();



        res.json({
            message:"Password Updated Successfully"
        });



    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

});




module.exports = router;