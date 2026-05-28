import React, { useState, useEffect } from "react";
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
  Edit3,
  Sparkles,
  Flower2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const FinalProfile = () => {
  const navigate = useNavigate();

  // 🔥 Toggles and Loaders
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 🔥 Photo aur Crop Modal states
  const [profileImage, setProfileImage] = useState(null);
  const [tempImage, setTempImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showCropModal, setShowCropModal] = useState(false);
  const [imageZoom, setImageZoom] = useState(1);

  // 🔥 Empty User Data State
  const [formData, setFormData] = useState({
    profileFor: "",
    fullName: "",
    fatherName: "",
    dob: "",
    age: "",
    gender: "",
    maritalStatus: "",
    height: "",
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

  // =========================================================================
  // 🟢 1. FETCH DATA FROM BACKEND WHEN PAGE LOADS
  // =========================================================================
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");
        // 🔥 Dynamic URL for Local & Production
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
          ? import.meta.env.VITE_API_BASE_URL + "/auth"
          : "http://localhost:5001/api/auth";

        const response = await fetch(`${API_BASE_URL}/profile`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        // HTML/404 Error crash bachane ke liye check
        const contentType = response.headers.get("content-type");
        if (
          !response.ok ||
          !contentType ||
          !contentType.includes("application/json")
        ) {
          throw new Error("Backend API abhi ready nahi hai ya URL galat hai");
        }

        const data = await response.json();

        if (data.success && data.user) {
          let formattedDob = "";
          if (data.user.dob) {
            formattedDob = new Date(data.user.dob).toISOString().split("T")[0];
          }
          setFormData((prev) => ({
            ...prev,
            ...data.user,
            dob: formattedDob,
            siblings: data.user.siblings || [],
          }));
          if (data.user.profileImage) {
            setProfileImage(data.user.profileImage);
          }
        }
      } catch (error) {
        console.warn("⚠️ API Fetch Issue:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  // =========================================================================
  // 🟢 2. SEND UPDATED DATA TO BACKEND (SUBMIT)
  // =========================================================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
        ? import.meta.env.VITE_API_BASE_URL + "/auth"
        : "http://localhost:5001/api/auth";

      const submitData = new FormData();

      Object.keys(formData).forEach((key) => {
        if (key === "siblings") {
          submitData.append(key, JSON.stringify(formData[key]));
        } else {
          submitData.append(key, formData[key] || "");
        }
      });

      if (selectedFile) {
        submitData.append("profileImage", selectedFile);
      }

      const response = await fetch(`${API_BASE_URL}/update-profile`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: submitData,
      });

      const contentType = response.headers.get("content-type");
      if (
        !response.ok ||
        !contentType ||
        !contentType.includes("application/json")
      ) {
        throw new Error("Update API abhi ready nahi hai");
      }

      const result = await response.json();

      if (result.success) {
        alert("Profile details updated successfully! 💖");
        setIsEditing(false);
        if (result.user?.profileImage) {
          setProfileImage(result.user.profileImage);
        }
      } else {
        alert("Update failed: " + result.message);
      }
    } catch (error) {
      console.warn("⚠️ Edit API Issue:", error.message);
      alert("Something went wrong! Server might be unreachable.");
      setIsEditing(false);
    } finally {
      setIsLoading(false);
    }
  };

  // =========================================================================
  // 🟢 3. FORM HANDLERS
  // =========================================================================
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileSizeInMB = file.size / 1024 / 1024;
      if (fileSizeInMB > 5) {
        alert("Bhai, image ka size 5MB se kam hona chahiye!");
        e.target.value = "";
        return;
      }
      setSelectedFile(file);
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
      if (onlyNums.length <= 6) setFormData({ ...formData, [name]: onlyNums });
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

  const hideScrollbar =
    "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]";

  const inputClass = `px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium outline-none transition-all w-full
    ${isEditing ? "bg-white focus:border-[#e02c5a] focus:ring-2 focus:ring-[#e02c5a]/20 text-gray-800" : "bg-gray-100 text-gray-500 cursor-not-allowed"}`;

  // =========================================================================
  // 🟢 4. RENDER UI
  // =========================================================================
  if (isLoading && !isEditing) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#fff0f5] via-white to-[#ffe4e6] flex flex-col items-center justify-center">
        <Sparkles size={40} className="text-[#e02c5a] animate-spin mb-4" />
        <p className="text-[#821511] font-bold font-serif text-xl animate-pulse">
          Loading your beautiful profile...
        </p>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-b from-[#fff0f5] via-white to-[#ffe4e6] font-sans pb-12 relative overflow-x-hidden ${hideScrollbar}`}
    >
      {/* MAGICAL BACKGROUND */}
      <style>{`
        @keyframes gentle-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-gentle { animation: gentle-bounce 4s ease-in-out infinite; }
      `}</style>

      <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[10%] -right-[5%] w-[400px] h-[400px] rounded-full bg-[#e02c5a]/10 blur-[90px]"></div>
        <div className="absolute top-[40%] -left-[10%] w-[500px] h-[500px] rounded-full bg-[#fbbf24]/10 blur-[90px]"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[300px] h-[300px] rounded-full bg-rose-200/20 blur-[60px]"></div>
      </div>

      {/* CROP MODAL */}
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
            <div className="relative w-64 h-64 mx-auto rounded-2xl overflow-hidden bg-rose-50 border-4 border-dashed border-rose-300 mb-6 flex items-center justify-center shadow-inner">
              <img
                src={tempImage}
                alt="Preview"
                className="w-full h-full object-cover transition-transform duration-100 cursor-move"
                style={{ transform: `scale(${imageZoom})` }}
              />
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

      {/* FORM CONTAINER */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-10 relative z-10">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#821511] flex items-center gap-2">
              Your Beautiful Profile{" "}
              <Sparkles size={20} className="text-[#fbbf24] sm:w-6 sm:h-6" />
            </h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base font-medium">
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
          {/* PHOTO UPLOAD SECTION */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-[0_8px_30px_rgba(224,44,90,0.06)] border border-rose-100 p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6 relative">
            <div className="absolute top-4 right-6 bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs font-bold border border-green-200 flex items-center gap-1 shadow-sm">
              <ShieldCheck size={14} /> Profile Verified
            </div>

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
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1 font-serif">
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
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-[0_8px_30px_rgba(224,44,90,0.06)] border border-rose-100 p-5 sm:p-8">
            <h2 className="flex items-center gap-2 text-lg sm:text-xl font-bold text-[#821511] mb-5 sm:mb-6 pb-3 sm:pb-4 border-b border-rose-100 font-serif">
              <User className="text-[#e02c5a] sm:w-6 sm:h-6" size={20} /> Basic
              Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              <div className="flex flex-col">
                <label className="text-[10px] sm:text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-1.5 sm:mb-2">
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
                  <option value="" disabled>
                    Select Profile For
                  </option>
                  <option value="Self">Self</option>
                  <option value="Son">Son</option>
                  <option value="Daughter">Daughter</option>
                  <option value="Brother">Brother</option>
                  <option value="Sister">Sister</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-[10px] sm:text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-1.5 sm:mb-2">
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
                <label className="text-[10px] sm:text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-1.5 sm:mb-2">
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
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div className="grid grid-cols-5 gap-3 sm:gap-4">
                <div className="col-span-3 flex flex-col">
                  <label className="text-[10px] sm:text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-1.5 sm:mb-2">
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
                  <label className="text-[10px] sm:text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-1.5 sm:mb-2">
                    Age
                  </label>
                  <input
                    type="text"
                    value={formData.age !== "" ? `${formData.age} Yrs` : ""}
                    readOnly
                    className="px-3 sm:px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-sm font-bold text-gray-500 outline-none text-center cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-[10px] sm:text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-1.5 sm:mb-2">
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
                  <option value="" disabled>
                    Select Status
                  </option>
                  <option value="Single">Single</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="flex flex-col">
                  <label className="text-[10px] sm:text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-1.5 sm:mb-2">
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
                    <option value="" disabled>
                      Height
                    </option>
                    <option value="5'0&quot;">5' 0"</option>
                    <option value="5'2&quot;">5' 2"</option>
                    <option value="5'4&quot;">5' 4"</option>
                    <option value="5'5&quot;">5' 5"</option>
                    <option value="5'6&quot;">5' 6"</option>
                    <option value="5'8&quot;">5' 8"</option>
                    <option value="5'10&quot;">5' 10"</option>
                    <option value="6'0&quot;">6' 0"</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] sm:text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-1.5 sm:mb-2">
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
                    <option value="" disabled>
                      Complexion
                    </option>
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
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-[0_8px_30px_rgba(224,44,90,0.06)] border border-rose-100 p-5 sm:p-8">
            <h2 className="flex items-center gap-2 text-lg sm:text-xl font-bold text-[#821511] mb-5 sm:mb-6 pb-3 sm:pb-4 border-b border-rose-100 font-serif">
              <MapPin className="text-[#fbbf24] sm:w-6 sm:h-6" size={20} />{" "}
              Location Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              <div className="flex flex-col">
                <label className="text-[10px] sm:text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-1.5 sm:mb-2">
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
                <label className="text-[10px] sm:text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-1.5 sm:mb-2">
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
                <label className="text-[10px] sm:text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-1.5 sm:mb-2">
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
                <label className="text-[10px] sm:text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-1.5 sm:mb-2">
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

          {/* CARD 3: RELIGION */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-[0_8px_30px_rgba(224,44,90,0.06)] border border-rose-100 p-5 sm:p-8">
            <h2 className="flex items-center gap-2 text-lg sm:text-xl font-bold text-[#821511] mb-5 sm:mb-6 pb-3 sm:pb-4 border-b border-rose-100 font-serif">
              <BookOpen className="text-purple-600 sm:w-6 sm:h-6" size={20} />{" "}
              Religious Background
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
              <div className="flex flex-col">
                <label className="text-[10px] sm:text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-1.5 sm:mb-2">
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
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="Hindu">Hindu</option>
                  <option value="Muslim">Muslim</option>
                  <option value="Sikh">Sikh</option>
                  <option value="Christian">Christian</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-[10px] sm:text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-1.5 sm:mb-2">
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
                <label className="text-[10px] sm:text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-1.5 sm:mb-2">
                  Category
                </label>
                <select
                  disabled={!isEditing}
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="General">General</option>
                  <option value="OBC">OBC</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                </select>
              </div>
            </div>
          </div>

          {/* CARD 4: CAREER & FAMILY */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-[0_8px_30px_rgba(224,44,90,0.06)] border border-rose-100 p-5 sm:p-8">
            <h2 className="flex items-center gap-2 text-lg sm:text-xl font-bold text-[#821511] mb-5 sm:mb-6 pb-3 sm:pb-4 border-b border-rose-100 font-serif">
              <Briefcase className="text-blue-500 sm:w-6 sm:h-6" size={20} />{" "}
              Career & Family
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
              <div className="flex flex-col">
                <label className="text-[10px] sm:text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-1.5 sm:mb-2">
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
                <label className="text-[10px] sm:text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-1.5 sm:mb-2">
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
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="Private Job">Private Job</option>
                  <option value="Government Job">Government Job</option>
                  <option value="Software Engineer">Software Engineer</option>
                  <option value="Business">Business</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-[10px] sm:text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-1.5 sm:mb-2">
                  Annual Income
                </label>
                <select
                  disabled={!isEditing}
                  name="income"
                  value={formData.income}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="0 - 2 Lakhs">0 - 2 Lakhs</option>
                  <option value="2 - 5 Lakhs">2 - 5 Lakhs</option>
                  <option value="5 - 10 Lakhs">5 - 10 Lakhs</option>
                  <option value="10 - 20 Lakhs">10 - 20 Lakhs</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-[10px] sm:text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-1.5 sm:mb-2">
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
                <label className="text-[10px] sm:text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-1.5 sm:mb-2">
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

              {/* SIBLINGS SECTION */}
              {formData.siblings.length > 0 && (
                <div className="col-span-1 md:col-span-3 mt-4 bg-rose-50/50 border border-rose-100 rounded-2xl p-4 sm:p-6 shadow-inner">
                  <h3 className="text-[#821511] font-bold mb-4 sm:mb-5 flex items-center gap-2 text-sm sm:text-base">
                    <Users size={18} className="text-[#e02c5a] sm:w-5 sm:h-5" />{" "}
                    Sibling Details
                  </h3>
                  <div className="space-y-4">
                    {formData.siblings.map((sibling, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 bg-white p-4 sm:p-5 rounded-xl border border-rose-100 shadow-sm relative"
                      >
                        <div className="absolute top-0 left-0 bg-gradient-to-r from-[#ed2c5b] to-[#c0163e] text-white text-[9px] sm:text-[10px] font-bold px-2 sm:px-3 py-1 rounded-br-lg rounded-tl-xl">
                          Sibling #{index + 1}
                        </div>
                        <div className="flex flex-col pt-4 md:pt-0">
                          <label className="text-[10px] sm:text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-1.5 sm:mb-2">
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
                        <div className="flex flex-col">
                          <label className="text-[10px] sm:text-[11px] font-extrabold text-gray-400 uppercase tracking-wider mb-1.5 sm:mb-2">
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

          {/* BUTTON CONTROLS */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-4 sm:pt-6 pb-6 sm:pb-8 border-t border-rose-100">
            {!isEditing ? (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setIsEditing(true);
                }}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#ed2c5b] to-[#c0163e] hover:shadow-lg hover:-translate-y-1 text-white px-8 sm:px-12 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-bold shadow-md transition-all text-center w-full sm:w-auto text-sm sm:text-lg"
              >
                <Edit3 size={18} className="sm:w-5 sm:h-5" /> Edit Profile
                Details
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-6 sm:px-10 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-gray-600 bg-white border-2 border-gray-200 hover:bg-gray-50 transition-all text-center w-full sm:w-auto text-sm sm:text-base"
                >
                  Discard Changes
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#ed2c5b] to-[#c0163e] hover:shadow-lg hover:-translate-y-1 text-white px-8 sm:px-12 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-bold shadow-md transition-all text-center w-full sm:w-auto text-sm sm:text-lg disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Sparkles className="animate-spin" size={18} />
                  ) : (
                    <CheckCircle size={18} className="sm:w-5 sm:h-5" />
                  )}
                  {isLoading ? "Saving..." : "Save All Updates"}
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default FinalProfile;
