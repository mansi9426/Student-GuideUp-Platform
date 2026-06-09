const express =
  require("express");

const router =
  express.Router();

const {
  createRequest,
  getRequests,
  updateRequestStatus,
  getAcceptedRequests,
} = require(
  "../controllers/requestController"
);

/*
========================
Get Accepted Connections
========================
IMPORTANT:
This route should be ABOVE /:id
*/
router.get(
  "/accepted",
  getAcceptedRequests
);

/*
========================
Create Request
========================
*/
router.post(
  "/",
  createRequest
);

/*
========================
Get All Requests
========================
*/
router.get(
  "/",
  getRequests
);

/*
========================
Update Request Status
========================
*/
router.put(
  "/:id",
  updateRequestStatus
);

module.exports = router;