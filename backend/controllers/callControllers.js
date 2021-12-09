const asyncHandler = require('express-async-handler');
const Call_Log = require('../models/calls');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const join = false;
const joined = true;
const CreateLog = asyncHandler(async(req,res)=> {
    const call_id = req.body.call_id;
    if (req.headers.authorization &&req.headers.authorization.startsWith("Bearer")) {
        try {
        token = req.headers.authorization.split(" ")[1];
        //decode token id
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        }
        catch (err) {
            res.status(401).send("Invalid Token");
        }
    }
    if(req.user) {
        const userID = req.user._id;
        const user = await User.findById(userID);
        if(call_id) {
            username = user.username;
            const call = await Call_Log.create({
                join,
                call_id,
            });
            call.usernames.push(user.username);
            call.save(function(err){
                if(err){
                    console.log(err);
                    return;
                }
                res.status(200).send("Call Log created sucessfully");
                })
        }
        else {
            res.status(400).send("No Call ID")
        }
    }
    else {
        if(call_id) {
            username = "Anonymous"
            const call = await Call_Log.create({
                join,
                call_id,
            });
            call.usernames.push(username);
            call.save(function(err){
                if(err){
                    console.log(err);
                    return;
                }
                res.status(200).send("Call Log created sucessfully");
                })
        }
        else {
            res.status(400).send("No Call ID")
        }
    }

});

const AddtoLog = asyncHandler(async(req,res)=> {
    const call_id = req.body.call_id;
    const Call = await Call_Log.findOne({call_id:call_id});
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
        token = req.headers.authorization.split(" ")[1];
        //decode token id
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        }
        catch (err) {
            res.status(401).send("Invalid Token");
        }
    }
    if (req.user) {
        const userID = req.user._id;
        const user = await User.findById(userID);
        username = user.username;
        const Exist = await Call_Log.findOne({call_id:call_id,usernames:username});
        if (Call) {
            if (Exist == null) {
                //If user is not in call log already, add new user to the call_Log
                Call.usernames.push(username);
                Call.join = joined;
                Call.save(function(err){
                if(err){
                    console.log(err);
                    return;
                }
                res.status(200).send("User added sucessfully");
                })
            }
            else {
                res.status(400).send("User is on call log already");
            }
        }
    }
    else {
        Call.usernames.push("Anonymous");
        Call.join = joined;
        Call.save(function(err){
            if(err){
                console.log(err);
                return;
            }
            res.status(200).send("Anonymous user added sucessfully");
        })
    }
});

const GetUserFromLog = asyncHandler(async(req, res, next)=> {
    const userId = req.user._id;
    const user = await User.findById(userId);
    const calls = await Call_Log.find({usernames:user.username, join:true}, '-_id').limit(10);
    console.log(calls);
    if (calls) {
        res.status(200).json(calls);
    }
    else {
        res.status(200).send('Users have not made any calls while logged in');
    }
});


module.exports={CreateLog, AddtoLog, GetUserFromLog};