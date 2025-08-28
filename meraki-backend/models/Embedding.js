const mongoose = require('mongoose');

const EmbeddingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  vector: { type: [Number], required: true }, // embedding vector
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Embedding', EmbeddingSchema);
