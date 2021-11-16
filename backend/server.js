const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");

dotenv.config();

//Set port to 5000
const PORT = process.env.PORT; 

const app = express();
app.use(express.json())
//Allows request through cross-origin
app.use(cors())

//Connect to database
connectDB();


// Handling user routes
app.use("/", userRoutes);


app.listen(PORT, console.log(`Server started on PORT ${PORT}`));

