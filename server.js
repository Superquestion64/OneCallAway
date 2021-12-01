const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./backend/config/db");
const userRoutes = require("./backend/routes/userRoutes");
//const socketio = require("socket.io");
const cors = require("cors");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io1 = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
//const io2 = socketio(server);
const {
  addUser,
  removeUser,
  getUser,
  getUserInParty,
} = require("./backend/users");
// const router = require("./router");
// app.use(router);
const PORT = process.env.PORT || 5000;

//------------------------Database server--------------------------

dotenv.config();
app.use(express.json());
app.use(cors());
connectDB();
app.use("/", userRoutes);

//---------------------Audio and video server----------------------

io1.on("connection", (socket) => {
  console.log(`Connected: ${socket.id}`);
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
    console.log(`Disconnected: ${socket.id}`);
  });

  socket.on("callUser", (data) => {
    io1.to(data.userToCall).emit("callUser", {
      signal: data.signalData,
      from: data.from,
      name: data.name,
    });
  });

  socket.on("answerCall", (data) => {
    io1.to(data.to).emit("callAccepted", data.signal);
  });
});

//-------------------------Chat app server-------------------------

// io2.on("connection", (socket) => {
//   console.log("New connection ! YAY");

//   socket.on("join", ({ name, party }, callback) => {
//     // console.log(name, party); // display the name and the party of the user
//     const { error, user } = addUser({ id: socket.id, name, party });

//     if (error) return callback(error);

//     socket.emit("message", {
//       user: "#root",
//       text: `Welcome ${user.name}, be nice.`,
//     });
//     socket.broadcast.to(user.party).emit("message", {
//       user: "#root",
//       text: `${user.name}, has joined the party.`,
//     });

//     io2.to(user.party).emit("partyData", {
//       party: user.party,
//       users: getUserInParty(user.party),
//     });

//     socket.join(user.party);

//     callback();
//   });

//   socket.on("sendMessage", (message, callback) => {
//     const user = getUser(socket.id);

//     io2.to(user.party).emit("message", { user: user.name, text: message });
//     callback();
//   });

//   socket.on("disconnect", () => {
//     const user = removeUser(socket.id);

//     if (user) {
//       io2.to(user.party).emit("message", {
//         user: "#root",
//         text: `${user.name} left the party.`,
//       });
//       io2.to(user.room).emit("partyData", {
//         party: user.party,
//         users: getUserInParty(user.party),
//       });
//     }
//   });
// });

server.listen(PORT, console.log(`Server started on PORT ${PORT}`));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
}