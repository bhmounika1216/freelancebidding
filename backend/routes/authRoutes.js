/*
const express = require('express');
const { registerUser, loginUser, updateUserProfile, getProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateUserProfile);

module.exports = router;
jhgyb
const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe } = require('../controllers/authController');
const { requireAuth } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', requireAuth, getMe);

module.exports = router;
*/
const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require('../controllers/authController');
const { requireAuth } = require('../middleware/authMiddleware');

// Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', requireAuth, getUserProfile);

module.exports = router;
