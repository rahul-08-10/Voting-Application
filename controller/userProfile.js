const userprofile =  require('../modules/user.module');
const bcrypt =  require('bcrypt');
const userData = async (req , res) =>{
    try{
        const userId =  req.body._id;
        const user  =  await userprofile.findById(userId).select('-password');

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User Not Found"
            });
        }
        else{
            return res.status(200).json({
                success:true,
                data:user,
                message:"Data found",
            });
        }
    }
    catch(error){
        return res.status(500).json({
           success:false,
           message:"Server Error",
        })
    }
}

const changePassword = async (req , res)=>{
    const {password ,  newPassword} =  req.body;
    try{
        // check that both the field are provided
        if(!password ||  !newPassword){
            return res.status(400).json({
                success:false,
                message:"Provide both of the fields",
            });
        }
        // check if the user exist in the data base
        const userId  =  req.body._id
        const user  =  await userprofile.findById(userId);
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not present"
            })
        }
        // match the oldpassword provided by the user with the password in the database then change the password
        const isMatch =  await bcrypt.compare(password , user.password);
        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:"Current password is wrong",
            });
        }
        // hash the new password 
        const hashNewPassword =  await bcrypt.hash(newPassword , 10);
        user.password  =  hashNewPassword;
        await user.save();

        return res.status(200).json({
            success:true,
            message:"Password Chnage Successfully",
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Server Error in passwordChange",
        })
    }
}
module.exports =  {userData , changePassword} ;