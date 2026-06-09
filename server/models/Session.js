const mongoose =
  require("mongoose");

const sessionSchema =
  new mongoose.Schema(
    {
      mentorId: {
        type:
          mongoose.Schema.Types
            .ObjectId,

        ref: "User",

        required: true,
      },

      menteeId: {
        type:
          mongoose.Schema.Types
            .ObjectId,

        ref: "User",

        required: true,
      },

      date: {
        type: String,
        required: true,
      },

      time: {
        type: String,
        required: true,
      },

      status: {
        type: String,

        enum: [
          "pending",
          "accepted",
          "rejected",
        ],

        default: "pending",
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Session",
    sessionSchema
  );