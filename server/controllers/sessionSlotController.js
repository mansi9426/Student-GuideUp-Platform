const SessionSlot =
  require("../models/SessionSlot");

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

      let totalStudents = 0;

      slots.forEach((slot) => {
        totalStudents +=
          slot.bookedStudents.length;
      });

      res.json({
        totalSlots,
        totalStudents,
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
