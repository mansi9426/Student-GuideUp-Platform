const mongoose = require("mongoose");

const userSchema =
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    college: {
      type: String,
    },

    department: {
      type: String,
    },

    semester: {
      type: String,
    },

    bio: {
      type: String,
      default: "",
    },

    skills: {
      type: String,
      default: "",
    },

    subjects: {
      type: String,
      default: "",
    },

    role: {
  type: String,
  enum: [
    "student",
    "mentor",
    "admin",
  ],
  default: "student",
},

isApproved: {
  type: Boolean,
  default: false,
},

  });

module.exports = mongoose.model(
  "User",
  userSchema
);