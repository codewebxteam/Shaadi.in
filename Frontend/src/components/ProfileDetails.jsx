import React, { useState } from "react";
import {
  Heart,
  User,
  Camera,
  CheckCircle,
  MapPin,
  Lock,
  Phone,
  Mail,
  Briefcase,
  BookOpen,
  Users,
  ArrowLeft,
  ShieldCheck,
  Star,
  Sparkles,
  Flower2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const ProfileDetails = ({ profile, onBack }) => {
  if (!profile) return null;

  // 🔥 Image Gallery Logic
  // Agar backend se array aayi hai to use karenge, warna primary img fallback
  const galleryImages =
    profile.profileImages && profile.profileImages.length > 0
      ? profile.profileImages
      : [profile.img];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length,
    );
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out w-full relative">
      {/* 🌸 SUBTLE COMPONENT-LEVEL ROMANTIC BACKGROUND ACCENTS 🌸 */}
      <div className="absolute top-10 right-10 opacity-20 animate-pulse pointer-events-none">
        <Heart size={40} fill="#e02c5a" color="#e02c5a" className="rotate-12" />
      </div>
      <div className="absolute bottom-20 left-10 opacity-30 pointer-events-none">
        <Flower2
          size={50}
          color="#fbbf24"
          strokeWidth={1}
          className="-rotate-12"
        />
      </div>

      {/* ================= BACK BUTTON ================= */}
      <button
        onClick={onBack}
        className="group flex items-center gap-2 text-[#e02c5a] font-bold mb-6 sm:mb-8 transition-all bg-white/80 backdrop-blur-md px-5 py-2.5 sm:px-6 sm:py-3 rounded-2xl border border-rose-200 shadow-sm w-fit hover:bg-gradient-to-r hover:from-rose-50 hover:to-pink-50 hover:shadow-md text-sm sm:text-base relative z-10"
      >
        <ArrowLeft
          size={18}
          className="group-hover:-translate-x-1.5 transition-transform duration-300"
        />
        Back to Matches
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 relative z-10">
        {/* ================= LEFT COLUMN: PHOTO & ACTIONS (4 Cols) ================= */}
        <div className="lg:col-span-4 space-y-6">
          {/* Photo Card with Gallery */}
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-4 sm:p-5 shadow-[0_10px_40px_rgba(224,44,90,0.08)] border border-rose-100 group">
            {/* Main Image View */}
            <div className="relative h-[350px] sm:h-[420px] rounded-2xl overflow-hidden mb-3 border-4 border-rose-50 shadow-inner group-hover:border-rose-100 transition-colors duration-500">
              <img
                key={galleryImages[currentImageIndex]} // Keys force re-render for smooth fade if needed
                src={galleryImages[currentImageIndex]}
                alt={`${profile.name} - Photo ${currentImageIndex + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out animate-in fade-in zoom-in-95"
              />

              {/* Photo Count Overlay */}
              <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-white/20 flex items-center gap-1.5 z-20">
                <Camera size={14} /> {currentImageIndex + 1} /{" "}
                {galleryImages.length}
              </div>

              {/* Left/Right Navigation Arrows (Only show if > 1 image) */}
              {galleryImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur-sm transition-all z-20"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur-sm transition-all z-20"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              {/* Magical Gradient Overlay at bottom for seamless blend */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 to-transparent z-10"></div>

              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end z-20">
                <div>
                  <h3 className="text-white font-serif text-2xl font-bold tracking-wide drop-shadow-md">
                    {profile.name.split(" ")[0]}
                  </h3>
                  <p className="text-gray-200 text-sm font-medium flex items-center gap-1 drop-shadow-md">
                    <MapPin size={12} className="text-rose-300" />{" "}
                    {profile.location.split(",")[0]}
                  </p>
                </div>
                <div className="bg-green-500/90 backdrop-blur-sm text-white text-[10px] font-extrabold px-2 py-1 rounded-lg border border-green-400/50">
                  ONLINE
                </div>
              </div>
            </div>

            {/* Thumbnail Strip (Only show if > 1 image) */}
            {galleryImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto py-1 mb-4 scrollbar-hide px-1 justify-center">
                {galleryImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative shrink-0 w-12 h-12 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      currentImageIndex === index
                        ? "border-[#e02c5a] shadow-[0_0_10px_rgba(224,44,90,0.4)] scale-110"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumb ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-center gap-3 mt-2">
              <button className="flex-1 py-3.5 sm:py-4 rounded-2xl border-2 border-rose-100 text-[#e02c5a] text-sm sm:text-base font-bold hover:bg-rose-50 hover:border-rose-200 flex justify-center items-center gap-2 transition-all shadow-sm group/btn">
                <Star
                  size={18}
                  className="group-hover/btn:fill-rose-200 transition-colors"
                />
                Shortlist
              </button>
              <button className="flex-1 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-[#ed2c5b] to-[#c0163e] text-white text-sm sm:text-base font-bold hover:shadow-[0_10px_25px_rgba(224,44,90,0.4)] hover:-translate-y-1 shadow-md flex justify-center items-center gap-2 transition-all duration-300">
                <Heart size={18} fill="white" className="animate-pulse" />
                Connect
              </button>
            </div>
          </div>

          {/* Locked Contact Details (Premium Glassmorphism) */}
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl p-6 sm:p-7 shadow-2xl border border-gray-700/50 relative overflow-hidden text-center group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-rose-500/10 rounded-full blur-3xl -mr-10 -mt-10 transition-all group-hover:bg-rose-500/20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl -ml-10 -mb-10"></div>

            <div className="relative z-10">
              <div className="bg-gradient-to-b from-amber-200 to-amber-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(251,191,36,0.3)]">
                <Lock size={28} className="text-gray-900" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 font-serif tracking-wide">
                Contact Locked
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm mb-6 font-medium leading-relaxed px-2">
                Upgrade to Premium to directly call, email, or visit her family.
              </p>

              <div className="space-y-3 mb-7 text-left opacity-70 pointer-events-none select-none">
                <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm p-3.5 rounded-2xl border border-white/10">
                  <Phone size={18} className="text-amber-400/80" />
                  <span className="text-gray-300 text-sm sm:text-base font-mono tracking-widest">
                    +91 ••••• •••••
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm p-3.5 rounded-2xl border border-white/10">
                  <Mail size={18} className="text-amber-400/80" />
                  <span className="text-gray-300 text-sm sm:text-base font-mono tracking-widest">
                    a••••••@gmail.com
                  </span>
                </div>
              </div>
              <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-gray-900 font-black tracking-wide shadow-[0_10px_20px_rgba(245,158,11,0.2)] hover:shadow-[0_15px_30px_rgba(245,158,11,0.3)] hover:-translate-y-1 transition-all duration-300 text-sm sm:text-base uppercase flex items-center justify-center gap-2">
                <Sparkles size={18} /> Unlock Premium
              </button>
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: DETAILS GRID (8 Cols) ================= */}
        <div className="lg:col-span-8 space-y-6 sm:space-y-8">
          {/* Header & About Section */}
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-[0_10px_40px_rgba(224,44,90,0.06)] border border-rose-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-rose-50/50 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

            <div className="flex flex-col md:flex-row items-start justify-between mb-5 gap-4 relative z-10">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#821511] font-serif flex items-center gap-3 mb-2">
                  {profile.name}
                  <ShieldCheck
                    size={28}
                    className="text-blue-500 drop-shadow-sm"
                  />
                </h2>
                <p className="text-gray-500 text-sm sm:text-base font-medium flex items-center gap-2">
                  Profile created for Self{" "}
                  <span className="w-1 h-1 rounded-full bg-gray-300"></span>{" "}
                  Last active 2 hours ago
                </p>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 text-emerald-700 font-bold px-5 py-2.5 rounded-2xl text-sm border border-green-200 flex items-center gap-2 shadow-sm">
                <CheckCircle size={18} className="text-emerald-500" />{" "}
                {profile.matchPercentage}% Match
              </div>
            </div>

            <hr className="border-rose-100/70 my-5 sm:my-6 relative z-10" />

            <div className="relative z-10 bg-rose-50/30 p-5 rounded-2xl border border-rose-50">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 font-serif flex items-center gap-2">
                <Sparkles size={20} className="text-[#fbbf24]" /> A Little About
                Me
              </h3>
              <p className="text-gray-600 text-[15px] sm:text-base font-medium leading-relaxed italic">
                "{profile.about}"
              </p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {/* Basic Details */}
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-[0_8px_30px_rgba(224,44,90,0.05)] border border-rose-100 hover:border-rose-300 transition-colors group">
              <h3 className="flex items-center gap-3 text-lg sm:text-xl font-bold text-[#821511] mb-5 pb-3 border-b border-rose-100/70 font-serif">
                <div className="bg-rose-100/50 p-2 rounded-xl text-[#e02c5a] group-hover:scale-110 transition-transform">
                  <User size={20} />
                </div>
                Basic Details
              </h3>
              <ul className="space-y-4 text-[13px] sm:text-[15px]">
                <li className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Age</span>
                  <span className="font-bold text-gray-800">
                    {profile.age} Years
                  </span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Height</span>
                  <span className="font-bold text-gray-800">
                    {profile.height}
                  </span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Complexion</span>
                  <span className="font-bold text-gray-800">
                    {profile.complexion}
                  </span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Location</span>
                  <span className="font-bold text-gray-800 text-right max-w-[60%] leading-tight">
                    {profile.location}
                  </span>
                </li>
              </ul>
            </div>

            {/* Religious Info */}
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-[0_8px_30px_rgba(224,44,90,0.05)] border border-rose-100 hover:border-amber-200 transition-colors group">
              <h3 className="flex items-center gap-3 text-lg sm:text-xl font-bold text-[#821511] mb-5 pb-3 border-b border-rose-100/70 font-serif">
                <div className="bg-amber-100/50 p-2 rounded-xl text-amber-600 group-hover:scale-110 transition-transform">
                  <BookOpen size={20} />
                </div>
                Religious Info
              </h3>
              <ul className="space-y-4 text-[13px] sm:text-[15px]">
                <li className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Religion</span>
                  <span className="font-bold text-gray-800">
                    {profile.religion}
                  </span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Caste</span>
                  <span className="font-bold text-gray-800">
                    {profile.caste}
                  </span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Sub-Caste</span>
                  <span className="font-bold text-gray-800">
                    {profile.subCaste}
                  </span>
                </li>
              </ul>
            </div>

            {/* Career & Ed */}
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-[0_8px_30px_rgba(224,44,90,0.05)] border border-rose-100 hover:border-blue-200 transition-colors group">
              <h3 className="flex items-center gap-3 text-lg sm:text-xl font-bold text-[#821511] mb-5 pb-3 border-b border-rose-100/70 font-serif">
                <div className="bg-blue-100/50 p-2 rounded-xl text-blue-600 group-hover:scale-110 transition-transform">
                  <Briefcase size={20} />
                </div>
                Career & Ed.
              </h3>
              <ul className="space-y-4 text-[13px] sm:text-[15px]">
                <li className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Education</span>
                  <span className="font-bold text-gray-800">
                    {profile.education}
                  </span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Profession</span>
                  <span className="font-bold text-gray-800 text-right max-w-[60%] leading-tight">
                    {profile.profession}
                  </span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Income</span>
                  <span className="font-bold text-green-700 bg-green-50 px-3 py-1 rounded-lg border border-green-100">
                    {profile.salary}
                  </span>
                </li>
              </ul>
            </div>

            {/* Family Details */}
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-[0_8px_30px_rgba(224,44,90,0.05)] border border-rose-100 hover:border-purple-200 transition-colors group">
              <h3 className="flex items-center gap-3 text-lg sm:text-xl font-bold text-[#821511] mb-5 pb-3 border-b border-rose-100/70 font-serif">
                <div className="bg-purple-100/50 p-2 rounded-xl text-purple-600 group-hover:scale-110 transition-transform">
                  <Users size={20} />
                </div>
                Family Details
              </h3>
              <ul className="space-y-4 text-[13px] sm:text-[15px] mb-5">
                <li className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Father</span>
                  <span className="font-bold text-gray-800 text-right max-w-[60%] leading-tight">
                    {profile.fatherName}
                  </span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Family Type</span>
                  <span className="font-bold text-gray-800">
                    {profile.familyType}
                  </span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Members</span>
                  <span className="font-bold text-gray-800">
                    {profile.familyMembers}
                  </span>
                </li>
              </ul>

              {profile.siblings && profile.siblings.length > 0 && (
                <div className="bg-gradient-to-br from-rose-50 to-pink-50/50 p-4 rounded-2xl border border-rose-100 shadow-inner">
                  <span className="text-[11px] sm:text-xs font-black text-rose-400 uppercase tracking-widest mb-3 block">
                    Siblings ({profile.siblingCount})
                  </span>
                  <div className="space-y-2.5">
                    {profile.siblings.map((sib, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center text-xs sm:text-[14px]"
                      >
                        <span className="font-bold text-gray-700">
                          {sib.name}
                        </span>
                        <span className="bg-white px-2.5 py-1 rounded-lg border border-rose-100 font-bold text-[#e02c5a] shadow-sm">
                          {sib.maritalStatus || sib.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
