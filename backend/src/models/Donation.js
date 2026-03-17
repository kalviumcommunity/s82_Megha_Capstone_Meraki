const mongoose = require('mongoose');

const donationSchema = mongoose.Schema({
    donor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
    message: String,
    status: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Completed' },
    isAnonymous: { type: Boolean, default: false }
}, {
    timestamps: true
});

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;
