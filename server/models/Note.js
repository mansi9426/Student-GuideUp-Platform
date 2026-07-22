const mongoose =
  require("mongoose");

const noteSchema =
  new mongoose.Schema(
    {
      mentorId: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,
      },

      title: {
        type: String,

        required: true,
      },

      category: {
        type: String,

        required: true,
      },

      fileUrl: {
        type: String,

        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Note",
    noteSchema
  );