const SessionSlot =
  require("../models/SessionSlot");
const Feedback =
  require("../models/Feedback");
const User =
  require("../models/User");

/*
====================
Create Session Slot
====================
*/
exports.createSlot =
  async (req, res) => {
    try {

      console.log(
  "REQ BODY =",
  req.body
);

const slot =
  await SessionSlot.create(
    req.body
  );

console.log(
  "SAVED SLOT =",
  slot
);

      res.status(201).json(
        slot
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Failed to create slot",
      });

    }
  };

/*
====================
Get All Slots
====================
*/
exports.getSlots =
  async (req, res) => {
    try {
      
      const slots =
        await SessionSlot.find()
          .populate(
            "mentorId",
            "name email"
          );

      res.json(slots);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Failed to fetch slots",
      });

    }
  };

  /*
====================
Book Session
====================
*/
exports.bookSession =
  async (req, res) => {

    try {

      const {
        studentId
      } = req.body;

      const slot =
        await SessionSlot.findById(
          req.params.id
        );

      if (!slot) {

        return res
          .status(404)
          .json({
            message:
              "Slot not found",
          });

      }

      if (
        slot.bookedStudents.length >=
        slot.capacity
      ) {

        return res
          .status(400)
          .json({
            message:
              "Session Full",
          });

      }

      const alreadyBooked =
        slot.bookedStudents.find(
          (booking) =>
            booking.studentId?.toString() ===
            studentId
        );

      if (alreadyBooked) {

        return res
          .status(400)
          .json({
            message:
              "Already Booked",
          });

      }

      slot.bookedStudents.push({
        studentId,
        status: "pending",
      });

      await slot.save();

      res.json({
        message:
          "Booking Request Sent",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Booking Failed",
      });

    }
  };
  /*
====================
Get Mentor Slots
====================
*/
exports.getMentorSlots =
  async (req, res) => {

    console.log(
  "MENTOR ID =",
  req.params.mentorId
);

    try {

      const slots =
        await SessionSlot.find({
          mentorId:
            req.params.mentorId,
        })
        .populate(
  "bookedStudents.studentId",
  "name email"
);

      res.json(slots);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Failed to fetch mentor slots",
      });

    }
  };

  /*
====================
Mentor Stats
====================
*/
exports.getMentorStats =
  async (req, res) => {

    try {

      const mentorId =
        req.params.mentorId;

      const slots =
        await SessionSlot.find({
          mentorId,
        });

      const totalSlots =
        slots.length;

      const feedbacks =
  await Feedback.find({
    mentorId,
  });

const averageRating =
  feedbacks.length > 0
    ? (
        feedbacks.reduce(
          (sum, feedback) =>
            sum +
            feedback.rating,
          0
        ) /
        feedbacks.length
      ).toFixed(1)
    : 0;

    
     let totalStudents = 0;

slots.forEach((slot) => {

  slot.bookedStudents.forEach((booking) => {

    if (
      booking.status === "accepted"
    ) {
      totalStudents++;
    }

  });

});

let pendingRequests = 0;
let acceptedSessions = 0;

      slots.forEach((slot) => {


        slot.bookedStudents.forEach(
          (booking) => {

            if (
              booking.status ===
              "pending"
            ) {
              pendingRequests++;
            }

            if (
              booking.status ===
              "accepted"
            ) {
              acceptedSessions++;
            }

          }
        );

      });

      res.json({
        totalSlots,
        totalStudents,
        pendingRequests,
        acceptedSessions,
        averageRating,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Failed to fetch stats",
      });

    }
  };
  /*
====================
Update Booking Status
====================
*/
exports.updateBookingStatus =
  async (req, res) => {

    try {

      const {
        status
      } = req.body;

      const slot =
        await SessionSlot.findById(
          req.params.slotId
        );

      if (!slot) {

        return res
          .status(404)
          .json({
            message:
              "Slot not found",
          });

      }

      const booking =
        slot.bookedStudents.find(
          (b) =>
            b._id.toString() ===
            req.params.bookingId
        );

      if (!booking) {

        return res
          .status(404)
          .json({
            message:
              "Booking not found",
          });

      }

      booking.status =
        status;

      await slot.save();

      res.json({
        message:
          `Booking ${status}`,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Failed to update booking",
      });

    }
  };

  exports.getStudentBookings =
  async (req, res) => {

    try {

      const studentId =
        req.params.studentId;

      const slots =
        await SessionSlot.find({
          "bookedStudents.studentId":
            studentId,
        })
        .populate(
          "mentorId",
          "name email"
        );

      const bookings = [];

      slots.forEach((slot) => {

        const booking =
          slot.bookedStudents.find(
            (b) =>
              b.studentId?.toString() ===
              studentId
          );

        if (booking) {

          bookings.push({
            _id: slot._id,
            title: slot.title,
            date: slot.date,
            time: slot.time,
            sessionType:
              slot.sessionType,
            mentorId:
              slot.mentorId,
            status:
              booking.status,
            meetingPlatform:
  slot.meetingPlatform,

meetingLink:
  slot.meetingLink,
          });

        }

      });

      res.json(bookings);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Failed to fetch bookings",
      });

    }
  };

  /*
====================
Complete Session
====================
*/
exports.completeSession =
  async (req, res) => {

    try {

      const slot =
        await SessionSlot.findById(
          req.params.slotId
        );

      if (!slot) {

        return res
          .status(404)
          .json({
            message:
              "Slot not found",
          });

      }

      const booking =
        slot.bookedStudents.find(
          (b) =>
            b._id.toString() ===
            req.params.bookingId
        );

      if (!booking) {

        return res
          .status(404)
          .json({
            message:
              "Booking not found",
          });

      }

      booking.status =
        "completed";

      await slot.save();

      res.json({
        message:
          "Session completed",
      });

    } catch (error) {

  console.log(
    "BOOKING ERROR:",
    error
  );

  res.status(500).json({
    message:
      error.message,
  });

}
  };

/*
====================
Cancel Session
====================
*/
exports.cancelSession =
  async (req, res) => {

    try {

      const slot =
        await SessionSlot.findById(
          req.params.slotId
        );

      if (!slot) {

        return res
          .status(404)
          .json({
            message:
              "Slot not found",
          });

      }

      const booking =
        slot.bookedStudents.find(
          (b) =>
            b._id.toString() ===
            req.params.bookingId
        );

      if (!booking) {

        return res
          .status(404)
          .json({
            message:
              "Booking not found",
          });

      }

      booking.status =
        "cancelled";

      await slot.save();

      res.json({
        message:
          "Session cancelled",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Failed to cancel session",
      });

    }
  };

  
  exports.cancelSession =
  async (req, res) => {

    try {

      const slot =
        await SessionSlot.findById(
          req.params.slotId
        );

      if (!slot) {

        return res
          .status(404)
          .json({
            message:
              "Slot not found",
          });

      }

      const booking =
        slot.bookedStudents.find(
          (b) =>
            b._id.toString() ===
            req.params.bookingId
        );

      if (!booking) {

        return res
          .status(404)
          .json({
            message:
              "Booking not found",
          });

      }

      booking.status =
        "cancelled";

      await slot.save();

      res.json({
        message:
          "Session cancelled",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Failed to cancel session",
      });

    }
  };
  