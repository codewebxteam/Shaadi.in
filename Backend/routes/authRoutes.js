const express = require('express');
const router = express.Router();
const multer = require('multer'); 

// 🔥 Saare naye controllers ko import kiya (Notifications wale bhi add kar diye)
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
    unlikeProfile,
    getNotifications,           // Naya add hua
    markAllNotificationsRead,   // Naya add hua
    markNotificationRead        // Naya add hua
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

// 2. Page load hote hi existing profile data mangwane ke liye
router.get('/profile', protect, getUserProfile);

// 3. Profile ko edit karke wapas save karne ke liye
router.put('/update-profile', protect, upload.any(), updateUserProfile);

// 4. Account ko hamesha ke liye delete karne ke liye
router.delete('/delete-account', protect, deleteAccount);

// 5. Password change karne ke liye
router.put('/change-password', protect, changePassword);

// ==========================================
// 🔒 Dashboard & Matches Routes
// ==========================================
router.get('/all-users', protect, getAllUsers);
router.post('/like-profile', protect, likeProfile);
router.post('/unlike-profile', protect, unlikeProfile);

// ==========================================
// 🔥 NAYA CODE: Notifications Routes (Taki Frontend JSON error na de)
// ==========================================
router.get('/notifications', protect, getNotifications);
router.put('/notifications/read-all', protect, markAllNotificationsRead);
router.put('/notifications/:id/read', protect, markNotificationRead);

module.exports = router;