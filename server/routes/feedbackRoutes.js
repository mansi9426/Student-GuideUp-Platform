const express =
  require("express");

const router =
  express.Router();

const {
  createFeedback,
  getMentorFeedback,
} = require(
  "../controllers/feedbackController"
);

/*
====================
Submit Feedback
====================
*/
router.post(
  "/",
  createFeedback
);

/*
====================
Get Mentor Feedback
====================
*/
router.get(
  "/:mentorId",
  getMentorFeedback
);

module.exports =
  router;