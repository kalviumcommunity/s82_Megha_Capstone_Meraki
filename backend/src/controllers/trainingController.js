const Event = require('../models/Event');
const Course = require('../models/Course');

// --- Events Handlers ---

const getEvents = async (req, res) => {
    try {
        const events = await Event.find({}).sort({ date: 1 });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const registerForEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        if (event.attendees.includes(req.user._id)) {
            return res.status(400).json({ message: 'Already registered' });
        }

        event.attendees.push(req.user._id);
        await event.save();
        res.json({ message: 'Registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// --- Courses Handlers ---

const getCourses = async (req, res) => {
    try {
        const courses = await Course.find({});
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const enrollInCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ message: 'Course not found' });

        if (course.enrolledUsers.includes(req.user._id)) {
            return res.status(400).json({ message: 'Already enrolled' });
        }

        course.enrolledUsers.push(req.user._id);
        await course.save();
        res.json({ message: 'Enrolled successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getEvents,
    registerForEvent,
    getCourses,
    enrollInCourse
};
