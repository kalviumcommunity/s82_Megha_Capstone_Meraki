const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    title: { type: String, required: true },
    provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    providerName: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
    thumbnail: String,
    modules: [{
        title: String,
        content: String,
        duration: String
    }],
    duration: String, // Total duration
    enrolledUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    skillsGained: [String],
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 }
}, {
    timestamps: true
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
