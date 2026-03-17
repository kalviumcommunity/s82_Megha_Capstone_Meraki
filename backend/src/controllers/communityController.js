const Post = require('../models/Post');

// @desc    Get all posts (Feed)
// @route   GET /api/community
// @access  Public
const getPosts = async (req, res) => {
    try {
        const posts = await Post.find({})
            .sort({ createdAt: -1 })
            .populate('user', 'name profilePicture role');
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a post
// @route   POST /api/community
// @access  Private
const createPost = async (req, res) => {
    try {
        const { content, image, tags } = req.body;

        const post = new Post({
            user: req.user._id,
            authorName: req.user.name,
            content,
            image,
            tags
        });

        const createdPost = await post.save();
        res.status(201).json(createdPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Like a post
// @route   POST /api/community/:id/like
// @access  Private
const likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const isLiked = post.likes.includes(req.user._id);

        if (isLiked) {
            // Unlike
            post.likes = post.likes.filter(id => id.toString() !== req.user._id.toString());
        } else {
            // Like
            post.likes.push(req.user._id);
        }

        await post.save();
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Comment on a post
// @route   POST /api/community/:id/comment
// @access  Private
const addComment = async (req, res) => {
    try {
        const { content } = req.body;
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const comment = {
            user: req.user._id,
            authorName: req.user.name,
            content
        };

        post.comments.push(comment);
        await post.save();

        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getPosts,
    createPost,
    likePost,
    addComment
};
