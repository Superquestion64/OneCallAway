//Schema for user model
const mongoose = require('mongoose');
const bycrypt = require('bcryptjs');


const UserSchema = new mongoose.Schema({
	username: {
        type: String, 
        unique: true, 
        required:true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
    },
    password: {
        type: String, 
        required:true,
    },
    user_status: {
        type: String,
        required:true,
    },
    tags: [
        String,
    ],
});

//Encrypt the password using bycrpyt before saving
UserSchema.pre('save', async function (next){
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bycrypt.genSalt(10);
    this.password = await bycrypt.hash(this.password, salt);
});
//Method to match the password when logging in
UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bycrypt.compare(enteredPassword, this.password);
};
const User=mongoose.model('User', UserSchema);
module.exports = User;