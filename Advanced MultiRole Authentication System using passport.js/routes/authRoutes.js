const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { loginValidation, registerValidation } = require('../utils/validation');
const { authenticateJWT } = require('../middlewares/authMiddleware');

router.post('/register', registerValidation, authController.register);

router.post('/login', loginValidation, authController.login);

router.get('/profile', authenticateJWT, authController.getProfile);

module.exports = router;