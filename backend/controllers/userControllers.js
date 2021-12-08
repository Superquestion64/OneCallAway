const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const generateToken = require('../utils/generateToken');
const validator = require('email-validator');

const password_regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,25}$/;
const loggedIn = "Online";
const loggedOut = "Offline";

//Registers a new user
const registerUser = asyncHandler(async(req, res) => {
    const { password, passwordConfirm} = req.body;
    //Change the username and email to lower case
    email = req.body.email.toLowerCase();
    username = req.body.username.toLowerCase();
    
    //Check to see if email is valid
    if (!validator.validate(email)) {
        res.status(400).send('Please enter a valid email');
    }
    else{
        //Check to see if email and username already exists or not
        const emailExist = await User.findOne({email: email});
        const usernameExist = await User.findOne({username:username});
        if (emailExist && usernameExist) {
            res.status(400).send('Email and Username both exist');
        }
        else if (emailExist) {
            res.status(400).send('Email already exist');
        }
        else if (usernameExist) {
            res.status(400).send('Username already exist');
        }
        else{
            //Check to make sure passwords are the same, if it create a new user using User schema
            //with the user status set to online and saves the user to database
            //Return the user id, username, email, and the token generated
            if (password == passwordConfirm) {
                var user_status = "Online";
                const user = await User.create({
                    username,
                    email,
                    password,
                    user_status,
                });
                if (user) {
                    res.status(201).json({
                        // _id:user._id,
                        // username:user.username,
                        // email:user.email,
                        token:generateToken(user._id),
                    });
                }
                else{
                    res.status(400).send('Error Occured!');
                }
            }
            else {
                res.status(400).send('Password does not match');
            }
        }
    }
});

//Logs the user in
const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body;
    //Change the  email to lower case, and looks for the email in database,
    //If found, match the password in database with the password inputted by user,
    //Logs user in if password match, change user status to online and returns the generated token
    e = email.toLowerCase();
    const user = await User.findOne({email: e});
    if (user && (await user.matchPassword(password))) {
        user.user_status = loggedIn;
        await user.save();
        res.json({
            token:generateToken(user._id)
        })
    }
    else{
        res.status(400).send('Invalid Login Credentials');
    }
});
//Get user profile
const userProfile = asyncHandler(async(req,res) => {
    const user = await User.findById(req.user._id, '-_id -password -user_status -__v');
    if(user) {
        res.status(200).json(user);
    }
    else {
        res.status(404).send('User not logged in')
    }
});

//Update the user information such as username, email and password
const updateUser = asyncHandler(async(req,res) => {
    //Find the user in database using the token provided, if found check to see which fields are not empty,
    //Updates the info, if email and username are not already taken
    const user = await User.findById(req.user._id);
    let email = false;
    let password = false;
    if (user){
        if (req.body.email) {
            if (validator.validate(req.body.email)){
                req.body.email = req.body.email.toLowerCase();
                if (req.body.email != user.email){
                    exist = await User.findOne({email:req.body.email});
                    if (exist == null) {
                        user.email = req.body.email;
                        email = true;
                    }
                }
                else {
                    email = true
                }
            }
        }
        if (req.body.password) {
            if((req.body.password == password_regex)){
                password = false;
            }
            else{
                user.password = req.body.password;
                password = true;
            }
        }
        if (email && password) {
            user.save(function(err){
                if(err){
                    console.log(err);
                    return;
                }
            })
            res.status(200).send("Email and password update sucessful");
        }
        else if (email && !password) {
            res.status(400).send("Invalid Password");
        }
        else if (!email && password) {
            res.status(400).send("Invalid Email/Email already in use");
        }
        else {
            res.status(400).send("Invalid email and password");
        }
    }
    else {
        res.status(404).send("User not found");
    }
});

//Used to return whether or not token is valid
const authorizeUser = asyncHandler(async(req,res) => {
    res.status(200).send("Valid Token");
});

//Logs the user out
const signoutUser = asyncHandler(async(req, res) => {
    //Find the user in database using token provided, 
    //changes the user status to offline and logs the user out
    const user = await User.findById(req.user._id);
    user.user_status = loggedOut;
    user.save(function(err){
        if(err){
            console.log(err);
            return;
        }
    })
    res.status(200).send("Sucessfully Logged Out");
});

//Let user add interests
const addInterest = asyncHandler(async(req, res) => {
    //Change the interest to lowercase, check to see if user can be found with token
    //Check to see if interest has already been added
    const interest = req.body;
    const userID = req.user._id;
    const user = await User.findById(userID);
    let update = false;
    if (user) {
        if (interest) {
            for(var i = 0; i < interest.length; i++) {
                lower = interest[i].toLowerCase();
                var Exist = await User.findOne({_id:userID,tags:lower});
                if (Exist == null) {
                    //If interest has not been added already, add new interest to the database under the user
                    user.tags.push(lower);
                    update = true;
                }
            }
            user.save(function(err){
                if(err){
                    console.log(err);
                    return;
                }
            })
            if(update != false) {
                res.status(200).send("Interest added sucessfully");
            }
            else {
                res.status(400).send("Interest already exists");
            }
        } 
    }
    else {
        res.status(404).send("User not found");
    }
});

//Search for users with similar interests
const searchUser = asyncHandler(async(req,res) => {
    //Change the search parameter to lowercase, and find the current user using provided token,
    //If user if logged in, find other users with the same interest as parameter, and return them
    const string = req.body.name.toLowerCase();
    const userID = req.user._id;
    const Currentuser = await User.findById(userID);
    if (Currentuser) {
        withTags = await User.find({
            tags: string,
            _id: {$ne: userID}
        }, '-_id username user_status tags');
        if (withTags.length){
            res.status(200).send(withTags);
        }
        else {
            res.status(200).send("No users found with search parameters");
        }
    }
    else {
        res.status(404).send("User not logged in");
    }
}); 
module.exports={ registerUser, loginUser, userProfile, updateUser, authorizeUser, signoutUser, addInterest, searchUser};