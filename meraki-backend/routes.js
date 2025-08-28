const express = require('express');
const router = express.Router();
const authController = require('./authController');
const authMiddleware = require('./authMiddleware');

// Login route
router.post('/api/login', authController.login);

// Protected route
router.get('/api/protected', authMiddleware.authenticateToken, authController.protectedRoute);

module.exports = router;

