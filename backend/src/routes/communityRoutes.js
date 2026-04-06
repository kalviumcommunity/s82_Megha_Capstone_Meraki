const express = require('express');
const router = express.Router();
const {
    getPosts,
    createPost,
    likePost,
    addComment,
    updatePost,
    deletePost
} = require('../controllers/communityController');
const { protect } = require('../middleware/auth');

router.route('/')
    .get(getPosts)
    .post(protect, createPost);

router.route('/:id')
    .put(protect, updatePost)
    .delete(protect, deletePost);

router.post('/:id/like', protect, likePost);
router.post('/:id/comment', protect, addComment);

module.exports = router;
