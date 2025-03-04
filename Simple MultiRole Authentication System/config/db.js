const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Mongodb connected successfully");
    } catch (error) {
        console.error("Error in connecting to mongodb ", error.message);
        process.exit(1);
    }  
}

module.exports = connectDB;