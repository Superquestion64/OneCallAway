const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./backend/config/db");
const userRoutes = require("./backend/routes/userRoutes");
const cors = require("cors");
const socketio = require("socket.io");

const http = require("http");
const app2 = express();
const server1 = http.createServer(app2);
const PORT2 = 0; //process.env.PORT || 7000;
const io1 = require("socket.io")(server1, {
  cors: {
    origin: "0.0.0.0",
    methods: ["GET", "POST"],
  },
});

const {
  addUser,
  removeUser,
  getUser,
  getUserInParty,
} = require("./backend/users");
const router = require("./backend/router");
const app3 = express();
const server2 = http.createServer(app3);
const io2 = socketio(server2);
const PORT3 = 0; //process.env.PORT || 9000;
app3.use(router);
app3.use(cors());

//---------------------------------------------------------------------------------------------------
// Database server

dotenv.config();
//Set port to 5000
const PORT1 = 0; //process.env.PORT || 5000;
const app1 = express();
app1.use(express.json());
//Allows request through cross-origin
app1.use(cors());
//Connect to database
connectDB();
// Handling user routes
app1.use("/", userRoutes);

app1.listen(PORT1, console.log(`Server started on PORT ${PORT1}`));

//---------------------------------------------------------------------------------------------------
// Audio and video server
io1.on("connection", (socket) => {
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
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

server1.listen(PORT2, () => console.log(`Server started on PORT ${PORT2}`));

//---------------------------------------------------------------------------------------------------
// Chat app server

io2.on("connection", (socket) => {
  console.log("New connection ! YAY");

  socket.on("join", ({ name, party }, callback) => {
    // console.log(name, party); // display the name and the party of the user
    const { error, user } = addUser({ id: socket.id, name, party });

    if (error) return callback(error);

    socket.emit("message", {
      user: "#root",
      text: `Welcome ${user.name}, be nice.`,
    });
    socket.broadcast.to(user.party).emit("message", {
      user: "#root",
      text: `${user.name}, has joined the party.`,
    });

    io2.to(user.party).emit("partyData", {
      party: user.party,
      users: getUserInParty(user.party),
    });

    socket.join(user.party);

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io2.to(user.party).emit("message", { user: user.name, text: message });
    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io2.to(user.party).emit("message", {
        user: "#root",
        text: `${user.name} left the party.`,
      });
      io2.to(user.room).emit("partyData", {
        party: user.party,
        users: getUserInParty(user.party),
      });
    }
  });
});

server2.listen(PORT3, () => console.log(`Server started on port ${PORT3}`));

//---------------------------------------------------------------------------------------------------

if (process.env.NODE_ENV === "production") {
  app1.use(express.static("frontend/build"));
}
