const mongoose = require('mongoose');

const ngoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  location: String,
}, { timestamps: true });

module.exports = mongoose.model('NGO', ngoSchema);
