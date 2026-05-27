const express = require('express');
const router = express.Router();
const multer = require('multer'); // 🔥 Multer import kiya image handle karne ke liye
const { sendOtp, verifyOtp, register, login, setupProfile } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');

// 🔥 Multer Configuration (Direct memory mein rakhega ImageKit pe bhejne ke liye)
const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Public Routes (Bina login ke chalenge)
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/register', register);
router.post('/login', login);

// Protected Route (Sirf login hone ke baad chalega)
// 🔥 NAYA CODE: upload.single('profileImage') laga diya taaki image process ho sake
router.put('/setup-profile', protect, upload.single('profileImage'), setupProfile);

module.exports = router;