const User = require("../models/User");
const Session = require("../models/Session");
const Note = require("../models/Note");
const Feedback = require("../models/Feedback");


const getReports = async (req, res) => {
    try {

        const totalUsers = await User.countDocuments();

        const totalMentors = await User.countDocuments({
            role: "mentor"
        });

        const totalStudents = await User.countDocuments({
            role: "student"
        });


        const totalSessions = await Session.countDocuments();

        const totalNotes = await Note.countDocuments();

        const totalFeedback = await Feedback.countDocuments();



        res.status(200).json({
            totalUsers,
            totalMentors,
            totalStudents,
            totalSessions,
            totalNotes,
            totalFeedback
        });


    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


module.exports = {
    getReports
};