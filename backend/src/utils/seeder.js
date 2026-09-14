const mongoose = require('mongoose');
const User = require('../models/User');
const Opportunity = require('../models/Opportunity');
const Post = require('../models/Post');
const Event = require('../models/Event');
const Course = require('../models/Course');

const seedData = async () => {
    try {
        console.log('🌱 Starting database seeding...');

        // Clear existing collections
        await User.deleteMany({});
        await Opportunity.deleteMany({});
        await Post.deleteMany({});
        await Event.deleteMany({});
        await Course.deleteMany({});

        // 1. Create Demo Users
        const volunteer = await User.create({
            name: 'Sarah Volunteer',
            email: 'volunteer@meraki.org',
            password: 'password123',
            username: 'sarah_v',
            role: 'volunteer',
            bio: 'Passionate about environmental sustainability and community youth empowerment.',
            skills: ['Teaching', 'Gardening', 'Event Planning'],
            interests: ['Environment', 'Education', 'Animal Welfare'],
            availability: 'Weekends & Evenings',
        });

        const org = await User.create({
            name: 'Green Earth Foundation',
            email: 'org@meraki.org',
            password: 'password123',
            username: 'green_earth',
            role: 'organization',
            description: 'Dedicated to fostering urban agriculture, reforestation, and ecological education.',
            mission: 'Empowering communities through sustainable green spaces.',
            website: 'https://greenearthfoundation.org',
            socialLinks: {
                linkedin: 'https://linkedin.com/company/greenearth',
                twitter: 'https://twitter.com/greenearth'
            }
        });

        console.log('✅ Demo Users created:');
        console.log('   - Volunteer: volunteer@meraki.org / password123');
        console.log('   - Organization: org@meraki.org / password123');

        // 2. Create Sample Opportunities
        const opp1 = await Opportunity.create({
            title: 'Urban Community Garden Initiative',
            organization: org._id,
            organizationName: org.name,
            description: 'Help build sustainable community gardens and teach urban farming techniques to local youth and families.',
            location: 'San Francisco, CA',
            type: 'On-site',
            category: 'Environment',
            skillsRequired: ['Gardening', 'Community Outreach', 'Teaching'],
            impactArea: 'Feeds 200+ families annually with organic produce',
            hoursPerWeek: 10,
            spotsAvailable: 15,
            status: 'Open',
            applicants: [{ user: volunteer._id, status: 'Accepted' }]
        });

        const opp2 = await Opportunity.create({
            title: 'Digital Literacy & Coding Mentor',
            organization: org._id,
            organizationName: 'Future Tech Non-Profit',
            description: 'Provide remote mentorship to high school students learning introductory web development and computer science.',
            location: 'Remote',
            type: 'Remote',
            category: 'Education',
            skillsRequired: ['JavaScript', 'HTML/CSS', 'Mentoring'],
            impactArea: 'Prepares 50+ students for tech careers',
            hoursPerWeek: 5,
            spotsAvailable: 10,
            status: 'Open',
            applicants: []
        });

        console.log(`✅ ${2} Opportunities created.`);

        // 3. Create Sample Posts
        await Post.create({
            user: volunteer._id,
            authorName: volunteer.name,
            content: 'Just finished our first weekend planting session at the Urban Garden! 🌿 It was incredible to see so many families working together.',
            tags: ['#Environment', '#CommunityAction', '#Volunteering'],
            category: 'Updates',
            likes: [org._id],
            comments: [{
                user: org._id,
                authorName: org.name,
                content: 'Thank you for your fantastic dedication, Sarah! We appreciate your support.'
            }]
        });

        await Post.create({
            user: org._id,
            authorName: org.name,
            content: '🚀 We are excited to announce 15 new volunteer slots for our upcoming Reforestation Drive next month! Join us in planting 1,000 native trees.',
            tags: ['#Reforestation', '#ClimateAction'],
            category: 'Announcements',
            likes: [volunteer._id]
        });

        console.log(`✅ ${2} Community Feed Posts created.`);

        // 4. Create Sample Events & Courses
        await Event.create({
            title: 'Sustainability & Community Action Summit 2026',
            organizer: org._id,
            organizerName: org.name,
            description: 'Join industry experts, community leaders, and active volunteers for a day of inspiring workshops on urban greening.',
            date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2 weeks from now
            location: 'San Francisco Civic Center & Online Stream',
            type: 'Workshop',
            category: 'Environment',
            capacity: 200,
            attendees: [volunteer._id],
            tags: ['#Sustainability', '#Leadership']
        });

        await Course.create({
            title: 'Community Leadership & Volunteer Management',
            instructor: org._id,
            instructorName: org.name,
            description: 'Learn fundamental strategies for organizing impactful non-profit projects, mobilizing volunteers, and tracking outcomes.',
            duration: '4 Weeks',
            level: 'Beginner',
            category: 'Leadership',
            enrolledUsers: [volunteer._id]
        });

        console.log('✅ Events & Courses created.');
        console.log('🎉 Database Seeding Completed Successfully!');
    } catch (error) {
        console.error('❌ Seeding Error:', error);
    }
};

module.exports = seedData;
