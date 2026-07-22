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
  completeSession,
  cancelSession,
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


/*
====================
Complete Session
====================
*/
router.put(
  "/:slotId/booking/:bookingId/complete",
  completeSession
);

/*
====================
Cancel Session
====================
*/
router.put(
  "/:slotId/booking/:bookingId/cancel",
  cancelSession
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