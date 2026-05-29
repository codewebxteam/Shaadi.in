const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // ==========================================
  // 1. REGISTER WALE FIELDS (Jo pehle se the)
  // ==========================================
  name: { type: String },
  email: { type: String },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  isProfileComplete: { type: Boolean, default: false },

  profileFor: { type: String },
  fullName: { type: String },
  gender: { type: String },
  fatherName: { type: String },
  dob: { type: Date },
  age: { type: Number },
  maritalStatus: { type: String },
  height: { type: String },
  weight: { type: Number },
  complexion: { type: String },
  state: { type: String },
  district: { type: String },
  cityVillage: { type: String },
  pincode: { type: String },
  religion: { type: String },
  caste: { type: String },
  category: { type: String },
  occupation: { type: String },
  income: { type: String },
  familyMembers: { type: Number },
  siblingCount: { type: Number },
  siblings: [{
      name: { type: String },
      maritalStatus: { type: String }
  }],
  profileImage: { type: String }, 
  isProfileComplete: { type: Boolean, default: false }

}, { timestamps: true }); // timestamps se createdAt aur updatedAt apne aap ban jayega

module.exports = mongoose.model('User', userSchema);