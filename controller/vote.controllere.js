const Candidates =  require('../modules/candidate.module');
const Voter =  require('../modules/user.module');
const ListofCandidate =  async(req , res)=>{
    try{
        const candidate =  await Candidates.find({} ,"name VoteCount");
        if(candidate.length === 0){
            return res.status(404).json({
                success:false,
                message:"No Candidate is present",
            });
        }
        else{
            return res.status(200).json({
                success:true,
                data:candidate,
                message:"This is the Candidates",
            });
        }
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Server Error in List of Candidates"
        });
    }
}

// const voteForCandidate = async (req, res) => {
//     const {voterId} = req.body;
//     const {candidateId} =  req.params;


//     try {
//         // Step 1: Find the voter by voterId
//         const voter = await Voter.findById(voterId); // Fixed this line
//         if (!voter) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Voter not found",
//             });
//         }

//         // Step 2: Check if the voter has already voted
//         if (voter.isVoted) {
//             return res.status(403).json({
//                 success: false,
//                 message: "You have already voted",
//             });
//         }

//         // Step 3: Find the candidate by candidateId
//         const candidate = await Candidates.findById(candidateId); // Assuming Candidate is the correct model
//         if (!candidate) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Candidate not found",
//             });
//         }

//         // Step 4: Record the vote
//         const voteRecord = {
//             candidateId: candidate._id,
//             votedAt: new Date(),
//         };

//         // Update the voter: Mark as voted and add the vote record
//         voter.isVoted = true;
//         voter.votes.push(voteRecord);

//         // Update the candidate: Increment vote count and add vote record
//         candidate.VoteCount += 1; 
//         candidate.votes.push(voteRecord);

//         // Save both voter and candidate updates
//         await voter.save();
//         await candidate.save();

//         return res.status(200).json({
//             success: true,
//             message: `Vote for ${candidate.name} recorded successfully`,
//             voter: voter, 
//             candidate: candidate, // Optional: Send back the updated candidate
//         });

//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: "Server error while recording vote",
//             error: error.message,
//         });
//     }
// };
const voteForCandidate = async (req, res) => {
    const { voterId } = req.body; 
    const { candidateId } = req.params; 

    try {
        const voter = await Voter.findById(voterId);
        if (!voter) {
            return res.status(404).json({
                success: false,
                message: "Voter not found",
            });
        }
        if (voter.isVoted) {
            return res.status(403).json({
                success: false,
                message: "You have already voted",
            });
        }
        const candidate = await Candidates.findById(candidateId);
        if (!candidate) {
            return res.status(404).json({
                success: false,
                message: "Candidate not found",
            });
        }

        // Step 4: Record the vote
        const voteRecord = {
            user: voter._id, // Store the voter's ID
            votedAt: new Date(),
        };

        // Ensure votes array exists before pushing
        if (!Array.isArray(voter.votes)) {
            voter.votes = []; // Initialize if not present
        }
        if (!Array.isArray(candidate.votes)) {
            candidate.votes = []; // Initialize if not present
        }

        // Update the voter and candidate
        voter.votes.push(voteRecord); // This line should now work
        voter.isVoted = true;

        // Increment the candidate's vote count
        candidate.votes.push(voteRecord);
        candidate.VoteCount += 1;

        // Save updates
        await voter.save();
        await candidate.save();

        return res.status(200).json({
            success: true,
            message: `Vote for ${candidate.name} recorded successfully`,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error while recording vote",
            error: error.message,
        });
    }
};


module.exports = {
    ListofCandidate,
    voteForCandidate,
};



