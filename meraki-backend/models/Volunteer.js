const mongoose = require('mongoose');

const VolunteerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    hoursContributed: { type: Number, default: 0 },
});

module.exports = mongoose.model('Volunteer', VolunteerSchema);
