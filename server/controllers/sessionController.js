const Session =
  require("../models/Session");

/*
========================
Create Session
========================
*/
const createSession =
  async (req, res) => {
    try {

      const session =
        await Session.create(
          req.body
        );

      res.status(201).json({
        message:
          "Session Booked",
        session,
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
  };

/*
========================
Get All Sessions
========================
*/
const getSessions =
  async (req, res) => {
    try {

      const sessions =
        await Session.find()
          .populate(
            "mentorId"
          )
          .populate(
            "menteeId"
          );

      res.status(200).json(
        sessions
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
  };

/*
========================
Update Session Status
========================
*/
const updateSessionStatus =
  async (req, res) => {
    try {

      const { id } =
        req.params;

      const { status } =
        req.body;

      const updatedSession =
        await Session.findByIdAndUpdate(
          id,
          { status },
          { new: true }
        )
          .populate(
            "mentorId"
          )
          .populate(
            "menteeId"
          );

      res.status(200).json(
        updatedSession
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
  };

module.exports = {
  createSession,
  getSessions,
  updateSessionStatus,
};