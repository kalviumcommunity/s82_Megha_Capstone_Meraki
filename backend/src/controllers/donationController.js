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

// @desc    Simulate Razorpay/Stripe checkout order creation
// @route   POST /api/donations/checkout
// @access  Private
const createCheckoutSession = async (req, res) => {
    try {
        const { amount, currency, organizationId } = req.body;
        const orderId = `order_${Math.random().toString(36).substring(2, 10)}`;

        res.json({
            success: true,
            orderId,
            amount: amount || 50,
            currency: currency || 'USD',
            paymentGateway: 'Razorpay / Stripe Ready',
            checkoutUrl: `https://checkout.stripe.com/demo/${orderId}`
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get financial transparency breakdown metrics
// @route   GET /api/donations/transparency
// @access  Public
const getFinancialTransparency = async (req, res) => {
    try {
        res.json({
            totalFunded: 145800,
            volunteerHoursValue: 32400, // $25 per hour matched
            breakdown: [
                { category: 'Field Action & Materials', percentage: 70, color: '#10b981' },
                { category: 'Community Logistics & Food', percentage: 20, color: '#3b82f6' },
                { category: 'Admin & Verification', percentage: 10, color: '#6b7280' }
            ]
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createDonation,
    getMyDonations,
    createCheckoutSession,
    getFinancialTransparency
};
