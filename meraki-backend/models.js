const mongoose = require('mongoose');

// User Schema (for volunteers, voters, ngos)
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['volunteer', 'voter', 'ngo'], required: true },
  registeredAt: { type: Date, default: Date.now },
  profileImage: { type: String }, // URL to profile picture
  bio: { type: String },
  blockchainAddress: { type: String, unique: true }, // For blockchain integration
  // New: link volunteers to events they're part of
  eventsParticipated: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
}, { timestamps: true });

// NGO Schema
const ngoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  contactEmail: { type: String, required: true, unique: true },
  // Projects as subdocuments with reference to related events and volunteers
  projects: [{
    name: String,
    description: String,
    startDate: Date,
    endDate: Date,
    status: { type: String, enum: ['ongoing', 'completed'], default: 'ongoing' },
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],  // Link Events to Projects
    volunteers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Volunteers linked to projects
  }],
  createdAt: { type: Date, default: Date.now },
});

// Event Schema
const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  location: { type: String },
  ngo: { type: mongoose.Schema.Types.ObjectId, ref: 'NGO', required: true }, // Which NGO organizes the event
  volunteers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],       // Volunteers attending event
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },        // Optional link to a project
}, { timestamps: true });

// Voting Schema
const votingSchema = new mongoose.Schema({
  electionName: { type: String, required: true },
  candidates: [{
    name: { type: String, required: true },
    votes: { type: Number, default: 0 },
  }],
  voters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Track who voted
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  status: { type: String, enum: ['upcoming', 'ongoing', 'completed'], default: 'upcoming' },
}, { timestamps: true });

// Models
const User = mongoose.model('User', userSchema);
const NGO = mongoose.model('NGO', ngoSchema);
const Event = mongoose.model('Event', eventSchema);
const Voting = mongoose.model('Voting', votingSchema);

module.exports = { User, NGO, Event, Voting };
