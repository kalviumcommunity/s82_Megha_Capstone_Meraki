const express = require('express');
const router = express.Router();
const {
    getOpportunities,
    getOpportunityById,
    createOpportunity,
    applyForOpportunity,
    updateOpportunity,
    deleteOpportunity,
    updateApplicationStatus,
    getMatchedOpportunities
} = require('../controllers/opportunityController');
const { protect } = require('../middleware/auth');

router.get('/matched', protect, getMatchedOpportunities);

router.route('/')
    .get(getOpportunities)
    .post(protect, createOpportunity);

router.route('/:id')
    .get(getOpportunityById)
    .put(protect, updateOpportunity)
    .delete(protect, deleteOpportunity);

router.post('/:id/apply', protect, applyForOpportunity);
router.patch('/:id/applicants/:userId', protect, updateApplicationStatus);

module.exports = router;
