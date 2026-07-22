const mongoose = require("mongoose");

const feedbackSchema =
  new mongoose.Schema(
    {
      mentorId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      studentId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },

      comment: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
  );
   feedbackSchema.index(
  {
    mentorId: 1,
    studentId: 1,
  },
  {
    unique: true,
  }
);
module.exports =
  mongoose.model(
    "Feedback",
    feedbackSchema
  );