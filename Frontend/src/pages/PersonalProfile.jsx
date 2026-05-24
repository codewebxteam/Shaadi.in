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
  Sparkles,
  Flower2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const PersonalProfile = () => {
  // 🔥 Photo aur Crop Modal states
  const [profileImage, setProfileImage] = useState(null);
  const [tempImage, setTempImage] = useState(null);
  const [showCropModal, setShowCropModal] = useState(false);
  const [imageZoom, setImageZoom] = useState(1);

  // 🔥 Image Panning (Dragging) States
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const [formData, setFormData] = useState({
    profileFor: "",
    fullName: "",
    fatherName: "",
    dob: "",
    age: "",
    gender: "",
    maritalStatus: "",
    height: "",
    weight: "", // Weight field
    complexion: "",
    state: "",
    district: "",
    cityVillage: "",
    pincode: "",
    religion: "",
    caste: "",
    category: "",
    occupation: "",
    income: "",
    familyMembers: "",
    siblingCount: "0",
    siblings: [],
  });

  const navigate = useNavigate();

  // Image Upload Handler (5MB Limit)
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileSizeInMB = file.size / 1024 / 1024;
      if (fileSizeInMB > 5) {
        alert("Bhai, image ka size 5MB se kam hona chahiye!");
        e.target.value = "";
        return;
      }
      setDragOffset({ x: 0, y: 0 }); // Nayi image aaye toh drag reset ho jaye
      setTempImage(URL.createObjectURL(file));
      setImageZoom(1);
      setShowCropModal(true);
    }
  };

  // 🔥 Mouse/Touch Events for Dragging Image
  const handlePointerDown = (e) => {
    setIsDragging(true);
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setDragStart({ x: clientX - dragOffset.x, y: clientY - dragOffset.y });
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setDragOffset({ x: clientX - dragStart.x, y: clientY - dragStart.y });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handleSaveCrop = () => {
    setProfileImage(tempImage);
    setShowCropModal(false);
  };

  // 🔥 Dynamic Sibling Generator
  const handleSiblingCountChange = (e) => {
    const countStr = e.target.value;
    const count = parseInt(countStr) || 0;
    let newSiblings = [...formData.siblings];

    if (count > newSiblings.length) {
      const toAdd = count - newSiblings.length;
      for (let i = 0; i < toAdd; i++) {
        newSiblings.push({ name: "", maritalStatus: "" });
      }
    } else if (count < newSiblings.length) {
      newSiblings = newSiblings.slice(0, count);
    }

    setFormData({
      ...formData,
      siblingCount: countStr,
      siblings: newSiblings,
    });
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
          alert("Age must be 18 or above to register.");
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
    if (!profileImage) {
      alert("Please upload a profile picture to continue.");
      return;
    }
    console.log("Profile Data Submitted: ", formData);
    alert(
      "Profile details saved successfully! Your beautiful journey begins now.",
    );
    navigate("/dashboard");
  };

  const inputClass =
    "px-4 py-3.5 bg-gray-50 border border-rose-100 rounded-xl text-sm font-medium text-gray-700 focus:ring-2 focus:ring-[#e02c5a]/20 focus:border-[#e02c5a] focus:bg-white outline-none transition-all w-full";

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff0f5] via-white to-[#ffe4e6] font-sans relative overflow-x-hidden pb-12">
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

      {/* ================= CROP MODAL (SQUARE PROFILE WITH PAN/DRAG) ================= */}
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

            <p className="text-[11px] text-center text-gray-500 mb-2">
              Drag to reposition, use slider to zoom
            </p>

            {/* 🔥 SQUARE PROFILE PREVIEW WITH DRAGGING */}
            <div
              className="relative w-64 h-64 mx-auto rounded-2xl overflow-hidden bg-rose-50 border-4 border-dashed border-rose-300 mb-6 flex items-center justify-center shadow-inner cursor-move touch-none"
              onMouseDown={handlePointerDown}
              onMouseMove={handlePointerMove}
              onMouseUp={handlePointerUp}
              onMouseLeave={handlePointerUp}
              onTouchStart={handlePointerDown}
              onTouchMove={handlePointerMove}
              onTouchEnd={handlePointerUp}
            >
              <img
                src={tempImage}
                alt="Upload Preview"
                draggable="false"
                className="w-full h-full object-cover transition-none select-none pointer-events-none"
                style={{
                  transform: `scale(${imageZoom}) translate(${dragOffset.x / imageZoom}px, ${dragOffset.y / imageZoom}px)`,
                }}
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

      {/* ================= FORM CONTAINER ================= */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 md:pt-12 relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#821511] mb-3 flex items-center justify-center gap-3">
            Complete Your Profile{" "}
            <Sparkles className="text-[#fbbf24]" size={28} />
          </h1>
          <p className="text-gray-600 font-medium max-w-xl mx-auto">
            A beautiful, detailed profile gets{" "}
            <span className="text-[#e02c5a] font-bold">
              10x more love and matches
            </span>
            . Fill in your authentic details to find your forever.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* ================= 📸 PHOTO UPLOAD SECTION (SQUARE) ================= */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-[0_8px_30px_rgba(224,44,90,0.06)] border border-rose-100 p-6 md:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 hover:shadow-lg transition-all relative">
            {/* 🔥 SQUARE PROFILE PREVIEW (Rounded-2xl) */}
            <div className="relative group w-36 h-36 shrink-0 rounded-2xl border-4 border-rose-100 hover:border-[#e02c5a]/50 transition-colors bg-rose-50 flex items-center justify-center overflow-hidden shadow-sm">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Camera size={40} className="text-[#e02c5a]/40" />
              )}

              <label className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-10 backdrop-blur-sm">
                <ImagePlus size={28} className="text-white mb-1" />
                <span className="text-white text-[11px] font-bold tracking-wider">
                  CHANGE
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>

            <div className="text-center sm:text-left flex-1 mt-2">
              <h2 className="text-2xl font-serif font-bold text-[#821511] mb-2">
                Profile Picture <span className="text-red-500">*</span>
              </h2>
              <p className="text-sm text-gray-500 mb-5 max-w-md font-medium leading-relaxed">
                Upload a clear, front-facing photo. Beautiful photos are the
                first step to your beautiful journey. <br />
                <span className="text-xs text-gray-400">
                  (Max size: 5MB, Format: JPG/PNG)
                </span>
              </p>
              <label className="inline-flex items-center gap-2 px-6 py-3 bg-[#fff0f5] text-[#e02c5a] font-bold rounded-xl border border-[#e02c5a]/30 cursor-pointer hover:bg-[#e02c5a] hover:text-white transition-all shadow-sm">
                <Camera size={18} />
                {profileImage ? "Upload New Photo" : "Upload Best Photo"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          </div>

          {/* ================= CARD 1: BASIC DETAILS ================= */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-[0_8px_30px_rgba(224,44,90,0.06)] border border-rose-100 p-6 sm:p-8 hover:shadow-lg transition-all">
            <h2 className="flex items-center gap-2 text-xl font-bold text-[#821511] mb-6 border-b border-rose-100 pb-4 font-serif">
              <div className="bg-[#fff0f5] p-2 rounded-lg text-[#e02c5a]">
                <User size={20} />
              </div>
              Basic Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">
                  Profile Created For <span className="text-red-500">*</span>
                </label>
                <select
                  name="profileFor"
                  value={formData.profileFor}
                  onChange={handleChange}
                  required
                  className={inputClass}
                >
                  <option value="">Select Option</option>
                  <option value="Self">Self</option>
                  <option value="Son">Son</option>
                  <option value="Daughter">Daughter</option>
                  <option value="Brother">Brother</option>
                  <option value="Sister">Sister</option>
                  <option value="Relative/Friend">Relative / Friend</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  required
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className={inputClass}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">
                  Father's Name
                </label>
                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                  placeholder="Enter father's name"
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-5 gap-4">
                <div className="col-span-3 flex flex-col">
                  <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <input
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
                    placeholder="Auto Fill"
                    className={`px-4 py-3.5 border rounded-xl text-sm font-bold outline-none cursor-not-allowed transition-colors text-center w-full
                      ${formData.age !== "" ? "bg-green-50/50 border-green-200 text-green-700" : "bg-gray-50 border-rose-100 text-gray-400"}
                    `}
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">
                  Marital Status <span className="text-red-500">*</span>
                </label>
                <select
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleChange}
                  required
                  className={inputClass}
                >
                  <option value="">Select Status</option>
                  <option value="Single">Single (Never Married)</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                  <option value="Awaiting Divorce">Awaiting Divorce</option>
                </select>
              </div>

              {/* 🔥 3 COLUMN GRID FOR HEIGHT, WEIGHT & COMPLEXION */}
              <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col">
                  <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">
                    Height <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  >
                    <option value="">Height</option>
                    <option value="4'5&quot;">4' 5"</option>
                    <option value="4'6&quot;">4' 6"</option>
                    <option value="4'7&quot;">4' 7"</option>
                    <option value="4'8&quot;">4' 8"</option>
                    <option value="4'9&quot;">4' 9"</option>
                    <option value="4'10&quot;">4' 10"</option>
                    <option value="4'11&quot;">4' 11"</option>
                    <option value="5'0&quot;">5' 0"</option>
                    <option value="5'1&quot;">5' 1"</option>
                    <option value="5'2&quot;">5' 2"</option>
                    <option value="5'3&quot;">5' 3"</option>
                    <option value="5'4&quot;">5' 4"</option>
                    <option value="5'5&quot;">5' 5"</option>
                    <option value="5'6&quot;">5' 6"</option>
                    <option value="5'7&quot;">5' 7"</option>
                    <option value="5'8&quot;">5' 8"</option>
                    <option value="5'9&quot;">5' 9"</option>
                    <option value="5'10&quot;">5' 10"</option>
                    <option value="5'11&quot;">5' 11"</option>
                    <option value="6'0&quot;">6' 0"</option>
                    <option value="6'1&quot;">6' 1"</option>
                    <option value="6'2&quot;">6' 2"</option>
                    <option value="6'3&quot;">6' 3"</option>
                    <option value="6'4&quot;">6' 4"</option>
                    <option value="6'5&quot;">6' 5"</option>
                  </select>
                </div>

                {/* 🔥 NEW FIELD: Weight */}
                <div className="flex flex-col">
                  <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    placeholder="e.g. 65"
                    min="30"
                    max="150"
                    className={inputClass}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">
                    Skin Tone <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="complexion"
                    value={formData.complexion}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  >
                    <option value="">Complexion</option>
                    <option value="Very Fair">Very Fair</option>
                    <option value="Fair">Fair</option>
                    <option value="Wheatish">Wheatish</option>
                    <option value="Dark">Dark</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* ================= CARD 2: LOCATION DETAILS ================= */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-[0_8px_30px_rgba(224,44,90,0.06)] border border-rose-100 p-6 md:p-8 hover:shadow-lg transition-all">
            <h2 className="flex items-center gap-2 text-xl font-bold text-[#821511] mb-6 border-b border-rose-100 pb-4 font-serif">
              <div className="bg-blue-50 p-2 rounded-lg text-blue-500">
                <MapPin size={20} />
              </div>
              Location Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">
                  State <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="e.g. Uttar Pradesh"
                  required
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">
                  District <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  placeholder="e.g. Sant Kabir Nagar"
                  required
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">
                  City / Village <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="cityVillage"
                  value={formData.cityVillage}
                  onChange={handleChange}
                  placeholder="e.g. Khalilabad"
                  required
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">
                  Pincode <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="6-digit pincode"
                  required
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* ================= CARD 3: RELIGION & BACKGROUND ================= */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-[0_8px_30px_rgba(224,44,90,0.06)] border border-rose-100 p-6 md:p-8 hover:shadow-lg transition-all">
            <h2 className="flex items-center gap-2 text-xl font-bold text-[#821511] mb-6 border-b border-rose-100 pb-4 font-serif">
              <div className="bg-[#fffbeb] p-2 rounded-lg text-[#fbbf24]">
                <BookOpen size={20} />
              </div>
              Religious & Social Background
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col">
                <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">
                  Religion <span className="text-red-500">*</span>
                </label>
                <select
                  name="religion"
                  value={formData.religion}
                  onChange={handleChange}
                  required
                  className={inputClass}
                >
                  <option value="">Select Religion</option>
                  <option value="Hindu">Hindu</option>
                  <option value="Muslim">Muslim</option>
                  <option value="Sikh">Sikh</option>
                  <option value="Christian">Christian</option>
                  <option value="Jain">Jain</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">
                  Caste
                </label>
                <input
                  type="text"
                  name="caste"
                  value={formData.caste}
                  onChange={handleChange}
                  placeholder="e.g. Brahmin, Rajput"
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Select Category</option>
                  <option value="General">General</option>
                  <option value="OBC">OBC</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* ================= CARD 4: CAREER & FAMILY (With Siblings) ================= */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-[0_8px_30px_rgba(224,44,90,0.06)] border border-rose-100 p-6 md:p-8 hover:shadow-lg transition-all">
            <h2 className="flex items-center gap-2 text-xl font-bold text-[#821511] mb-6 border-b border-rose-100 pb-4 font-serif">
              <div className="bg-purple-50 p-2 rounded-lg text-purple-600">
                <Briefcase size={20} />
              </div>
              Career & Family Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col">
                <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">
                  Occupation <span className="text-red-500">*</span>
                </label>
                <select
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  required
                  className={inputClass}
                >
                  <option value="">Select Occupation</option>
                  <option value="Private Job">Private Job</option>
                  <option value="Government Job">Government Job</option>
                  <option value="Business/Self-Employed">Business</option>
                  <option value="House Maker">House Maker</option>
                  <option value="Not Working">Not Working</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">
                  Annual Income
                </label>
                <select
                  name="income"
                  value={formData.income}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Select Income</option>
                  <option value="0 - 2 Lakhs">0 - 2 Lakhs</option>
                  <option value="2 - 5 Lakhs">2 - 5 Lakhs</option>
                  <option value="5 - 10 Lakhs">5 - 10 Lakhs</option>
                  <option value="10 - 20 Lakhs">10 - 20 Lakhs</option>
                  <option value="20+ Lakhs">20+ Lakhs</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">
                  Total Family Members
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Users size={18} className="text-[#e02c5a]/60" />
                  </div>
                  <input
                    type="number"
                    name="familyMembers"
                    value={formData.familyMembers}
                    onChange={handleChange}
                    placeholder="E.g. 4"
                    min="1"
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-rose-100 rounded-xl text-sm font-medium text-gray-700 focus:ring-2 focus:ring-[#e02c5a]/20 focus:border-[#e02c5a] focus:bg-white outline-none transition-all"
                  />
                </div>
              </div>

              {/* Number of Siblings */}
              <div className="flex flex-col">
                <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">
                  Number of Siblings
                </label>
                <select
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
                  <option value="5">5 or more</option>
                </select>
              </div>

              {/* 🔥 DYNAMIC SIBLING FIELDS (Spans across the entire grid row) */}
              {formData.siblings.length > 0 && (
                <div className="col-span-1 md:col-span-3 mt-4 bg-rose-50/50 border border-rose-100 rounded-2xl p-6 shadow-inner transition-all duration-300">
                  <h3 className="text-[#821511] font-bold mb-5 flex items-center gap-2">
                    <Users size={18} className="text-[#e02c5a]" /> Sibling
                    Details
                  </h3>

                  <div className="space-y-4">
                    {formData.siblings.map((sibling, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-white p-5 rounded-xl border border-rose-100 shadow-sm relative hover:border-[#e02c5a]/50 transition-colors"
                      >
                        <div className="absolute top-0 left-0 bg-gradient-to-r from-[#ed2c5b] to-[#c0163e] text-white text-[10px] font-bold px-3 py-1 rounded-br-lg rounded-tl-xl">
                          Sibling #{index + 1}
                        </div>

                        <div className="flex flex-col pt-3 md:pt-0">
                          <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">
                            Sibling Name
                          </label>
                          <input
                            type="text"
                            value={sibling.name}
                            onChange={(e) =>
                              handleSiblingDataChange(
                                index,
                                "name",
                                e.target.value,
                              )
                            }
                            placeholder="Enter name"
                            className={inputClass}
                          />
                        </div>

                        <div className="flex flex-col pt-2 md:pt-0">
                          <label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">
                            Marital Status
                          </label>
                          <select
                            value={sibling.maritalStatus}
                            onChange={(e) =>
                              handleSiblingDataChange(
                                index,
                                "maritalStatus",
                                e.target.value,
                              )
                            }
                            className={inputClass}
                          >
                            <option value="">Select Status</option>
                            <option value="Single">Single (Unmarried)</option>
                            <option value="Married">Married</option>
                            <option value="Divorced">Divorced</option>
                            <option value="Widowed">Widowed</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ================= SUBMIT BUTTON ================= */}
          <div className="flex justify-end pt-6 pb-10 border-t border-rose-100">
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#ed2c5b] to-[#c0163e] text-white px-12 py-4 rounded-2xl font-bold text-[17px] tracking-wide shadow-[0_10px_25px_rgba(224,44,90,0.3)] hover:shadow-[0_15px_35px_rgba(224,44,90,0.45)] hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto"
            >
              <CheckCircle size={22} className="animate-pulse" />
              Save & View Matches
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonalProfile;
