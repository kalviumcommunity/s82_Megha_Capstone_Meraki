const mongoose = require('mongoose');

const opportunitySchema = mongoose.Schema({
    title: { type: String, required: true },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    organizationName: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String, enum: ['Remote', 'On-site', 'Hybrid'], default: 'Remote' },
    category: { type: String, required: true },
    skillsRequired: [String],
    impactArea: String,
    dateRange: {
        start: Date,
        end: Date
    },
    hoursPerWeek: Number,
    spotsAvailable: { type: Number, default: 1 },
    status: { type: String, enum: ['Open', 'Closed', 'Draft'], default: 'Open' },
    applicants: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        status: { type: String, enum: ['Pending', 'Accepted', 'Rejected'], default: 'Pending' },
        appliedAt: { type: Date, default: Date.now }
    }]
}, {
    timestamps: true
});

const Opportunity = mongoose.model('Opportunity', opportunitySchema);

module.exports = Opportunity;
