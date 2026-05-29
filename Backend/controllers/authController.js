const User = require('../models/user');
const Otp = require('../models/Otp');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ImageKit = require("imagekit");

// 🔥 ImageKit Configuration
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

// Token Generate karne ka function
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// 1. Send OTP Logic
exports.sendOtp = async (req, res) => {
  try {
    const { phone } = req.body;
    return res.status(200).json({ success: true, message: 'Universal Bypass Active: OTP sent successfully (Use 000000)' });
    
    // (Bypass logic active hone ki wajah se yahan ka code reach nahi hoga, but structure waisa hi rakha hai)
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    await Otp.deleteMany({ phone });
    await Otp.create({ phone, otp: generatedOtp });
    console.log(`WhatsApp OTP sent to ${phone}: ${generatedOtp}`);
    res.status(200).json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 2. Verify OTP Logic
exports.verifyOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;
    if (otp === '000000') {
      return res.status(200).json({ success: true, message: 'Universal Bypass OTP Verified' });
    }

    const validOtp = await Otp.findOne({ phone, otp });
    if (!validOtp) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
    }

    await Otp.deleteMany({ phone });
    res.status(200).json({ success: true, message: 'OTP Verified Successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3. Register Final Account Logic
exports.register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const userExists = await User.findOne({ phone });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists with this phone number' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      isVerified: true,
      isProfileComplete: false 
    });

    res.status(201).json({
      success: true,
      user: { 
        id: user._id, 
        name: user.name, 
        phone: user.phone,
        isProfileComplete: user.isProfileComplete 
      },
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 4. Login Logic
exports.login = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid phone number or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid phone number or password' });
    }

    res.status(200).json({
      success: true,
      user: { 
        id: user._id, 
        name: user.name, 
        phone: user.phone,
        profileImage: user.profileImage, 
        isProfileComplete: user.isProfileComplete 
      },
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 5. Setup Profile Logic with ImageKit (Initial Setup)
exports.setupProfile = async (req, res) => {
  try {
    const userId = req.user.id; 
    let profileData = { ...req.body };
    
    // 🔥 FIX FOR CAST TO STRING ERROR: Remove arrays coming from frontend
    delete profileData.profileImage;
    delete profileData.profileImages;

    let profileImageUrl = "";

    if (profileData.siblings && typeof profileData.siblings === 'string') {
      try {
        profileData.siblings = JSON.parse(profileData.siblings);
      } catch (err) {
        console.error("Error parsing siblings array:", err);
      }
    }

    if (req.file) {
      const uploadResponse = await imagekit.upload({
        file: req.file.buffer.toString("base64"), 
        fileName: `profile_${userId}_${Date.now()}.jpg`, 
        folder: "/LocalShaadi_Profiles", 
      });
      profileImageUrl = uploadResponse.url; 
    }

    const updatePayload = {
      ...profileData,
      isProfileComplete: true 
    };

    if (profileImageUrl) {
      updatePayload.profileImage = String(profileImageUrl);
      updatePayload.profileImages = [String(profileImageUrl)];
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updatePayload }, // Using $set to avoid overwriting issues
      { new: true, runValidators: true } 
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Profile setup completed successfully',
      user: { 
        id: updatedUser._id, 
        name: updatedUser.name, 
        profileImage: updatedUser.profileImage,
        isProfileComplete: updatedUser.isProfileComplete 
      }
    });

  } catch (error) {
    console.error("Profile Setup Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// =====================================================================
// 6. Get User Profile (Page load hote hi data bhejne ke liye)
// =====================================================================
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error in getUserProfile:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// =====================================================================
// 7. Update User Profile (UPDATED FOR MULTIPLE IMAGES)
// =====================================================================
exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    let updateData = { ...req.body };

    // 🔥 FIX FOR CAST TO STRING ERROR: Remove arrays coming from frontend
    delete updateData.profileImage;
    delete updateData.profileImages;

    // 1. Parse siblings
    if (updateData.siblings && typeof updateData.siblings === 'string') {
      try {
        updateData.siblings = JSON.parse(updateData.siblings);
      } catch (err) {
        console.error("Error parsing siblings array:", err);
      }
    }

    // 2. Existing images ko parse karo jo frontend ne bheji hain
    let existingImages = [];
    if (req.body.existingImages && typeof req.body.existingImages === 'string') {
      try {
        existingImages = JSON.parse(req.body.existingImages);
      } catch (err) {
        console.error("Error parsing existing images array:", err);
      }
    }

    // 3. Upload new photos
    let uploadedImageUrls = [];
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map((file) => {
        return imagekit.upload({
          file: file.buffer.toString("base64"),
          fileName: `profile_${userId}_${Date.now()}_${Math.random().toString(36).substring(7)}.jpg`,
          folder: "/LocalShaadi_Profiles",
        });
      });
      
      const uploadResults = await Promise.all(uploadPromises);
      uploadedImageUrls = uploadResults.map(result => result.url);
    }

    // 4. Combine karo dono images ko aur Max 5 limit lagao
    updateData.profileImages = [...existingImages, ...uploadedImageUrls].slice(0, 5);

    // 5. Purana system break na ho isliye primary image explicitly set kardo
    if (updateData.profileImages.length > 0) {
      updateData.profileImage = String(updateData.profileImages[0]);
    } else {
      updateData.profileImage = ""; // Sab delete kar diye gaye
    }

    // DB mein user ko find karo aur update karo
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ 
      success: true, 
      message: "Profile updated successfully",
      user: updatedUser 
    });
  } catch (error) {
    console.error("Error in updateUserProfile:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// =====================================================================
// 8. DELETE ACCOUNT CONTROLLER
// =====================================================================
exports.deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, message: "Account deleted successfully" });
  } catch (error) {
    console.error("Error in deleteAccount:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// =====================================================================
// 9. CHANGE PASSWORD CONTROLLER
// =====================================================================
exports.changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Incorrect current password" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error("Change Password Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// =====================================================================
// 10. DASHBOARD & MATCHES CONTROLLERS
// =====================================================================

// Get All Users (For Dashboard matches)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user.id } }).select("-password");
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Like Profile
exports.likeProfile = async (req, res) => {
  try {
    const { likedUserId } = req.body;
    res.status(200).json({ success: true, message: "Profile liked successfully" });
  } catch (error) {
    console.error("Error liking profile:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Unlike Profile
exports.unlikeProfile = async (req, res) => {
  try {
    const { unlikedUserId } = req.body;
    res.status(200).json({ success: true, message: "Profile unliked successfully" });
  } catch (error) {
    console.error("Error unliking profile:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};