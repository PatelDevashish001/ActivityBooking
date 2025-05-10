const jwt = require('jsonwebtoken');
const User = require('../models/user');

const verifyToken = async (req, res, next) => {
    try {
        // Get token from header
        const token = req.header('Authorization')?.replace('Bearer ', '');
        console.log(token);
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. No token provided'
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        

        const user = await User.findById(decoded.userId);  
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found'
            });
        }


        req.user = {
            id: user._id,
            email: user.email
        };
        
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(401).json({
            success: false,
            message: 'Invalid token'
        });
    }
};

module.exports = verifyToken;
