const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  skills: [String],
  availability: String,
}, { timestamps: true });

module.exports = mongoose.model('Volunteer', volunteerSchema);
