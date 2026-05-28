const express = require('express');
const router = express.Router();
const multer = require('multer'); 

// 🔥 Naye controllers (getUserProfile, updateUserProfile) ko import kiya
const { 
    sendOtp, 
    verifyOtp, 
    register, 
    login, 
    setupProfile, 
    getUserProfile, 
    updateUserProfile 
} = require('../controllers/authController');

const { protect } = require('../middlewares/authMiddleware');

// 🔥 Multer Configuration (Direct memory mein rakhega ImageKit pe bhejne ke liye)
const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// ==========================================
// 🔓 Public Routes (Bina login ke chalenge)
// ==========================================
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/register', register);
router.post('/login', login);

// ==========================================
// 🔒 Protected Routes (Sirf login hone ke baad chalenge)
// ==========================================

// 1. Pehli baar profile setup karne ke liye
router.put('/setup-profile', protect, upload.single('profileImage'), setupProfile);

// 🔥 2. NAYA CODE: Page load hote hi existing profile data mangwane ke liye
router.get('/profile', protect, getUserProfile);

// 🔥 3. NAYA CODE: Profile ko edit karke wapas save karne ke liye
router.put('/update-profile', protect, upload.single('profileImage'), updateUserProfile);

module.exports = router;