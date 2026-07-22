const express = require("express");

const router = express.Router();

const {
  getUsers,
  updateProfile,
  applyMentor,
  approveMentor,
  deleteUser,
  getMentors,
} = require("../controllers/userController");

router.get("/", getUsers);

router.get("/mentors", getMentors);

router.put("/:id", updateProfile);

router.put(
  "/apply-mentor/:id",
  applyMentor
);

router.put(
  "/approve-mentor/:id",
  approveMentor
);

router.delete(
  "/:id",
  deleteUser
);

module.exports = router;