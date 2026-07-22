const http = require("http");
const { Server } = require("socket.io");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const requestRoutes = require("./routes/requestRoutes");
const sessionRoutes =
  require(
    "./routes/sessionRoutes"
  );
const messageRoutes =
  require(
    "./routes/messageRoutes"
  );
  const noteRoutes =
  require(
    "./routes/noteRoutes"
  );
const sessionSlotRoutes =
  require(
    "./routes/sessionSlotRoutes"
  );
const feedbackRoutes =
  require(
    "./routes/feedbackRoutes"
  );
const adminRoutes = require("./routes/adminRoutes");


const app = express();

app.use(cors());
app.use(express.json());
app.use(
  "/uploads",
  express.static(
    path.join(
      __dirname,
      "uploads"
    )
  )
);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/requests", requestRoutes);

app.use(
  "/api/session-slots",
  sessionSlotRoutes
);
app.use(
  "/api/sessions",
  sessionRoutes
);

app.use(
  "/api/messages",
  messageRoutes
);

app.use(
  "/api/notes",
  noteRoutes
);

app.use(
  "/api/feedback",
  feedbackRoutes
);

app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Server Running");
});

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User Connected");

  socket.on("send_message", (data) => {
    io.emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server Started on Port ${PORT}`);
});