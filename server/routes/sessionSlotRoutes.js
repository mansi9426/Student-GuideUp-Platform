const express =
  require("express");

const router =
  express.Router();

const {
  createSlot,
  getSlots,
  bookSession,
  getMentorSlots,
  updateBookingStatus,
  getMentorStats,
  getStudentBookings,
} = require(
  "../controllers/sessionSlotController"
);

/*
====================
Create Slot
====================
*/
router.post(
  "/",
  createSlot
);

/*
====================
Get All Slots
====================
*/
router.get(
  "/",
  getSlots
);

/*
====================
Book Session
====================
*/
router.put(
  "/book/:id",
  bookSession
);

/*
====================
Mentor Stats
====================
*/
router.get(
  "/stats/:mentorId",
  getMentorStats
);

/*
====================
Get Mentor Slots
====================
*/
router.get(
  "/mentor/:mentorId",
  getMentorSlots
);

/*
====================
Get Student Bookings
====================
*/
router.get(
  "/student/:studentId",
  getStudentBookings
);

/*
====================
Accept / Reject Booking
====================
*/
router.put(
  "/:slotId/booking/:bookingId",
  updateBookingStatus
);

router.put(
  "/test",
  (req, res) => {
    res.json({
      message: "Route Working"
    });
  }
);


module.exports =
  router;