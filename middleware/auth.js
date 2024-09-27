const jwt = require('jsonwebtoken');
const User = require('../modules/user.module'); // Ensure your User model is correctly imported

// Middleware to authenticate user using JWT
const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers['authorization']?.split(" ")[1];

        if (!token) {
            return res.status(401).send({
                success: false,
                message: 'Authorization token missing',
            });
        }
        // Verify token
        jwt.verify(token, process.env.JWT, async (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    success: false,
                    message: 'Invalid or expired token',
                });
            } else {
                // Fetch user from the database if needed
                const user = await User.findById(decoded.id);
                if (!user) {
                    return res.status(404).send({
                        success: false,
                        message: 'User not found',
                    });
                }
                // Attach user information to the request object
                req.user = user; // Store the full user object in req.user
                console.log("User ID from token:", req.user._id); 
                next();
            }
        });
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(500).json({
            success: false,
            message: "Authentication failed",
        });
    }
};

// Middleware to check if the user is admin
const isAdmin = (req, res, next) => {
    const { role } = req.user; // Get the role from req.user

    // Check if the user role is 'admin'
    if (role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'Only admins can perform this action',
        });
    }
    next();
};

module.exports = { authMiddleware, isAdmin };
