const jwt = require('jsonwebtoken');
const User = require('../models/user');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // "Bearer <token>" se token nikalna
      token = req.headers.authorization.split(' ')[1];

      // Token verify karna
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // User ka data database se nikalna (password chhod kar)
      req.user = await User.findById(decoded.id).select('-password');

      // 🔥 NAYA CODE: Extra Security Check
      // Agar token sahi hai par user DB se delete ho chuka hai
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Not authorized, user no longer exists' });
      }

      next(); // Sab theek hai, ab next function (setupProfile) par jao
    } catch (error) {
      console.error("JWT Verification Error:", error.message);
      return res.status(401).json({ success: false, message: 'Not authorized, token failed or expired' });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token provided' });
  }
};

module.exports = { protect };