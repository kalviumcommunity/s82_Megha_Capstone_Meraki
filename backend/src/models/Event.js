const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    title: { type: String, required: true },
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    organizerName: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    type: { type: String, enum: ['Workshop', 'Webinar', 'Meetup', 'Conference'], default: 'Workshop' },
    category: String,
    image: String,
    capacity: Number,
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    tags: [String]
}, {
    timestamps: true
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
