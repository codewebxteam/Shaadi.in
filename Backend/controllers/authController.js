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

    // 🔥 UNIVERSAL BYPASS LOGIC FOR TESTING
    return res.status(200).json({ success: true, message: 'Universal Bypass Active: OTP sent successfully (Use 000000)' });

    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    await Otp.deleteMany({ phone });
    await Otp.create({ phone, otp: generatedOtp });

    // 🔥 TODO: WhatsApp API Code
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

    // 🔥 UNIVERSAL BYPASS LOGIC FOR TESTING
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
        profileImage: user.profileImage, // Login ke time pe image bhi bhej do
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
        file: req.file.buffer, 
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
      updatePayload.profileImage = profileImageUrl;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updatePayload,
      { new: true } 
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
// 🔥 NAYA CODE: 6. Get User Profile (Page load hote hi data bhejne ke liye)
// =====================================================================
exports.getUserProfile = async (req, res) => {
  try {
    // req.user.id hume 'protect' middleware se mil jayega
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
// 🔥 NAYA CODE: 7. Update User Profile (Edit karke save karne ke liye)
// =====================================================================
exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    let updateData = { ...req.body };

    // Frontend se siblings array string format me aati hai, usko wapas JSON/Array banana padega
    if (updateData.siblings && typeof updateData.siblings === 'string') {
      try {
        updateData.siblings = JSON.parse(updateData.siblings);
      } catch (err) {
        console.error("Error parsing siblings array:", err);
      }
    }

    // Agar user ne edit karte time nayi photo bhi daali hai
    if (req.file) {
      const uploadResponse = await imagekit.upload({
        file: req.file.buffer,
        fileName: `profile_${userId}_${Date.now()}.jpg`,
        folder: "/LocalShaadi_Profiles",
      });
      updateData.profileImage = uploadResponse.url;
    }

    // DB mein user ko find karo aur update karo
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true } // new:true return karta hai updated document
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