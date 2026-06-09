const express = require("express");

const router = express.Router();

const {
  getUsers,
  updateProfile,
  applyMentor,
  approveMentor,
} = require("../controllers/userController");

router.get("/", getUsers);

router.put("/:id", updateProfile);

router.put(
  "/apply-mentor/:id",
  applyMentor
);

router.put(
  "/approve-mentor/:id",
  approveMentor
);

module.exports = router;