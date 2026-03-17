const express = require('express');
const router = express.Router();
const {
    getUserProfile,
    updateUserProfile,
    changePassword,
    registerUser,
    loginUser
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');

// Auth routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Profile/Settings routes
router.route('/me')
    .get(protect, getUserProfile)
    .patch(protect, updateUserProfile);

router.post('/security/password', protect, changePassword);

module.exports = router;
