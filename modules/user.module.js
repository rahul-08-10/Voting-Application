const mongoose = require('mongoose');

const voterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"], 
    },
    email: {
        type: String,
        required: false, 
    },
    age: {
        type: String, 
        required: true,
    },
    address: {
        type: String,
        required: false, 
    },
    phoneNumber: {
        type: String,
        required: false, 
    },
    AddharCard: { 
        type: String,
        required: true,
        unique: true, // Ensure that Aadhar card is unique
    },
    password: {
        type: String,
        required: true,
    },
    newPassword:{
        type:String,
    },
    role: {
        type: String,
        default: "voter", 
        enum: ['voter', 'admin'], 
    },
    isVoted: {
        type: Boolean,
        required: true,
        default: false, 
    },
});

const Voter = mongoose.model('Voter', voterSchema);
module.exports = Voter;
    