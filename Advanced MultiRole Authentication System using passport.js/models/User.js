const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const ROLES = require('../config/roles');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        enum: Object.values(ROLES),
        default: ROLES.USER
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    lastLogin: {
        type: Date
    }
});

// Hash the password before saving it to the database
UserSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare the password
UserSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password);
};

// Method to get user's public profile
UserSchema.methods.getPublicProfile = function(){
    const userObject = this.toObject();             // for converting document to js object
    delete userObject.password;
    return userObject;
};

module.exports = mongoose.model('User', UserSchema);