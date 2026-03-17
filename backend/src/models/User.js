const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, unique: true },
    role: { type: String, enum: ['volunteer', 'organization'], default: 'volunteer' },
    bio: String,
    profilePicture: String,
    // Volunteer specific
    skills: [String],
    interests: [String],
    availability: String,
    // Organization specific
    description: String,
    mission: String,
    website: String,
    socialLinks: {
        linkedin: String,
        twitter: String,
        github: String
    },
    // Settings
    settings: {
        theme: { type: String, default: 'light' },
        notifications: {
            email: { type: Boolean, default: true },
            push: { type: Boolean, default: true },
            weeklyDigest: { type: Boolean, default: true }
        },
        privacy: {
            publicProfile: { type: Boolean, default: true },
            showHours: { type: Boolean, default: true },
            allowContact: { type: Boolean, default: true }
        }
    }
}, {
    timestamps: true
});

// Method to match password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Middleware to hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

module.exports = User;
