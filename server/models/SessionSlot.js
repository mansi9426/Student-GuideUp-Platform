const mongoose =
  require("mongoose");

const sessionSlotSchema =
  new mongoose.Schema(
    {
      mentorId: {
        type:
          mongoose.Schema.Types
            .ObjectId,

        ref: "User",

        required: true,
      },

      title: {
        type: String,

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

      sessionType: {
        type: String,

        enum: [
          "one-to-one",
          "group",
        ],

        default:
          "one-to-one",
      },

      capacity: {
        type: Number,

        default: 1,
      },

      bookedStudents: [
  {
    studentId: {
      type:
        mongoose.Schema.Types.ObjectId,
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

    bookedAt: {
      type: Date,

      default: Date.now,
    },
  },
],
    },

    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "SessionSlot",
    sessionSlotSchema
  );