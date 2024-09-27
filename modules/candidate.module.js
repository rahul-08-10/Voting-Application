const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"], 
    },
    party: {
        type: String,  
        required: true, 
        unique:true,
    },
    age: {
        type: Number, 
        required: true,
    },
    votes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Voter', 
            },
            votedAt: {
                type: Date,
                default: Date.now, 
            }
        }
    ],
    VoteCount: {
        type: Number, 
        default: 0,
    }
});

const Candidate = mongoose.model('Candidate', candidateSchema);
module.exports = Candidate;
