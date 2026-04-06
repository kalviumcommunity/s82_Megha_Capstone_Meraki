const express = require('express');
const router = express.Router();
const { createDonation, getMyDonations } = require('../controllers/donationController');
const { protect } = require('../middleware/auth');

router.post('/', protect, createDonation);
router.get('/my-history', protect, getMyDonations);

module.exports = router;
