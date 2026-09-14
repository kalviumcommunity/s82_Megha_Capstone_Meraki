const express = require('express');
const router = express.Router();
const {
    createDonation,
    getMyDonations,
    createCheckoutSession,
    getFinancialTransparency
} = require('../controllers/donationController');
const { protect } = require('../middleware/auth');

router.post('/', protect, createDonation);
router.get('/my-history', protect, getMyDonations);
router.post('/checkout', protect, createCheckoutSession);
router.get('/transparency', getFinancialTransparency);

module.exports = router;
