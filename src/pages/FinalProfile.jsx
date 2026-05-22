import React, { useState } from "react";
import {
  User,
  Users,
  Briefcase,
  Heart,
  BookOpen,
  MapPin,
  CheckCircle,
  ShieldCheck,
  Camera,
  ImagePlus,
  X,
  ZoomIn,
  ArrowLeft,
  Search,
  Bell,
  Home,
  Edit3,
  Mail,
  Phone,
  Sparkles,
  Flower2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const FinalProfile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  // Photo aur Crop Modal states
  const [profileImage, setProfileImage] = useState(
    "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  );
  const [tempImage, setTempImage] = useState(null);
  const [showCropModal, setShowCropModal] = useState(false);
  const [imageZoom, setImageZoom] = useState(1);

  // Pre-filled User Data
  const [formData, setFormData] = useState({
    profileFor: "Self",
    fullName: "Rahul Verma",
    fatherName: "Mr. Ramesh Verma",
    dob: "1999-05-15",
    age: "27",
    gender: "Male",
    maritalStatus: "Single",
    height: "5'10\"",
    complexion: "Wheatish",
    state: "Uttar Pradesh",
    district: "Lucknow",
    cityVillage: "Gomti Nagar",
    pincode: "226010",
    religion: "Hindu",
    caste: "Kshatriya",
    category: "General",
    occupation: "Software Engineer",
    income: "5 - 10 Lakhs",
    familyMembers: "4",
    siblingCount: "1",
    siblings: [{ name: "Priya Verma", status: "Single" }],
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileSizeInMB = file.size / 1024 / 1024;
      if (fileSizeInMB > 5) {
        alert("Bhai, image ka size 5MB se kam hona chahiye!");
        e.target.value = "";
        return;
      }
      setTempImage(URL.createObjectURL(file));
      setImageZoom(1);
      setShowCropModal(true);
    }
  };

  const handleSaveCrop = () => {
    setProfileImage(tempImage);
    setShowCropModal(false);
  };

  const handleSiblingCountChange = (e) => {
    const countStr = e.target.value;
    const count = parseInt(countStr) || 0;
    let newSiblings = [...formData.siblings];

    if (count > newSiblings.length) {
      const toAdd = count - newSiblings.length;
      for (let i = 0; i < toAdd; i++) {
        newSiblings.push({ name: "", status: "" });
      }
    } else if (count < newSiblings.length) {
      newSiblings = newSiblings.slice(0, count);
    }

    setFormData({ ...formData, siblingCount: countStr, siblings: newSiblings });
  };

  const handleSiblingDataChange = (index, field, value) => {
    const updatedSiblings = [...formData.siblings];
    updatedSiblings[index][field] = value;
    setFormData({ ...formData, siblings: updatedSiblings });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "pincode") {
      const onlyNums = value.replace(/[^0-9]/g, "");
      if (onlyNums.length <= 6) {
        setFormData({ ...formData, [name]: onlyNums });
      }
      return;
    }

    if (name === "dob") {
      if (value) {
        const birthDate = new Date(value);
        const today = new Date();
        let calculatedAge = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          calculatedAge--;
        }
        setFormData((prev) => ({
          ...prev,
          dob: value,
          age: calculatedAge >= 18 ? calculatedAge : "",
        }));

        if (calculatedAge < 18 && calculatedAge >= 0) {
          alert("Age must be 18 or above.");
        }
      } else {
        setFormData((prev) => ({ ...prev, dob: "", age: "" }));
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile Updated: ", formData);
    alert("Profile details updated successfully!");
    setIsEditing(false);
  };

  const hideScrollbar =
    "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]";

  const inputClass = `px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium outline-none transition-all w-full
    ${isEditing ? "bg-white focus:border-[#e02c5a] focus:ring-2 focus:ring-[#e02c5a]/20 text-gray-800" : "bg-gray-100 text-gray-500 cursor-not-allowed"}`;

  return (
    <div
      className={`min-h-screen bg-gradient-to-b from-[#fff0f5] via-white to-[#ffe4e6] font-sans pb-24 md:pb-20 relative overflow-x-hidden ${hideScrollbar}`}
    >
      {/* ================= MAGICAL ROMANTIC BACKGROUND ================= */}
      <style>{`
        @keyframes gentle-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-gentle {
          animation: gentle-bounce 4s ease-in-out infinite;
        }
      `}</style>

      <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[10%] -right-[5%] w-[400px] h-[400px] rounded-full bg-[#e02c5a]/10 blur-[90px]"></div>
        <div className="absolute top-[40%] -left-[10%] w-[500px] h-[500px] rounded-full bg-[#fbbf24]/10 blur-[90px]"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[300px] h-[300px] rounded-full bg-rose-200/20 blur-[60px]"></div>

        {/* Floating Vibe Icons */}
        <div
          className="absolute top-[15%] left-[5%] opacity-15 animate-gentle"
          style={{ animationDelay: "0s" }}
        >
          <Heart
            size={50}
            fill="#e02c5a"
            color="#e02c5a"
            className="-rotate-12"
          />
        </div>
        <div
          className="absolute top-[60%] right-[8%] opacity-15 animate-gentle"
          style={{ animationDelay: "1s" }}
        >
          <Heart
            size={70}
            fill="#fbbf24"
            color="#fbbf24"
            className="rotate-12"
          />
        </div>
        <div className="absolute top-[30%] right-[15%] opacity-10 animate-pulse">
          <Flower2 size={40} color="#e02c5a" strokeWidth={1.5} />
        </div>
        <div
          className="absolute bottom-[20%] left-[10%] opacity-20 animate-gentle"
          style={{ animationDelay: "2s" }}
        >
          <Sparkles size={35} color="#fbbf24" strokeWidth={1.5} />
        </div>
      </div>

      {/* ================= CROP MODAL ================= */}
      {showCropModal && (
        <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl animate-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800">Adjust Photo</h3>
              <button
                onClick={() => setShowCropModal(false)}
                className="text-gray-400 hover:text-red-500"
              >
                <X size={24} />
              </button>
            </div>
            {/* 🔥 ROUNDED-FULL KI JAGAH ROUNDED-2XL KIYA HAI (SQUARE PROFILE VIBE) */}
            <div className="relative w-64 h-64 mx-auto rounded-2xl overflow-hidden bg-rose-50 border-4 border-dashed border-rose-300 mb-6 flex items-center justify-center shadow-inner">
              <img
                src={tempImage}
                alt="Upload Preview"
                className="w-full h-full object-cover transition-transform duration-100 cursor-move"
                style={{ transform: `scale(${imageZoom})` }}
              />
              <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
            </div>
            <div className="flex items-center gap-3 mb-6 bg-gray-50 p-3 rounded-xl">
              <ZoomIn size={20} className="text-gray-500" />
              <input
                type="range"
                min="1"
                max="3"
                step="0.1"
                value={imageZoom}
                onChange={(e) => setImageZoom(e.target.value)}
                className="w-full accent-[#e02c5a]"
              />
            </div>
            <button
              onClick={handleSaveCrop}
              className="w-full bg-gradient-to-r from-[#ed2c5b] to-[#c0163e] text-white py-3 rounded-xl font-bold shadow-md hover:shadow-lg transition-all"
            >
              Save Picture
            </button>
          </div>
        </div>
      )}

      {/* ================= MOBILE HEADER ================= */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-rose-50/90 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-rose-100">
        <div
          className="flex items-center gap-1.5 cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          {/* Naya Logo Image Mobile */}
          <img
            src="https://ik.imagekit.io/dlolttjjd/Shadi_assets/colourlogotext.webp?updatedAt=1779353927500"
            alt="Local Shaadi Logo"
            className="h-8 w-auto object-contain"
          />
        </div>
        <button
          onClick={() => navigate("/notifications")}
          className="relative focus:outline-none bg-white/50 p-1.5 rounded-full border border-rose-100"
        >
          <Bell size={22} className="text-[#e02c5a]" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-white">
            3
          </span>
        </button>
      </div>

      {/* ================= DESKTOP TOP NAVBAR ================= */}
      <nav className="hidden md:block bg-rose-50/90 backdrop-blur-md border-b border-rose-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            {/* Naya Logo Image Desktop */}
            <img
              src="https://ik.imagekit.io/dlolttjjd/Shadi_assets/colourlogotext.webp?updatedAt=1779353927500"
              alt="Local Shaadi Logo"
              className="h-11 w-auto object-contain"
            />
          </div>
          <div className="flex items-center gap-8 font-bold text-gray-700">
            <button
              onClick={() => navigate("/dashboard")}
              className="hover:text-[#e02c5a] py-7 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => navigate("/matches")}
              className="hover:text-[#e02c5a] py-7 transition-colors"
            >
              Matches
            </button>
            <button
              onClick={() => navigate("/notifications")}
              className="hover:text-[#e02c5a] py-7 transition-colors flex items-center gap-1 relative focus:outline-none"
            >
              Notifications
              <span className="bg-[#e02c5a] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full -mt-3 absolute -right-4 top-5">
                3
              </span>
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative flex items-center">
              <Search size={18} className="absolute left-3 text-[#e02c5a]" />
              <input
                type="text"
                placeholder="Search name, ID..."
                className="pl-10 pr-4 py-2 w-56 bg-white border border-rose-200 rounded-full text-sm focus:outline-none focus:bg-white focus:border-[#e02c5a] focus:ring-2 focus:ring-[#e02c5a]/20 transition-all shadow-sm"
              />
            </div>
            <button className="flex items-center gap-2 bg-gradient-to-r from-[#ed2c5b] to-[#c0163e] text-white px-6 py-2.5 rounded-full font-bold shadow-md hover:shadow-lg transition-all shrink-0">
              <User size={18} />
              <span>My Profile</span>
            </button>
          </div>
        </div>
      </nav>

      {/* ================= FORM CONTAINER ================= */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold text-[#821511] flex items-center gap-2">
              Your Beautiful Profile{" "}
              <Sparkles size={24} className="text-[#fbbf24]" />
            </h1>
            <p className="text-gray-600 mt-1 font-medium">
              Keep your details up to date to find your perfect soulmate.
            </p>
          </div>
          <button
            onClick={() => navigate("/dashboard")}
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-rose-200 rounded-xl text-sm font-bold text-[#e02c5a] hover:bg-rose-50 shadow-sm transition-all"
          >
            <ArrowLeft size={16} /> Back to Dashboard
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 📸 PHOTO UPLOAD SECTION - (4 KONA WALA SQUARE PROFILE) */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-[0_8px_30px_rgba(224,44,90,0.06)] border border-rose-100 p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6 relative">
            <div className="absolute top-4 right-6 bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs font-bold border border-green-200 flex items-center gap-1 shadow-sm">
              <ShieldCheck size={14} /> Profile Verified
            </div>

            {/* 🔥 ROUNDED-FULL KI JAGAH ROUNDED-2XL KIYA HAI AUR SIZE BADA KIYA HAI */}
            <div className="relative group w-36 h-36 shrink-0 rounded-2xl border-4 border-rose-100 bg-rose-50 flex items-center justify-center overflow-hidden shadow-md mt-4 sm:mt-0">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Camera size={40} className="text-[#e02c5a]/40" />
              )}

              {isEditing && (
                <label className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-10 backdrop-blur-sm">
                  <ImagePlus size={28} className="text-white mb-1" />
                  <span className="text-white text-xs font-bold">
                    Change Photo
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              )}
            </div>

            <div className="text-center sm:text-left flex-1 mt-2">
              <h2 className="text-2xl font-bold text-gray-800 mb-1 font-serif">
                Profile Pictures <span className="text-red-500">*</span>
              </h2>
              <p className="text-sm text-gray-500 mb-4 max-w-md font-medium">
                Profiles with clear photos get{" "}
                <span className="text-[#e02c5a] font-bold">
                  10x more responses
                </span>{" "}
                and love.
              </p>

              {isEditing && (
                <label className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#fff0f5] text-[#e02c5a] font-bold rounded-xl border border-[#e02c5a]/30 cursor-pointer hover:bg-[#e02c5a] hover:text-white transition-all shadow-sm">
                  <Camera size={18} /> Upload New Photo
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              )}
            </div>
          </div>

          {/* CARD 1: BASIC DETAILS */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-[0_8px_30px_rgba(224,44,90,0.06)] border border-rose-100 p-6 sm:p-8">
            <h2 className="flex items-center gap-2 text-xl font-bold text-[#821511] mb-6 pb-4 border-b border-rose-100 font-serif">
              <User className="text-[#e02c5a]" size={24} /> Basic Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">
                  Profile For
                </label>
                <select
                  disabled={!isEditing}
                  name="profileFor"
                  value={formData.profileFor}
                  onChange={handleChange}
                  required
                  className={inputClass}
                >
                  <option value="Self">Self</option>
                  <option value="Son">Son</option>
                  <option value="Daughter">Daughter</option>
                  <option value="Brother">Brother</option>
                  <option value="Sister">Sister</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <input
                  disabled={!isEditing}
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">
                  Gender
                </label>
                <select
                  disabled={!isEditing}
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className={inputClass}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div className="grid grid-cols-5 gap-4">
                <div className="col-span-3 flex flex-col">
                  <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">
                    Date of Birth
                  </label>
                  <input
                    disabled={!isEditing}
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>
                <div className="col-span-2 flex flex-col">
                  <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">
                    Age
                  </label>
                  <input
                    type="text"
                    value={formData.age !== "" ? `${formData.age} Yrs` : ""}
                    readOnly
                    className="px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-sm font-bold text-gray-500 outline-none text-center cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">
                  Marital Status
                </label>
                <select
                  disabled={!isEditing}
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleChange}
                  required
                  className={inputClass}
                >
                  <option value="Single">Single (Never Married)</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">
                    Height
                  </label>
                  <select
                    disabled={!isEditing}
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  >
                    <option value="5'4&quot;">5' 4"</option>
                    <option value="5'5&quot;">5' 5"</option>
                    <option value="5'6&quot;">5' 6"</option>
                    <option value="5'8&quot;">5' 8"</option>
                    <option value="5'10&quot;">5' 10"</option>
                    <option value="6'0&quot;">6' 0"</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">
                    Complexion
                  </label>
                  <select
                    disabled={!isEditing}
                    name="complexion"
                    value={formData.complexion}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  >
                    <option value="Very Fair">Very Fair</option>
                    <option value="Fair">Fair</option>
                    <option value="Wheatish">Wheatish</option>
                    <option value="Dark">Dark</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 2: LOCATION DETAILS */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-[0_8px_30px_rgba(224,44,90,0.06)] border border-rose-100 p-6 sm:p-8">
            <h2 className="flex items-center gap-2 text-xl font-bold text-[#821511] mb-6 pb-4 border-b border-rose-100 font-serif">
              <MapPin className="text-[#fbbf24]" size={24} /> Location Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">
                  State
                </label>
                <input
                  disabled={!isEditing}
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">
                  District
                </label>
                <input
                  disabled={!isEditing}
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">
                  City / Village
                </label>
                <input
                  disabled={!isEditing}
                  type="text"
                  name="cityVillage"
                  value={formData.cityVillage}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">
                  Pincode
                </label>
                <input
                  disabled={!isEditing}
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* CARD 3: RELIGION & BACKGROUND */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-[0_8px_30px_rgba(224,44,90,0.06)] border border-rose-100 p-6 sm:p-8">
            <h2 className="flex items-center gap-2 text-xl font-bold text-[#821511] mb-6 pb-4 border-b border-rose-100 font-serif">
              <BookOpen className="text-purple-600" size={24} /> Religious
              Background
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col">
                <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">
                  Religion
                </label>
                <select
                  disabled={!isEditing}
                  name="religion"
                  value={formData.religion}
                  onChange={handleChange}
                  required
                  className={inputClass}
                >
                  <option value="Hindu">Hindu</option>
                  <option value="Muslim">Muslim</option>
                  <option value="Sikh">Sikh</option>
                  <option value="Christian">Christian</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">
                  Caste
                </label>
                <input
                  disabled={!isEditing}
                  type="text"
                  name="caste"
                  value={formData.caste}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">
                  Category
                </label>
                <select
                  disabled={!isEditing}
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="General">General</option>
                  <option value="OBC">OBC</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                </select>
              </div>
            </div>
          </div>

          {/* CARD 4: CAREER & FAMILY */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-[0_8px_30px_rgba(224,44,90,0.06)] border border-rose-100 p-6 sm:p-8">
            <h2 className="flex items-center gap-2 text-xl font-bold text-[#821511] mb-6 pb-4 border-b border-rose-100 font-serif">
              <Briefcase className="text-blue-500" size={24} /> Career & Family
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col">
                <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">
                  Father's Name
                </label>
                <input
                  disabled={!isEditing}
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">
                  Occupation
                </label>
                <select
                  disabled={!isEditing}
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  required
                  className={inputClass}
                >
                  <option value="Private Job">Private Job</option>
                  <option value="Government Job">Government Job</option>
                  <option value="Software Engineer">Software Engineer</option>
                  <option value="Business">Business</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">
                  Annual Income
                </label>
                <select
                  disabled={!isEditing}
                  name="income"
                  value={formData.income}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="0 - 2 Lakhs">0 - 2 Lakhs</option>
                  <option value="2 - 5 Lakhs">2 - 5 Lakhs</option>
                  <option value="5 - 10 Lakhs">5 - 10 Lakhs</option>
                  <option value="10 - 20 Lakhs">10 - 20 Lakhs</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">
                  Total Family Members
                </label>
                <input
                  disabled={!isEditing}
                  type="number"
                  name="familyMembers"
                  value={formData.familyMembers}
                  onChange={handleChange}
                  min="1"
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">
                  Number of Siblings
                </label>
                <select
                  disabled={!isEditing}
                  name="siblingCount"
                  value={formData.siblingCount}
                  onChange={handleSiblingCountChange}
                  className={inputClass}
                >
                  <option value="0">None</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>

              {/* DYNAMIC SIBLINGS SECTION */}
              {formData.siblings.length > 0 && (
                <div className="col-span-1 md:col-span-3 mt-4 bg-rose-50/50 border border-rose-100 rounded-2xl p-6 shadow-inner">
                  <h3 className="text-[#821511] font-bold mb-5 flex items-center gap-2">
                    <Users size={20} className="text-[#e02c5a]" /> Sibling
                    Details
                  </h3>
                  <div className="space-y-4">
                    {formData.siblings.map((sibling, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-white p-5 rounded-xl border border-rose-100 shadow-sm relative"
                      >
                        <div className="absolute top-0 left-0 bg-gradient-to-r from-[#ed2c5b] to-[#c0163e] text-white text-[10px] font-bold px-3 py-1 rounded-br-lg rounded-tl-xl">
                          Sibling #{index + 1}
                        </div>
                        <div className="flex flex-col pt-3 md:pt-0">
                          <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">
                            Sibling Name
                          </label>
                          <input
                            disabled={!isEditing}
                            type="text"
                            value={sibling.name}
                            onChange={(e) =>
                              handleSiblingDataChange(
                                index,
                                "name",
                                e.target.value,
                              )
                            }
                            className={inputClass}
                          />
                        </div>
                        <div className="flex flex-col pt-2 md:pt-0">
                          <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">
                            Marital Status
                          </label>
                          <select
                            disabled={!isEditing}
                            value={sibling.status}
                            onChange={(e) =>
                              handleSiblingDataChange(
                                index,
                                "status",
                                e.target.value,
                              )
                            }
                            className={inputClass}
                          >
                            <option value="">Select Status</option>
                            <option value="Single">Single</option>
                            <option value="Married">Married</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ================= BUTTON CONTROLS ================= */}
          <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 pb-8 border-t border-rose-100">
            {!isEditing ? (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setIsEditing(true);
                }}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#ed2c5b] to-[#c0163e] hover:shadow-lg hover:-translate-y-1 text-white px-12 py-4 rounded-2xl font-bold shadow-md transition-all text-center w-full sm:w-auto text-lg"
              >
                <Edit3 size={20} /> Edit Profile Details
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-10 py-4 rounded-2xl font-bold text-gray-600 bg-white border-2 border-gray-200 hover:bg-gray-50 transition-all text-center w-full sm:w-auto"
                >
                  Discard Changes
                </button>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#ed2c5b] to-[#c0163e] hover:shadow-lg hover:-translate-y-1 text-white px-12 py-4 rounded-2xl font-bold shadow-md transition-all text-center w-full sm:w-auto text-lg"
                >
                  <CheckCircle size={20} /> Save All Updates
                </button>
              </>
            )}
          </div>
        </form>
      </div>

      {/* ================= ADDED PREMIUM FOOTER HERE ================= */}
      <footer className="bg-white/90 backdrop-blur-md border-t border-rose-100 pt-16 pb-8 mt-10 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12">
            {/* Column 1: Brand & Description */}
            <div className="flex flex-col items-start">
              <a
                href="/"
                className="relative flex flex-col items-start decoration-transparent mb-5 mt-2"
              >
                <img
                  src="https://ik.imagekit.io/dlolttjjd/Shadi_assets/colourlogotext.webp?updatedAt=1779353927500"
                  alt="Local Shaadi Logo"
                  className="h-10 md:h-12 w-auto object-contain"
                />
              </a>
              <p className="text-gray-600 text-sm leading-relaxed mb-6 font-medium">
                Trusted by millions. Because every beautiful journey begins with
                the right choice. Find your perfect partner from your own
                community and culture.
              </p>

              {/* Social Media Icons */}
              <div className="flex items-center gap-3">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#fff0f5] text-[#e02c5a] flex items-center justify-center hover:bg-[#e02c5a] hover:text-white hover:-translate-y-1 transition-all duration-300"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#fff0f5] text-[#e02c5a] flex items-center justify-center hover:bg-[#e02c5a] hover:text-white hover:-translate-y-1 transition-all duration-300"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#fff0f5] text-[#e02c5a] flex items-center justify-center hover:bg-[#e02c5a] hover:text-white hover:-translate-y-1 transition-all duration-300"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h3 className="text-[#821511] font-bold text-lg mb-5 font-serif">
                Quick Links
              </h3>
              <ul className="flex flex-col gap-3.5">
                <li>
                  <a
                    href="/about"
                    className="text-gray-600 hover:text-[#e02c5a] text-sm font-medium transition-colors flex items-center gap-2"
                  >
                    <span className="text-[#e02c5a]/50 text-xs">▸</span> About
                    Us
                  </a>
                </li>
                <li>
                  <a
                    href="/search"
                    className="text-gray-600 hover:text-[#e02c5a] text-sm font-medium transition-colors flex items-center gap-2"
                  >
                    <span className="text-[#e02c5a]/50 text-xs">▸</span> Find
                    Matches
                  </a>
                </li>
                <li>
                  <a
                    href="/plans"
                    className="text-gray-600 hover:text-[#e02c5a] text-sm font-medium transition-colors flex items-center gap-2"
                  >
                    <span className="text-[#e02c5a]/50 text-xs">▸</span> Premium
                    Plans
                  </a>
                </li>
                <li>
                  <a
                    href="/stories"
                    className="text-gray-600 hover:text-[#e02c5a] text-sm font-medium transition-colors flex items-center gap-2"
                  >
                    <span className="text-[#e02c5a]/50 text-xs">▸</span> Success
                    Stories
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Support */}
            <div>
              <h3 className="text-[#821511] font-bold text-lg mb-5 font-serif">
                Support
              </h3>
              <ul className="flex flex-col gap-3.5">
                <li>
                  <a
                    href="/help"
                    className="text-gray-600 hover:text-[#e02c5a] text-sm font-medium transition-colors flex items-center gap-2"
                  >
                    <span className="text-[#e02c5a]/50 text-xs">▸</span> Help
                    Center
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="text-gray-600 hover:text-[#e02c5a] text-sm font-medium transition-colors flex items-center gap-2"
                  >
                    <span className="text-[#e02c5a]/50 text-xs">▸</span> Contact
                    Us
                  </a>
                </li>
                <li>
                  <a
                    href="/privacy"
                    className="text-gray-600 hover:text-[#e02c5a] text-sm font-medium transition-colors flex items-center gap-2"
                  >
                    <span className="text-[#e02c5a]/50 text-xs">▸</span> Privacy
                    Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/terms"
                    className="text-gray-600 hover:text-[#e02c5a] text-sm font-medium transition-colors flex items-center gap-2"
                  >
                    <span className="text-[#e02c5a]/50 text-xs">▸</span> Terms
                    of Service
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact Info */}
            <div>
              <h3 className="text-[#821511] font-bold text-lg mb-5 font-serif">
                Contact Us
              </h3>
              <ul className="flex flex-col gap-4">
                <li className="flex items-start gap-3 group">
                  <div className="bg-[#fff0f5] p-2 rounded-lg group-hover:bg-[#e02c5a] transition-colors duration-300 shrink-0">
                    <MapPin
                      size={16}
                      className="text-[#e02c5a] group-hover:text-white transition-colors duration-300"
                    />
                  </div>
                  <span className="text-gray-600 text-sm font-medium mt-1 leading-snug">
                    Sant Kabir Nagar, Uttar Pradesh, India
                  </span>
                </li>
                <li className="flex items-center gap-3 group">
                  <div className="bg-[#fff0f5] p-2 rounded-lg group-hover:bg-[#e02c5a] transition-colors duration-300 shrink-0">
                    <Phone
                      size={16}
                      className="text-[#e02c5a] group-hover:text-white transition-colors duration-300"
                    />
                  </div>
                  <a
                    href="tel:+919876543210"
                    className="text-gray-600 hover:text-[#e02c5a] text-sm font-medium transition-colors"
                  >
                    +91 9005520320
                  </a>
                </li>
                <li className="flex items-center gap-3 group">
                  <div className="bg-[#fff0f5] p-2 rounded-lg group-hover:bg-[#e02c5a] transition-colors duration-300 shrink-0">
                    <Mail
                      size={16}
                      className="text-[#e02c5a] group-hover:text-white transition-colors duration-300"
                    />
                  </div>
                  <a
                    href="mailto:support@localshaadi.in"
                    className="text-gray-600 hover:text-[#e02c5a] text-sm font-medium transition-colors"
                  >
                    support@localshaadi.in
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-rose-100 flex flex-col md:flex-row items-center justify-between gap-4 pb-20 md:pb-4">
            <p className="text-gray-500 text-sm font-medium text-center md:text-left">
              © {new Date().getFullYear()} Local Shaadi.in. All rights reserved.
            </p>

            <div className="text-gray-500 text-sm font-medium flex items-center gap-1.5">
              Designed with{" "}
              <Heart
                size={14}
                className="text-[#e02c5a] fill-[#e02c5a] animate-pulse"
              />{" "}
              by
              <a
                href="https://codewebx.in"
                target="_blank"
                rel="noreferrer"
                className="text-[#821511] hover:text-[#e02c5a] font-bold tracking-wide transition-colors"
              >
                codewebx.in
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* ================= BOTTOM NAVIGATION BAR (Mobile Only) ================= */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-rose-100 flex justify-around items-center h-[72px] z-50 px-2 pb-2 shadow-[0_-5px_15px_rgba(224,44,90,0.05)]">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex flex-col items-center justify-center gap-1 w-16 text-gray-500 hover:text-[#e02c5a]"
        >
          <Home size={22} />
          <span className="text-[10px] font-medium">Home</span>
        </button>
        <button
          onClick={() => navigate("/dashboard")}
          className="flex flex-col items-center justify-center gap-1 w-16 text-gray-500 hover:text-[#e02c5a]"
        >
          <Search size={22} />
          <span className="text-[10px] font-medium">Search</span>
        </button>
        <button
          onClick={() => navigate("/matches")}
          className="flex flex-col items-center justify-center gap-1 w-16 text-gray-500 hover:text-[#e02c5a]"
        >
          <Heart size={22} />
          <span className="text-[10px] font-medium">Matches</span>
        </button>

        <button
          onClick={() => navigate("/notifications")}
          className="flex flex-col items-center justify-center gap-1 w-16 text-gray-500 hover:text-[#e02c5a] relative focus:outline-none"
        >
          <Bell size={22} />
          <span className="absolute top-0 right-3 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
            3
          </span>
          <span className="text-[10px] font-medium">Notifs</span>
        </button>

        <button className="flex flex-col items-center justify-center gap-1 w-16 text-[#e02c5a]">
          <User size={22} fill="currentColor" />
          <span className="text-[10px] font-bold">Profile</span>
        </button>
      </div>
    </div>
  );
};

export default FinalProfile;
