const express = require('express');
const router = express.Router();
const {
    getPosts,
    createPost,
    likePost,
    addComment
} = require('../controllers/communityController');
const { protect } = require('../middleware/auth');

router.route('/')
    .get(getPosts)
    .post(protect, createPost);

router.post('/:id/like', protect, likePost);
router.post('/:id/comment', protect, addComment);

module.exports = router;
