const mongoose = require('mongoose');

const StopSequenceSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., stop name or sequence label
  order: { type: Number, required: true }, // sequence order
  description: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('StopSequence', StopSequenceSchema);
