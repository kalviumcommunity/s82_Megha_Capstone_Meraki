const express = require('express');
const router = express.Router();

const volunteers = [
    { id: 1, name: 'John Doe', hours: 10 },
    { id: 2, name: 'Jane Smith', hours: 20 },
];

router.get('/', (req, res) => {
    res.json(volunteers);
});

router.get('/:id', (req, res) => {
    const volunteer = volunteers.find(v => v.id === parseInt(req.params.id));
    if (!volunteer) return res.status(404).json({ message: 'Volunteer not found' });
    res.json(volunteer);
});

module.exports = router;
