const express =
  require("express");

const router =
  express.Router();

const {
  createSession,
  getSessions,
  updateSessionStatus,
} = require(
  "../controllers/sessionController"
);

/*
========================
Create Session
========================
*/
router.post(
  "/",
  createSession
);

/*
========================
Get Sessions
========================
*/
router.get(
  "/",
  getSessions
);

/*
========================
Update Session Status
========================
*/
router.put(
  "/:id",
  updateSessionStatus
);

module.exports =
  router;