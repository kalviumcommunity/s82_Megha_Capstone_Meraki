const Donation = require('../models/Donation');

// @desc    Process a donation
// @route   POST /api/donations
// @access  Private
const createDonation = async (req, res) => {
    try {
        const { organizationId, amount, message, isAnonymous } = req.body;

        const donation = await Donation.create({
            donor: req.user._id,
            organization: organizationId,
            amount,
            message,
            isAnonymous
        });

        res.status(201).json(donation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get user's donation history
// @route   GET /api/donations/my-history
// @access  Private
const getMyDonations = async (req, res) => {
    try {
        const donations = await Donation.find({ donor: req.user._id })
            .populate('organization', 'name');
        res.json(donations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createDonation,
    getMyDonations
};
