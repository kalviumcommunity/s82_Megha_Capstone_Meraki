const express = require('express');
const router = express.Router();
const {
    getEvents,
    registerForEvent,
    createEvent,
    updateEvent,
    deleteEvent,
    getCourses,
    enrollInCourse,
    createCourse,
    updateCourse,
    deleteCourse
} = require('../controllers/trainingController');
const { protect } = require('../middleware/auth');

// Event routes
router.route('/events')
    .get(getEvents)
    .post(protect, createEvent);

router.route('/events/:id')
    .put(protect, updateEvent)
    .delete(protect, deleteEvent);

router.post('/events/:id/register', protect, registerForEvent);

// Course routes
router.route('/courses')
    .get(getCourses)
    .post(protect, createCourse);

router.route('/courses/:id')
    .put(protect, updateCourse)
    .delete(protect, deleteCourse);

router.post('/courses/:id/enroll', protect, enrollInCourse);

module.exports = router;
