const User = require("../models/User");

/*
========================
Get All Users
========================
*/
const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

/*
========================
Update Profile
========================
*/
const updateProfile = async (req, res) => {
  try {

    const { id } = req.params;

    const updatedUser =
      await User.findByIdAndUpdate(
        id,
        req.body,
        {
          new: true,
        }
      );

    res.status(200).json(
      updatedUser
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

/*
========================
Apply as Mentor
========================
*/
const applyMentor = async (req, res) => {
  try {

    const user =
      await User.findByIdAndUpdate(
        req.params.id,
        {
          isApproved: false,
        },
        {
          new: true,
        }
      );

    res.status(200).json(
      user
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

/*
========================
Approve Mentor
========================
*/
const approveMentor = async (req, res) => {
  try {

    const updatedUser =
      await User.findByIdAndUpdate(
        req.params.id,
        {
          isApproved: true,
        },
        {
          new: true,
        }
      );

    res.status(200).json(
      updatedUser
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  getUsers,
  updateProfile,
  applyMentor,
  approveMentor,
};