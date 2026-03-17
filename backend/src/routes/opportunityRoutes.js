const express = require('express');
const router = express.Router();
const {
    getOpportunities,
    getOpportunityById,
    createOpportunity,
    applyForOpportunity
} = require('../controllers/opportunityController');
const { protect } = require('../middleware/auth');

router.route('/')
    .get(getOpportunities)
    .post(protect, createOpportunity);

router.route('/:id')
    .get(getOpportunityById);

router.post('/:id/apply', protect, applyForOpportunity);

module.exports = router;
