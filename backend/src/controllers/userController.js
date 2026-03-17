const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Get user profile/settings
// @route   GET /api/users/me
// @access  Private
const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            username: user.username,
            role: user.role,
            bio: user.bio,
            profilePicture: user.profilePicture,
            skills: user.skills,
            interests: user.interests,
            availability: user.availability,
            description: user.description,
            mission: user.mission,
            website: user.website,
            socialLinks: user.socialLinks,
            settings: user.settings,
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// @desc    Update user profile/settings
// @route   PATCH /api/users/me
// @access  Private
const updateUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.username = req.body.username || user.username;
        user.bio = req.body.bio || user.bio;
        user.profilePicture = req.body.profilePicture || user.profilePicture;

        // Settings update
        if (req.body.settings) {
            user.settings = {
                ...user.settings,
                ...req.body.settings
            };
        }

        // Volunteer info
        if (user.role === 'volunteer') {
            user.skills = req.body.skills || user.skills;
            user.interests = req.body.interests || user.interests;
            user.availability = req.body.availability || user.availability;
        }

        // Organization info
        if (user.role === 'organization') {
            user.description = req.body.description || user.description;
            user.mission = req.body.mission || user.mission;
            user.website = req.body.website || user.website;
            user.socialLinks = req.body.socialLinks || user.socialLinks;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            username: updatedUser.username,
            role: updatedUser.role,
            settings: updatedUser.settings,
            message: 'Profile updated successfully'
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// @desc    Change password
// @route   POST /api/users/security/password
// @access  Private
const changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);

    if (user && (await user.matchPassword(currentPassword))) {
        user.password = newPassword;
        await user.save();
        res.json({ message: 'Password updated successfully' });
    } else {
        res.status(401).json({ message: 'Invalid current password' });
    }
};

// @desc    Register user (for testing/demo)
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
        name,
        email,
        password,
        role: role || 'volunteer'
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};

module.exports = {
    getUserProfile,
    updateUserProfile,
    changePassword,
    registerUser,
    loginUser
};
