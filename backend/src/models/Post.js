const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    authorName: { type: String, required: true },
    content: { type: String, required: true },
    image: String,
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        authorName: { type: String, required: true },
        content: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
    }],
    tags: [String],
    category: { type: String, default: 'General' }
}, {
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
