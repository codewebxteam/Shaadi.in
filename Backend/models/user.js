const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  
  // Naya field profile setup track karne ke liye
  isProfileComplete: { type: Boolean, default: false },
  
  // Future mein aap FinalProfile wale fields yahan add kar sakte hain:
  // gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  // dob: { type: Date },
  // city: { type: String },

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);