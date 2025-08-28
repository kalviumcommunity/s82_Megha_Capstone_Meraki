const mongoose = require('mongoose');

const TopKSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., top K event/item name
  value: { type: Number, required: true }, // ranking value or score
  recordedAt: { type: Date, default: Date.now },
  recordedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('TopK', TopKSchema);
