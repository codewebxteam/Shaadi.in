const User = require('../models/User');
const Otp = require('../models/Otp');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Token Generate karne ka function
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// 1. Send OTP Logic
exports.sendOtp = async (req, res) => {
  try {
    const { phone } = req.body;

    // 🔥 UNIVERSAL BYPASS LOGIC FOR TESTING
    // Ab koi bhi number aayega toh ye pehle hi success bhej dega 
    // (Jab live karna ho toh isko hata dena ya comment kar dena)
    return res.status(200).json({ success: true, message: 'Universal Bypass Active: OTP sent successfully (Use 000000)' });

    // Generate 6-digit random OTP
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

    // Pehle ka koi OTP ho toh delete kardo
    await Otp.deleteMany({ phone });

    // DB mein naya OTP save karo
    await Otp.create({ phone, otp: generatedOtp });

    // 🔥 TODO: Yahan par WhatsApp API ka code aayega OTP bhejne ke liye
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
    // Agar user ne OTP '000000' daala hai, toh kisi bhi number par verify ho jayega
    if (otp === '000000') {
      return res.status(200).json({ success: true, message: 'Universal Bypass OTP Verified' });
    }

    // Check OTP in DB
    const validOtp = await Otp.findOne({ phone, otp });
    if (!validOtp) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
    }

    // OTP verify hone ke baad delete kardo
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

    // Check if user already exists
    const userExists = await User.findOne({ phone });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists with this phone number' });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create User
    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      isVerified: true
    });

    res.status(201).json({
      success: true,
      user: { id: user._id, name: user.name, phone: user.phone },
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

    // Check User exists
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid phone number or password' });
    }

    // Check Password match
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid phone number or password' });
    }

    res.status(200).json({
      success: true,
      user: { id: user._id, name: user.name, phone: user.phone },
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};