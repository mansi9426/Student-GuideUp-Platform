import {
  useEffect,
  useState,
} from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

function Chat() {

  const { id } = useParams();

  const user = JSON.parse(
    localStorage.getItem(
      "user"
    )
  );

  const [messages, setMessages] =
    useState([]);

  const [text, setText] =
    useState("");

  useEffect(() => {

    fetchMessages();

    const interval =
      setInterval(() => {

        fetchMessages();

      }, 2000);

    return () =>
      clearInterval(
        interval
      );

  }, []);

  /*
  ========================
  Fetch Messages
  ========================
  */
  const fetchMessages =
    async () => {

      try {

        const res =
  await axios.get(
    `http://localhost:5000/api/messages/${user._id}/${id}`
  );

        setMessages(
          res.data
        );

      } catch (error) {

        console.log(error);

      }
    };

  /*
  ========================
  Send Message
  ========================
  */
  const sendMessage =
    async () => {

      if (!text) return;

      try {

        await axios.post(
          "http://localhost:5000/api/messages",
          {
            senderId:
              user._id,

            receiverId: id,

            message: text,
          }
        );

        setText("");

        fetchMessages();

      } catch (error) {

        console.log(error);

      }
    };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col p-5">

      {/* Header */}
      <div className="bg-black text-white p-5 rounded-2xl shadow-lg">

        <h1 className="text-3xl font-bold">

          Chat System

        </h1>

      </div>

      {/* Messages */}
      <div className="flex-1 bg-white rounded-2xl shadow-lg p-5 mt-5 overflow-y-auto">

        <div className="space-y-4">

          {messages.map(
            (msg) => (

              <div
                key={msg._id}
                className={`flex

                ${
                  msg.senderId
                    ?._id ===
                  user._id
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <div
                  className={`max-w-xs px-4 py-3 rounded-2xl shadow

                  ${
                    msg.senderId
                      ?._id ===
                    user._id
                      ? "bg-black text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >

                  <p className="text-sm font-semibold mb-1">

                    {
                      msg
                        .senderId
                        ?.name
                    }

                  </p>

                  <p>

                    {
                      msg.message
                    }

                  </p>

                </div>

              </div>
            )
          )}

        </div>

      </div>

      {/* Input */}
      <div className="flex gap-3 mt-5">

        <input
          type="text"
          placeholder="Type message..."
          value={text}
          onChange={(e) =>
            setText(
              e.target.value
            )
          }
          className="flex-1 border border-gray-300 rounded-2xl px-4 py-3 outline-none"
        />

        <button
          onClick={
            sendMessage
          }
          className="bg-black text-white px-6 rounded-2xl hover:bg-gray-800 transition"
        >

          Send

        </button>

      </div>

    </div>
  );
}

export default Chat;