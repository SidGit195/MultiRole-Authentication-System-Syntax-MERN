require('dotenv').config();
const express = require('express');
const passport = require('passport');
const initializePassport = require('./config/passport');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const connectDB = require('./config/db');
const app = express();

connectDB();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Initialise passport
app.use(passport.initialize());
initializePassport();

app.get("/", (_, res) => {
    res.status(200).json({msg: "Welcome to multirole authentication system"});
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ msg: 'Something went wrong!' });
});

const PORT = process.env.PORT;
app.listen(PORT, () => `Server started at PORT ${PORT}`);