const express = require('express');
const router = express.Router();
const multer = require('multer'); 

// 🔥 Naye controllers ko import kiya
const { 
    sendOtp, 
    verifyOtp, 
    register, 
    login, 
    setupProfile, 
    getUserProfile, 
    updateUserProfile,
    deleteAccount,
    changePassword, 
    getAllUsers,    
    likeProfile,    
    unlikeProfile   
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
router.put('/update-profile', protect, upload.any(), updateUserProfile);

// 🔥 4. NAYA CODE: Account ko hamesha ke liye delete karne ke liye
router.delete('/delete-account', protect, deleteAccount);

// 🔥 5. NAYA CODE: Password change karne ke liye (Error fixed here)
router.put('/change-password', protect, changePassword);

// ==========================================
// 🔒 Dashboard & Matches Routes
// ==========================================
router.get('/all-users', protect, getAllUsers);
router.post('/like-profile', protect, likeProfile);
router.post('/unlike-profile', protect, unlikeProfile);

module.exports = router;