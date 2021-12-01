//Schema for call model
const mongoose = require('mongoose');

const CallSchema = new mongoose.Schema({
	call_id: {
        type: String,
        unique: true,
        required: true,
    },
    usernames:[
        String,
    ],
});

const Call_Log=mongoose.model('Call_Log', CallSchema);
module.exports = Call_Log;