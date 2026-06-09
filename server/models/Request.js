const mongoose = require("mongoose");

const requestSchema =
  new mongoose.Schema(
    {
      mentorId: {
        type:
          mongoose.Schema.Types
            .ObjectId,
        ref: "User",
      },

      menteeId: {
        type:
          mongoose.Schema.Types
            .ObjectId,
        ref: "User",
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
    "Request",
    requestSchema
  );