//Check to make sure token is provided and is valid
const jwt = require('jsonwebtoken');
const User = require("../models/user");
const asyncHandler = require("express-async-handler");

const LoggedInRequired = asyncHandler(async(req,res,next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ){
        try {
            token = req.headers.authorization.split(" ")[1];

            //decode token id
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            //Check to make sure that the user status is online, else require user to log back in
            if(req.user.user_status == "Online") {
                next()
            }
            else {
                res.status(401).send("User has been logged out, please log back in");
            }
        }
        catch (err) {
            //Check to see if error is bc token expired, if it is set the user status to offline
            if (err.message === "jwt expired"){
                user = await User.findById((jwt.verify(token, process.env.JWT_SECRET, {ignoreExpiration: true})).id)
                user.user_status = "Offline";
                user.save();
                res.status(401).send("Session Expired");
            }
            else {
                res.status(401).send("Invalid Token");
            }
        }
    }
    if (!token) {
        res.status(401).send("Not authorized, token failed");
    }
});

module.exports = {LoggedInRequired};