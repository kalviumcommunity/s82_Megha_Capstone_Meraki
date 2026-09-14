const express = require('express');
const router = express.Router();
const {
    getUserProfile,
    updateUserProfile,
    changePassword,
    registerUser,
    loginUser,
    googleLogin,
    getUserDashboardStats,
    getLeaderboard
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');

// Auth routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/google', googleLogin);

// Public Leaderboard route
router.get('/leaderboard', getLeaderboard);

// Profile/Settings routes
router.route('/me')
    .get(protect, getUserProfile)
    .patch(protect, updateUserProfile);

router.post('/security/password', protect, changePassword);

// Dashboard routes
router.get('/dashboard', protect, getUserDashboardStats);

module.exports = router;
