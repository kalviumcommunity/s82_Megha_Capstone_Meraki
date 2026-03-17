const Opportunity = require('../models/Opportunity');

// @desc    Get all opportunities
// @route   GET /api/opportunities
// @access  Public
const getOpportunities = async (req, res) => {
    try {
        const opportunities = await Opportunity.find({ status: 'Open' })
            .populate('organization', 'name profilePicture');
        res.json(opportunities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single opportunity
// @route   GET /api/opportunities/:id
// @access  Public
const getOpportunityById = async (req, res) => {
    try {
        const opportunity = await Opportunity.findById(req.params.id)
            .populate('organization', 'name profilePicture bio');

        if (opportunity) {
            res.json(opportunity);
        } else {
            res.status(404).json({ message: 'Opportunity not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create opportunity
// @route   POST /api/opportunities
// @access  Private/Organization
const createOpportunity = async (req, res) => {
    try {
        if (req.user.role !== 'organization') {
            return res.status(403).json({ message: 'Only organizations can create opportunities' });
        }

        const {
            title, description, location, type, category,
            skillsRequired, impactArea, dateRange, hoursPerWeek, spotsAvailable
        } = req.body;

        const opportunity = new Opportunity({
            title,
            organization: req.user._id,
            organizationName: req.user.name,
            description,
            location,
            type,
            category,
            skillsRequired,
            impactArea,
            dateRange,
            hoursPerWeek,
            spotsAvailable
        });

        const createdOpportunity = await opportunity.save();
        res.status(201).json(createdOpportunity);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Apply for an opportunity
// @route   POST /api/opportunities/:id/apply
// @access  Private/Volunteer
const applyForOpportunity = async (req, res) => {
    try {
        if (req.user.role !== 'volunteer') {
            return res.status(403).json({ message: 'Only volunteers can apply' });
        }

        const opportunity = await Opportunity.findById(req.params.id);

        if (!opportunity) {
            return res.status(404).json({ message: 'Opportunity not found' });
        }

        const alreadyApplied = opportunity.applicants.find(
            (a) => a.user.toString() === req.user._id.toString()
        );

        if (alreadyApplied) {
            return res.status(400).json({ message: 'Already applied for this opportunity' });
        }

        opportunity.applicants.push({ user: req.user._id });
        await opportunity.save();

        res.status(200).json({ message: 'Application submitted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getOpportunities,
    getOpportunityById,
    createOpportunity,
    applyForOpportunity
};
