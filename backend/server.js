const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");

const http = require("http");
const app2 = express();
const server = http.createServer(app2);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Database server
dotenv.config();
//Set port to 5000
const PORT = process.env.PORT;
const app1 = express();
app1.use(express.json());
//Allows request through cross-origin
app1.use(cors());
//Connect to database
connectDB();
// Handling user routes
app1.use("/", userRoutes);

app1.listen(PORT, console.log(`Server started on PORT ${PORT}`));

// Audio and video server
io.on("connection", (socket) => {
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });

  socket.on("callUser", (data) => {
    io.to(data.userToCall).emit("callUser", {
      signal: data.signalData,
      from: data.from,
      name: data.name,
    });
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });
});

server.listen(7000, () => console.log("server is running on port 7000"));
