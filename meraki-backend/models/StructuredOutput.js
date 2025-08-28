const mongoose = require('mongoose');

const StructuredOutputSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  type: { type: String, required: true }, // e.g., "report", "summary", "task"
  data: { type: mongoose.Schema.Types.Mixed }, // for flexible structured data
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('StructuredOutput', StructuredOutputSchema);
