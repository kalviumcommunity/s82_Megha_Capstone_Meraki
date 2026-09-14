const Message = require('../models/Message');
const User = require('../models/User');

// @desc    Get messages between logged-in user and another user
// @route   GET /api/messages/:userId
// @access  Private
const getMessages = async (req, res) => {
    try {
        const { userId } = req.params;
        const messages = await Message.find({
            $or: [
                { sender: req.user._id, recipient: userId },
                { sender: userId, recipient: req.user._id }
            ]
        }).sort({ createdAt: 1 });

        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Send a message
// @route   POST /api/messages
// @access  Private
const sendMessage = async (req, res) => {
    try {
        const { recipientId, content } = req.body;

        if (!recipientId || !content) {
            return res.status(400).json({ message: 'Recipient and content are required' });
        }

        const message = new Message({
            sender: req.user._id,
            recipient: recipientId,
            content
        });

        const createdMessage = await message.save();
        res.status(201).json(createdMessage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get active conversations for logged-in user
// @route   GET /api/messages/conversations
// @access  Private
const getConversations = async (req, res) => {
    try {
        const messages = await Message.find({
            $or: [{ sender: req.user._id }, { recipient: req.user._id }]
        }).populate('sender recipient', 'name profilePicture role');

        const userMap = new Map();
        messages.forEach(msg => {
            const otherUser = msg.sender._id.toString() === req.user._id.toString() ? msg.recipient : msg.sender;
            if (otherUser && !userMap.has(otherUser._id.toString())) {
                userMap.set(otherUser._id.toString(), {
                    user: otherUser,
                    lastMessage: msg.content,
                    updatedAt: msg.createdAt
                });
            }
        });

        res.json(Array.from(userMap.values()));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getMessages,
    sendMessage,
    getConversations
};
