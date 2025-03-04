const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { authenticateJWT } = require('../middlewares/authMiddleware');
const { isUser } = require('../middlewares/roleCheckMiddleware');


// update user profile
router.patch('/profile', authenticateJWT, isUser, async (req, res) => {
  const { firstName, lastName } = req.body;
  
  try {
    const user = await User.findById(req.user.id);
    
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    
    await user.save();
    
    res.json({ 
      message: 'Profile updated successfully', 
      user: user.getPublicProfile() 
    });
  } catch (error) {
    console.error('Update profile error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});


// change password
router.patch('/change-password', authenticateJWT, isUser, async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    if(!currentPassword || !newPassword){
        return res.status(400).json({
            msg: 'Current password and new password are required' 
        });
    }

    if(newPassword.length < 6){
        return res.status(400).json({
            msg: 'New password must be at least 6 characters long' 
        });
    }

    try {
        const user = await User.findById(req.user.id);

        // verify current password
        const isMatch = await user.comparePassword(currentPassword);
        if(!isMatch){
            return res.statut(401).json({msg: 'Current password is incorrect'});
        }

        // update to new password
        user.password = newPassword;
        await user.save();

        res.json({msg: 'Password changes successfully'});
    } catch (error) {
        console.error('Change password error:', error.message);
        res.status(500).json({ msg: 'Server error'});
    }
});


module.exports = router;