const mongoose = require('mongoose');

const TemperatureSchema = new mongoose.Schema({
  location: { type: String, required: true },
  value: { type: Number, required: true }, // in Celsius
  recordedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  recordedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Temperature', TemperatureSchema);
