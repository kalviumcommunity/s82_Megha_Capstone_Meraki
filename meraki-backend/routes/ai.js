const express = require('express');
const router = express.Router();
const { dynamicPrompt } = require('../controllers/aiController');

// Zero-shot route (optional)
router.post('/zeroshot', dynamicPrompt);  

// Dynamic prompt route
router.post('/dynamic-prompt', dynamicPrompt);

module.exports = router;
