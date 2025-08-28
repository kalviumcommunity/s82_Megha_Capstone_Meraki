const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, enum: ['ngo','volunteer','admin'], default: 'volunteer' },
  bio: String,
  profile: {
    location: String,
    focusAreas: [String],
    website: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
