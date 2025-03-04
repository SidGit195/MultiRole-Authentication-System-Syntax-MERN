const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { authenticateJWT } = require('../middlewares/authMiddleware');
const { isAdmin } = require('../middlewares/roleCheckMiddleware');

router.get('/users', authenticateJWT, isAdmin, async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json({ users });
    } catch (error) {
        console.error('Get users error:', error.message);
        res.status(500).json({msg: 'Server error'});
    }
});

// Update user role - Admin only
router.patch('/users/:id/role', authenticateJWT, isAdmin, async (req, res) => {
    const {role} = req.body;

    try {
        const user = await User.findById(req.params.id);

        if(!user){
            return res.status(404).json({msg: 'User not found'});
        }

        user.role = role;
        await user.save();

        res.json({
            msg: 'User role updated successfully',
            user: user.getPublicProfile()
        });
    } catch (error) {
        console.error('Update user role error:', error.message);
        res.status(500).json({ msg: 'Server error'});
    }
});


// Activate/Deactive user - Admin only
router.patch('/users/:id/status', authenticateJWT, isAdmin, async (req, res) => {
    const { isActive } = req.body;

    try {
        const user = await User.findById(req.params.id);

        if(!user){
            return res.status(400).json({msg: 'User not found'});
        }

        user.isActive = isActive;
        await user.save();

        res.json({
            msg: `User ${isActive ? 'activated' : 'deactivated'} successfully`,
            user: user.getPublicProfile()
        });
    } catch (error) {
        console.error('Updated user status error:', error.message);
        res.status(500).json({msg: 'Server error'});
    }
});

module.exports = router;