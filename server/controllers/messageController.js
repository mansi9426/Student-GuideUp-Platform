const Message =
  require("../models/Message");

/*
========================
Send Message
========================
*/
const sendMessage =
  async (req, res) => {

    try {

      const message =
        await Message.create(
          req.body
        );

      res.status(201).json({
        message:
          "Message Sent",

        data: message,
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
Get Messages
========================
*/
const getMessages =
  async (req, res) => {

    try {

      const {
        senderId,
        receiverId,
      } = req.params;

      const messages =
        await Message.find({
          $or: [
            {
              senderId,
              receiverId,
            },
            {
              senderId:
                receiverId,

              receiverId:
                senderId,
            },
          ],
        })
          .populate(
            "senderId"
          )
          .populate(
            "receiverId"
          );

      res.status(200).json(
        messages
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
  };

module.exports = {
  sendMessage,
  getMessages,
};