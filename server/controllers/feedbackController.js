const Feedback =
  require("../models/Feedback");

/*
====================
Create Feedback
====================
*/
exports.createFeedback =
  async (req, res) => {

    try {

      const {
        mentorId,
        studentId,
        rating,
        comment,
      } = req.body;

      const existingFeedback =
  await Feedback.findOne({
    mentorId,
    studentId,
  });

if (existingFeedback) {

  return res
    .status(400)
    .json({
      message:
        "Feedback already submitted",
    });

}

      const feedback =
        await Feedback.create({
          mentorId,
          studentId,
          rating,
          comment,
        });

      res.status(201).json(
        feedback
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Failed to submit feedback",
      });

    }
  };

/*
====================
Get Mentor Feedback
====================
*/
exports.getMentorFeedback =
  async (req, res) => {

    try {

      const feedbacks =
        await Feedback.find({
          mentorId:
            req.params.mentorId,
        })
        .populate(
          "studentId",
          "name"
        );

      res.json(
        feedbacks
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Failed to fetch feedback",
      });

    }
  };