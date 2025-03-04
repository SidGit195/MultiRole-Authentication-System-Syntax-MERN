require('dotenv').config();
const express = require('express');
const cors = require("cors");
const connectDB = require('./config/db');
const UserRoute = require('./routes/authRoutes');

const app = express();

connectDB();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// api
app.get("/", (_, res) => {
    res.status(200).json({message: "Hello world"});
});

app.use('/api', UserRoute);

// error handling middleware
app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).json({Error: err.message || "Internal Sever Error"});
});

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server started at PORT ${PORT}`));