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

// @desc    Update opportunity
// @route   PUT /api/opportunities/:id
// @access  Private/Organization
const updateOpportunity = async (req, res) => {
    try {
        let opportunity = await Opportunity.findById(req.params.id);

        if (!opportunity) {
            return res.status(404).json({ message: 'Opportunity not found' });
        }

        // Make sure user owns the opportunity
        if (opportunity.organization.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to update this opportunity' });
        }

        opportunity = await Opportunity.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.status(200).json(opportunity);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete opportunity
// @route   DELETE /api/opportunities/:id
// @access  Private/Organization
const deleteOpportunity = async (req, res) => {
    try {
        const opportunity = await Opportunity.findById(req.params.id);

        if (!opportunity) {
            return res.status(404).json({ message: 'Opportunity not found' });
        }

        // Make sure user owns the opportunity
        if (opportunity.organization.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to delete this opportunity' });
        }

        await opportunity.deleteOne();

        res.status(200).json({ message: 'Opportunity deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update applicant status
// @route   PATCH /api/opportunities/:id/applicants/:userId
// @access  Private/Organization
const updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const opportunity = await Opportunity.findById(req.params.id);

        if (!opportunity) {
            return res.status(404).json({ message: 'Opportunity not found' });
        }

        if (opportunity.organization.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to update applicants for this opportunity' });
        }

        const applicant = opportunity.applicants.find(
            a => a.user.toString() === req.params.userId
        );

        if (!applicant) {
            return res.status(404).json({ message: 'Applicant not found' });
        }

        applicant.status = status;
        await opportunity.save();

        res.status(200).json(opportunity);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getOpportunities,
    getOpportunityById,
    createOpportunity,
    applyForOpportunity,
    updateOpportunity,
    deleteOpportunity,
    updateApplicationStatus
};
