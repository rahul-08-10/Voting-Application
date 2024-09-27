const user = require('../modules/user.module');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// User signup controller
const userSignup = async (req, res) => {
    const { name, email, age, password, phoneNumber, address, role, AddharCard } = req.body;
    try {
        // Check if all required fields are provided
        if (!name || !email || !age || !password || !phoneNumber || !address || !role || !AddharCard) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required details",
            });
        }

        // Check if the user already exists by AddharCard
        const ExistingUser = await user.findOne({ AddharCard });
        if (ExistingUser) {
            return res.status(400).json({
                success: false,
                message: "User already registered with this Aadhar card",
            });
        }

        // Hash the user's password
        const hashpassword = await bcrypt.hash(password, 10);

        // Create a new user
        const NewUser = new user({
            name,
            email,
            age,
            password: hashpassword,
            phoneNumber,
            address,
            role,
            AddharCard
        });

        // Save the new user to the database
        await NewUser.save();

        return res.status(201).json({
            success: true,
            data: NewUser,
            message: "User successfully registered",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error during registration",
            error: error.message
        })
    }
};

const userLogin = async (req, res) => {
    const { AddharCard, password } = req.body;
    try {
        if (!AddharCard || !password) {
            return res.status(500).json({
                success: false,
                message: "Add the details for Login",
            })
        }
        const isUserPresent = await user.findOne({ AddharCard })
        if (!isUserPresent) {
            return res.status(400).json({
                success: false,
                message: "Addhar is wrong",
            })
        }
        const isMatched = await bcrypt.compare(password, isUserPresent.password);
        if (!isMatched) {
            return res.status(400).json({
                success: false,
                message: "Password is wrong",
            })
        }
        const token = jwt.sign(
            { id: isUserPresent._id,
                name:isUserPresent.name,
                email:isUserPresent.email,
                age:isUserPresent.age,
                phoneNumber:isUserPresent.phoneNumber,
                address:isUserPresent.address,
                role:isUserPresent.role,
                AddharCard:isUserPresent.AddharCard
            }
            , process.env.JWT, 
            { expiresIn: '7d' }
        );
        // this is the line of code which hides the dataa we want .doc is the method provided by mongoose 
        const { password: userPassword, ...userWithoutPassword } = isUserPresent._doc;
        console.log("this is userDetails:- ", userWithoutPassword);
        return res.status(200).json({
            success: true,
            user: userWithoutPassword,
            token,
            message: "User logined Successfully",
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Login Unsuccessful",
        })
    }
}


module.exports = {
    userSignup,
    userLogin
}