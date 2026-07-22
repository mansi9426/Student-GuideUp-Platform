const Note =
  require("../models/Note");

/*
====================
Upload Note
====================
*/
exports.uploadNote =
  async (req, res) => {

    try {

      const note =
        await Note.create({

          mentorId:
            req.body.mentorId,

          title:
            req.body.title,

          category:
            req.body.category,

          fileUrl:
            `/uploads/${req.file.filename}`,

        });

      res.status(201).json(
        note
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Upload Failed",
      });

    }
  };

/*
====================
Get All Notes
====================
*/
exports.getNotes =
  async (req, res) => {

    try {

      const notes =
        await Note.find()
          .populate(
            "mentorId",
            "name email"
          );

      res.json(notes);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Failed to fetch notes",
      });

    }
  };

  /*
====================
Delete Note
====================
*/
exports.deleteNote =
  async (req, res) => {

    try {

      const note =
        await Note.findByIdAndDelete(
          req.params.id
        );


      if (!note) {

        return res.status(404).json({
          message: "Note not found"
        });

      }


      res.json({
        message: "Note deleted successfully"
      });


    } catch(error) {

      console.log(error);

      res.status(500).json({
        message: "Delete Failed"
      });

    }

  };