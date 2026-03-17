const express = require('express');
const router = express.Router();
const {
    getEvents,
    registerForEvent,
    getCourses,
    enrollInCourse
} = require('../controllers/trainingController');
const { protect } = require('../middleware/auth');

// Event routes
router.get('/events', getEvents);
router.post('/events/:id/register', protect, registerForEvent);

// Course routes
router.get('/courses', getCourses);
router.post('/courses/:id/enroll', protect, enrollInCourse);

module.exports = router;
