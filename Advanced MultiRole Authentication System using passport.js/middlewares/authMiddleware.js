const jwt = require('jsonwebtoken');
const passport = require('passport');

// Generate JWT token
const generateToken = (user) => {
    return jwt.sign(
        {id: user._id, email: user.email, role: user.role},
        process.env.JWT_SECRET, 
        {expiresIn: process.env.JWT_EXPIRES_IN}
    );
};


// Middleware to authenticate using JWT
const authenticateJWT = passport.authenticate('jwt', { session: false});

module.exports = {
    generateToken,
    authenticateJWT
};