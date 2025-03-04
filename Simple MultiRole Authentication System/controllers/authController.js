const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    try {
        const { name, email, password, role} = req.body;
        let user = await User.findOne({ email });

        if(user){
            return res.status(400).json({message: "User already exists"});
        }

        user = new User({ name, email, password, role});
        await user.save();

        res.status(201).json({msg: "User registered successfully"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if(!user){
            return res.status(400).json({msg: "User does not exist"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({msg: 'Invalid credentials'});
        }

        const token = jwt.sign(
            {userId: user._id, role: user.role},
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({token, role: user.role});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};