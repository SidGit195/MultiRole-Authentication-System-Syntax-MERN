const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.post('/login', login);
router.post('/register', register);

// Protected routes
router.get("/user-dashboard", authMiddleware, (req, res) => {
    res.json({msg: "User Dashboard", user: req.user});
});

// Admin-Only routes
router.get("/admin-dashboard", roleMiddleware(['admin']), (req, res) =>{
    res.json({msg: "Admin Dashboard", user: req.user});
});

module.exports = router;