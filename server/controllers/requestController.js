const Request = require("../models/Request");

const createRequest = async (
  req,
  res
) => {
  try {
    const request =
      await Request.create(
        req.body
      );

    res.status(201).json({
      message: "Request Sent",
      request,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getRequests = async (
  req,
  res
) => {
  try {
    const requests =
      await Request.find()
        .populate("mentorId")
        .populate("menteeId");

    res.status(200).json(
      requests
    );
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateRequestStatus =
  async (req, res) => {
    try {
      const { id } =
        req.params;

      const { status } =
        req.body;

      const updatedRequest =
        await Request.findByIdAndUpdate(
          id,
          { status },
          { new: true }
        )
          .populate("mentorId")
          .populate("menteeId");

      res.status(200).json(
        updatedRequest
      );
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

const getAcceptedRequests =
  async (req, res) => {
    try {
      const requests =
        await Request.find({
          status: "accepted",
        })
          .populate("mentorId")
          .populate("menteeId");

      res.status(200).json(
        requests
      );
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

module.exports = {
  createRequest,
  getRequests,
  updateRequestStatus,
  getAcceptedRequests,
};