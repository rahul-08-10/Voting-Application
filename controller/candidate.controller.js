// add the candidate 
const candidate = require('../modules/candidate.module'); // Correct model

const NewCandidate = async (req, res) => {
    const { name, party, age } = req.body;

    try {
        // Check if all fields are provided
        if (!name || !party || !age) {
            return res.status(400).json({
                success: false,
                message: "Provide All Details",
            });
        }

        // Check if the candidate with the same name or party already exists
        const ExistingUser = await candidate.findOne({ party }); // Use findOne for single document
        if (ExistingUser) {
            return res.status(400).json({
                success: false,
                message: "This party is already present",
            });
        }

        // Create a new candidate
        const NewCandidateRegistered = new candidate({ // Use 'candidate' model here
            name,
            party,
            age,
            votes: [],
            voteCount: 0,
        });

        // Save the new candidate to the database
        await NewCandidateRegistered.save();

        return res.status(201).json({
            success: true,
            data: NewCandidateRegistered,
            message: "New candidate successfully registered",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error In Candidate Registration",
            error: error.message,
        });
    }
};



const getCandidate =  async(req , res)=>{
    try{
        const Findcandidate = await candidate.find();
        if(!Findcandidate){
            return res.status(404).json({
                success:false,
                message:"No Candidate Found",
            });
        }
        else{
            return res.status(200).json({
                success:true,
                data:candidate,
                message:"Candidate Found",
            });
        }
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"User Not Found"
        })
    }
}


// update the candidate 
const updateCandidateData = async(req , res)=>{
    const userId  =  req.body._id;
    const {name , party , age} = req.body;
    try{
        // check for the id of the candidate with the help of id 
        const candidates =  await candidate.findById(userId);
        if(!candidates){
            return res.status(404).json({
                success:false,
                message:"User is not present",
            });
        }
        else{
            if(name){
                candidates.name =  name;

            }
            if(party){
                candidates.party = party;
            }
            if(age){
                candidates.age = age;
            }
            await candidates.save();

            return res.status(200).json({
                success:true,
                data:candidates,
                message:"Candidate Updated",
            });
        }
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"Error in Updating the candidate",
        })
    }
}


// Delete the candidate 
const DeleteCandidate =  async(req , res)=>{
    const userId =  req.params;
    try{
        const DelCandidate =  await candidate.findById(userId);
        if(!DelCandidate){
            return res.status(404).json({
                success:false,
                message:"Candidate not found",
            });
        }
        else{
            await candidate.findByIdAndDelete(userId);

            return res.status(200).json({
                success: true,
                message: "Candidate deleted successfully",
            });
        }
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Server error while deleting candidate",
            error: error.message,
        });
    }
}

module.exports = {
    NewCandidate,
    getCandidate,
    updateCandidateData,
    DeleteCandidate
}