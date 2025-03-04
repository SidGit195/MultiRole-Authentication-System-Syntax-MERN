const { validationResult } = require('express-validator');
const User = require('../models/User');
const { generateToken } = require('../middlewares/authMiddleware');

const register = async (req, res) => {
    // check for validation errors
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, password, role } = req.body;

    try {
        // check if user already exists
        let user = await User.findOne({ email });
        if(user){
            return res.status(400).json({ msg: 'User already exists' });
        }

        // create new user
        user = new User({firstName, lastName, email, password, role});
        await user.save();

        // Generate JWT token
        const token = generateToken(user);

        res.status(201).json({
            msg: 'User registered successfully',
            token,
            user: user.getPublicProfile()
        });
    } catch (error) {
        console.error('Registration error:', error.message);
        res.status(500).json({message: 'Server error'});
    }
};

const login = async (req, res) => {
    // check for validation errors
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const { email, password } = req.body;

    try {
        // check user exists
        const user = await User.findOne({ email });
        if(!user){
            return res.status(401).json({msg: 'Invalid Credentials'});
        }

        // check if user is active
        if(!user.isActive){
            return res.status(401).json({msg: 'Account is deactivated'});
        }

        // verify password
        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(401).json({msg: 'Invalid Credentials'});
        }

        // Update last login time
        user.lastLogin = Date.now();
        await user.save();

        // Generate JWT token
        const token = generateToken(user);

        res.json({
            msg: 'Login successful',
            token,
            user: user.getPublicProfile()
        });
    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({msg: 'Server error'});
    }
};

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if(!user){
            return res.status(404).json({msg: 'User not found'});
        }

        res.json({
            user: user.getPublicProfile()
        });
    } catch (error) {
        console.error('Get profile error:', error.message);
        res.status(500).json({msg: 'Server error'});
    }
};


module.exports = {
    register,
    login,
    getProfile
};