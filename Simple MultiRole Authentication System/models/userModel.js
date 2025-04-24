const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    }, 
    password: {
        type: String, 
        require: true,
        min: 6
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
});

// Hash the password before saving it to the database
userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();                // agar password change nhi hua hai to hash karne ki jarurat nhi hai
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

module.exports = mongoose.model('User', userSchema);
