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

const createEvent = async (req, res) => {
    try {
        if (req.user.role !== 'organization') return res.status(403).json({ message: 'Only organizations can create events' });
        const event = new Event({
            ...req.body,
            organizer: req.user._id,
            organizerName: req.user.name
        });
        const createdEvent = await event.save();
        res.status(201).json(createdEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateEvent = async (req, res) => {
    try {
        let event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });
        if (event.organizer.toString() !== req.user._id.toString()) return res.status(401).json({ message: 'Not authorized' });

        event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.status(200).json(event);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });
        if (event.organizer.toString() !== req.user._id.toString()) return res.status(401).json({ message: 'Not authorized' });

        await event.deleteOne();
        res.status(200).json({ message: 'Event deleted' });
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

const createCourse = async (req, res) => {
    try {
        if (req.user.role !== 'organization') return res.status(403).json({ message: 'Only organizations can create courses' });
        const course = new Course({
            ...req.body,
            instructor: req.user._id,
            instructorName: req.user.name
        });
        const createdCourse = await course.save();
        res.status(201).json(createdCourse);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateCourse = async (req, res) => {
    try {
        let course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ message: 'Course not found' });
        if (course.instructor.toString() !== req.user._id.toString()) return res.status(401).json({ message: 'Not authorized' });

        course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.status(200).json(course);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ message: 'Course not found' });
        if (course.instructor.toString() !== req.user._id.toString()) return res.status(401).json({ message: 'Not authorized' });

        await course.deleteOne();
        res.status(200).json({ message: 'Course deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
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
};
