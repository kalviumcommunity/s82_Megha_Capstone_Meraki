const mongoose = require('mongoose');

const NgoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    mission: { type: String, required: true },
});

module.exports = mongoose.model('Ngo', NgoSchema);
