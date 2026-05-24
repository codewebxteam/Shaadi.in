import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  MessageSquare,
  Search,
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
  Filter,
  Sparkles,
  Flower2,
} from "lucide-react";

const Matches = () => {
  const navigate = useNavigate();
  const [selectedProfile, setSelectedProfile] = useState(null);

  // 🔥 Extended Mock Data
  const matchesData = [
    {
      id: 1,
      name: "Anjali Sharma",
      age: 25,
      height: "5' 4\"",
      complexion: "Fair",
      location: "Jaipur, Rajasthan",
      religion: "Hindu",
      caste: "Brahmin",
      subCaste: "Gaur",
      education: "B.Tech CS",
      profession: "Software Engineer",
      salary: "₹ 6 LPA",
      fatherName: "Mr. Rajeev Sharma",
      familyType: "Nuclear",
      familyMembers: 5,
      siblingCount: 2,
      siblings: [
        { name: "Rahul Sharma", status: "Married" },
        { name: "Suman Sharma", status: "Single" },
      ],
      about:
        "I am a simple, caring, and understanding person. I balance my professional and personal life well.",
      isOnline: true,
      matchPercentage: 92,
      pics: 5,
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      name: "Priya Singh",
      age: 24,
      height: "5' 2\"",
      complexion: "Wheatish",
      location: "Delhi, NCR",
      religion: "Hindu",
      caste: "Rajput",
      subCaste: "Chauhan",
      education: "MBBS",
      profession: "Doctor",
      salary: "₹ 8 LPA",
      fatherName: "Dr. Vikram Singh",
      familyType: "Joint",
      familyMembers: 6,
      siblingCount: 1,
      siblings: [{ name: "Arjun Singh", status: "Single" }],
      about:
        "Passionate about my career in medicine. Love traveling and reading.",
      isOnline: true,
      matchPercentage: 88,
      pics: 6,
      img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 3,
      name: "Neha Verma",
      age: 26,
      height: "5' 5\"",
      complexion: "Very Fair",
      location: "Indore, MP",
      religion: "Hindu",
      caste: "Vaishya",
      subCaste: "Gupta",
      education: "CA",
      profession: "Chartered Accountant",
      salary: "₹ 6.5 LPA",
      fatherName: "Mr. Suresh Verma",
      familyType: "Nuclear",
      familyMembers: 3,
      siblingCount: 0,
      siblings: [],
      about:
        "Independent and career-oriented. Believe in mutual respect and trust.",
      isOnline: false,
      matchPercentage: 85,
      pics: 3,
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
  ];

  const hideScrollbar =
    "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]";

  return (
    <div
      className={`min-h-screen bg-gradient-to-b from-[#fff0f5] via-white to-[#ffe4e6] font-sans pb-12 relative overflow-x-hidden ${hideScrollbar}`}
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

      {/* ================= MAIN CONTENT ================= */}
      {/* pt-8 md:pt-10 is used to give proper spacing below the global App Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-10 pb-12 relative z-10">
        {!selectedProfile ? (
          /* VIEW 1: MATCHES LIST (PREMIUM UI - HORIZONTAL CARDS) */
          <div className="max-w-4xl mx-auto space-y-5 sm:space-y-6">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#821511] font-serif flex items-center gap-2 sm:gap-3">
                Your Matches{" "}
                <Heart
                  size={24}
                  className="text-[#e02c5a] animate-pulse sm:w-7 sm:h-7"
                  fill="#e02c5a"
                />
              </h2>
              <button className="flex items-center gap-2 bg-white/80 backdrop-blur-md border border-rose-200 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold text-[#e02c5a] hover:bg-rose-50 shadow-sm transition-all">
                <Filter size={16} /> Filters
              </button>
            </div>

            {matchesData.map((profile) => (
              <div
                key={profile.id}
                onClick={() => setSelectedProfile(profile)}
                className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-3 sm:p-5 shadow-[0_8px_30px_rgba(224,44,90,0.06)] border border-rose-100 flex flex-row gap-3 sm:gap-6 hover:shadow-[0_15px_40px_rgba(224,44,90,0.12)] hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
              >
                {/* Card Image (Horizontal layout) */}
                {/* shrink-0 ensures image doesn't get squeezed */}
                <div className="relative w-[95px] sm:w-[150px] h-[130px] sm:h-[190px] shrink-0 rounded-xl sm:rounded-2xl overflow-hidden bg-rose-50 border-2 border-white shadow-md">
                  <img
                    src={profile.img}
                    alt={profile.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  <div className="absolute bottom-1.5 left-1.5 sm:bottom-2 sm:left-2">
                    <span
                      className={`text-[8px] sm:text-[10px] font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md text-white border border-white/20 backdrop-blur-sm ${profile.isOnline ? "bg-green-500/90" : "bg-gray-500/90"}`}
                    >
                      {profile.isOnline ? "Online" : "Offline"}
                    </span>
                  </div>
                  <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 flex items-center gap-0.5 bg-black/40 backdrop-blur-md text-white text-[8px] sm:text-[10px] font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md border border-white/20">
                    <Camera size={10} className="sm:w-3 sm:h-3" />{" "}
                    {profile.pics}
                  </div>
                </div>

                {/* Card Details */}
                {/* min-w-0 prevents text from overflowing and pushing the buttons out */}
                <div className="flex-1 min-w-0 flex flex-col justify-center py-1">
                  <h4 className="text-[15px] sm:text-xl font-bold text-gray-900 flex items-center gap-1 sm:gap-1.5 mb-1.5 sm:mb-2 font-serif group-hover:text-[#e02c5a] transition-colors truncate">
                    {profile.name}
                    <CheckCircle
                      size={14}
                      className="text-green-500 bg-white rounded-full shrink-0 sm:w-4 sm:h-4"
                      fill="currentColor"
                    />
                  </h4>
                  <div className="space-y-1 sm:space-y-2 text-[10px] sm:text-sm text-gray-600 font-medium">
                    <p className="flex items-center gap-1.5 truncate">
                      <User
                        size={12}
                        className="text-[#eab308] shrink-0 sm:w-3.5 sm:h-3.5"
                      />{" "}
                      {profile.age}, {profile.height}
                    </p>
                    <p className="flex items-center gap-1.5 truncate">
                      <MapPin
                        size={12}
                        className="text-[#e02c5a] shrink-0 sm:w-3.5 sm:h-3.5"
                      />{" "}
                      {profile.location}
                    </p>
                    <p className="flex items-center gap-1.5 truncate">
                      <BookOpen
                        size={12}
                        className="text-purple-500 shrink-0 sm:w-3.5 sm:h-3.5"
                      />{" "}
                      {profile.religion} • {profile.caste}
                    </p>
                    <p className="flex items-center gap-1.5 truncate">
                      <Briefcase
                        size={12}
                        className="text-blue-500 shrink-0 sm:w-3.5 sm:h-3.5"
                      />{" "}
                      {profile.profession}
                    </p>
                  </div>
                </div>

                {/* Card Actions (Fixed Sizing to prevent overflow) */}
                <div className="flex flex-col justify-center items-end gap-2.5 sm:gap-4 shrink-0 pr-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center rounded-full border border-rose-200 text-[#e02c5a] hover:bg-[#e02c5a] hover:text-white transition-all shadow-sm group/btn"
                  >
                    <Heart
                      size={16}
                      className="sm:w-6 sm:h-6 group-hover/btn:scale-110 transition-transform"
                    />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center rounded-full border border-rose-200 text-[#e02c5a] hover:bg-[#e02c5a] hover:text-white transition-all shadow-sm group/btn"
                  >
                    <MessageSquare
                      size={16}
                      className="sm:w-6 sm:h-6 group-hover/btn:scale-110 transition-transform"
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* VIEW 2: DETAILED PROFILE VIEW (PREMIUM MAGICAL UI) */
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button
              onClick={() => setSelectedProfile(null)}
              className="flex items-center gap-2 text-[#e02c5a] font-bold mb-6 transition-colors bg-white/80 backdrop-blur-md px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl border border-rose-200 shadow-sm w-fit hover:bg-rose-50 hover:-translate-x-1 text-sm sm:text-base"
            >
              <ArrowLeft size={18} /> Back to Matches
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Left Side: Photo & Locked Contacts */}
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-[0_8px_30px_rgba(224,44,90,0.06)] border border-rose-100">
                  <div className="relative h-[300px] sm:h-[400px] rounded-xl sm:rounded-2xl overflow-hidden mb-4 sm:mb-5 bg-rose-50 border-4 border-rose-50 shadow-inner">
                    <img
                      src={selectedProfile.img}
                      alt={selectedProfile.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-black/50 backdrop-blur-md text-white text-[10px] sm:text-xs font-bold px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg border border-white/20 flex items-center gap-1.5">
                      <Camera size={14} /> {selectedProfile.pics} Photos
                    </div>
                  </div>
                  <div className="flex justify-center gap-2 sm:gap-3">
                    <button className="flex-1 py-2.5 sm:py-3.5 rounded-xl border-2 border-rose-200 text-[#e02c5a] text-sm sm:text-base font-bold hover:bg-rose-50 flex justify-center items-center gap-1.5 sm:gap-2 transition-all shadow-sm">
                      <Star size={16} className="sm:w-[18px] sm:h-[18px]" />{" "}
                      Shortlist
                    </button>
                    <button className="flex-1 py-2.5 sm:py-3.5 rounded-xl bg-gradient-to-r from-[#ed2c5b] to-[#c0163e] text-white text-sm sm:text-base font-bold hover:shadow-lg hover:-translate-y-0.5 shadow-md flex justify-center items-center gap-1.5 sm:gap-2 transition-all">
                      <Heart
                        size={16}
                        fill="white"
                        className="animate-pulse sm:w-[18px] sm:h-[18px]"
                      />{" "}
                      Connect
                    </button>
                  </div>
                </div>

                {/* Locked Contact Details */}
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-xl border border-gray-700 relative overflow-hidden text-center">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10"></div>
                  <Lock
                    size={32}
                    className="text-[#fbbf24] mx-auto mb-2.5 sm:mb-3 sm:w-9 sm:h-9"
                  />
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5 sm:mb-2 font-serif">
                    Contact Details Locked
                  </h3>
                  <p className="text-gray-300 text-xs sm:text-sm mb-5 sm:mb-6 font-medium">
                    Upgrade to Premium to unlock mobile number, email, and
                    address.
                  </p>

                  <div className="space-y-2.5 sm:space-y-3 mb-5 sm:mb-6 text-left opacity-60 pointer-events-none select-none">
                    <div className="flex items-center gap-2.5 sm:gap-3 bg-black/40 p-3 sm:p-3.5 rounded-xl border border-white/10">
                      <Phone
                        size={16}
                        className="text-gray-400 sm:w-[18px] sm:h-[18px]"
                      />
                      <span className="text-gray-300 text-sm sm:text-base font-mono tracking-widest">
                        +91 ••••• •••••
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5 sm:gap-3 bg-black/40 p-3 sm:p-3.5 rounded-xl border border-white/10">
                      <Mail
                        size={16}
                        className="text-gray-400 sm:w-[18px] sm:h-[18px]"
                      />
                      <span className="text-gray-300 text-sm sm:text-base font-mono tracking-widest">
                        a••••••@gmail.com
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5 sm:gap-3 bg-black/40 p-3 sm:p-3.5 rounded-xl border border-white/10">
                      <MapPin
                        size={16}
                        className="text-gray-400 sm:w-[18px] sm:h-[18px]"
                      />
                      <span className="text-gray-300 text-sm sm:text-base font-mono tracking-widest">
                        ••••••, {selectedProfile.location.split(",")[0]}
                      </span>
                    </div>
                  </div>
                  <button className="w-full py-3 sm:py-4 rounded-xl bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] text-gray-900 font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm sm:text-lg">
                    Upgrade to Unlock
                  </button>
                </div>
              </div>

              {/* Right Side: Full Profile Details */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-[0_8px_30px_rgba(224,44,90,0.06)] border border-rose-100">
                  <div className="flex flex-col md:flex-row items-start justify-between mb-4 gap-3 sm:gap-4">
                    <div>
                      <h2 className="text-2xl sm:text-4xl font-bold text-[#821511] font-serif flex items-center gap-2 mb-1.5 sm:mb-2">
                        {selectedProfile.name}{" "}
                        <ShieldCheck
                          size={24}
                          className="text-blue-500 sm:w-7 sm:h-7"
                        />
                      </h2>
                      <p className="text-gray-500 text-sm sm:text-base font-medium">
                        Profile created for Self • Last active 2 hours ago
                      </p>
                    </div>
                    <div className="bg-green-50 text-green-700 font-bold px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm border border-green-200 flex items-center gap-1.5 shadow-sm">
                      <CheckCircle
                        size={16}
                        className="sm:w-[18px] sm:h-[18px]"
                      />{" "}
                      {selectedProfile.matchPercentage}% Match
                    </div>
                  </div>
                  <hr className="border-rose-100 my-4 sm:my-5" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3 font-serif flex items-center gap-2">
                      <Sparkles
                        size={18}
                        className="text-[#fbbf24] sm:w-5 sm:h-5"
                      />{" "}
                      About Her
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base font-medium leading-relaxed">
                      {selectedProfile.about}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  {/* Basic Details */}
                  <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-[0_8px_30px_rgba(224,44,90,0.06)] border border-rose-100">
                    <h3 className="flex items-center gap-2 text-lg sm:text-xl font-bold text-[#821511] mb-4 sm:mb-5 pb-2 sm:pb-3 border-b border-rose-100 font-serif">
                      <div className="bg-[#fff0f5] p-1.5 sm:p-2 rounded-lg text-[#e02c5a]">
                        <User size={18} className="sm:w-5 sm:h-5" />
                      </div>{" "}
                      Basic Details
                    </h3>
                    <ul className="space-y-3 sm:space-y-3.5 text-xs sm:text-sm">
                      <li className="flex justify-between">
                        <span className="text-gray-500 font-medium">Age</span>
                        <span className="font-bold text-gray-800">
                          {selectedProfile.age} Years
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-500 font-medium">
                          Height
                        </span>
                        <span className="font-bold text-gray-800">
                          {selectedProfile.height}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-500 font-medium">
                          Complexion
                        </span>
                        <span className="font-bold text-gray-800">
                          {selectedProfile.complexion}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-500 font-medium">
                          Location
                        </span>
                        <span className="font-bold text-gray-800 text-right w-1/2">
                          {selectedProfile.location}
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Religion Details */}
                  <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-[0_8px_30px_rgba(224,44,90,0.06)] border border-rose-100">
                    <h3 className="flex items-center gap-2 text-lg sm:text-xl font-bold text-[#821511] mb-4 sm:mb-5 pb-2 sm:pb-3 border-b border-rose-100 font-serif">
                      <div className="bg-[#fffbeb] p-1.5 sm:p-2 rounded-lg text-[#fbbf24]">
                        <BookOpen size={18} className="sm:w-5 sm:h-5" />
                      </div>{" "}
                      Religious Info
                    </h3>
                    <ul className="space-y-3 sm:space-y-3.5 text-xs sm:text-sm">
                      <li className="flex justify-between">
                        <span className="text-gray-500 font-medium">
                          Religion
                        </span>
                        <span className="font-bold text-gray-800">
                          {selectedProfile.religion}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-500 font-medium">Caste</span>
                        <span className="font-bold text-gray-800">
                          {selectedProfile.caste}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-500 font-medium">
                          Sub-Caste
                        </span>
                        <span className="font-bold text-gray-800">
                          {selectedProfile.subCaste}
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Career & Education */}
                  <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-[0_8px_30px_rgba(224,44,90,0.06)] border border-rose-100">
                    <h3 className="flex items-center gap-2 text-lg sm:text-xl font-bold text-[#821511] mb-4 sm:mb-5 pb-2 sm:pb-3 border-b border-rose-100 font-serif">
                      <div className="bg-blue-50 p-1.5 sm:p-2 rounded-lg text-blue-500">
                        <Briefcase size={18} className="sm:w-5 sm:h-5" />
                      </div>{" "}
                      Career & Ed.
                    </h3>
                    <ul className="space-y-3 sm:space-y-3.5 text-xs sm:text-sm">
                      <li className="flex justify-between">
                        <span className="text-gray-500 font-medium">
                          Education
                        </span>
                        <span className="font-bold text-gray-800">
                          {selectedProfile.education}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-500 font-medium">
                          Profession
                        </span>
                        <span className="font-bold text-gray-800 text-right w-1/2">
                          {selectedProfile.profession}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-500 font-medium">
                          Income
                        </span>
                        <span className="font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-md">
                          {selectedProfile.salary}
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Family Details */}
                  <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-[0_8px_30px_rgba(224,44,90,0.06)] border border-rose-100">
                    <h3 className="flex items-center gap-2 text-lg sm:text-xl font-bold text-[#821511] mb-4 sm:mb-5 pb-2 sm:pb-3 border-b border-rose-100 font-serif">
                      <div className="bg-purple-50 p-1.5 sm:p-2 rounded-lg text-purple-600">
                        <Users size={18} className="sm:w-5 sm:h-5" />
                      </div>{" "}
                      Family Details
                    </h3>
                    <ul className="space-y-3 sm:space-y-3.5 text-xs sm:text-sm mb-4 sm:mb-5">
                      <li className="flex justify-between">
                        <span className="text-gray-500 font-medium">
                          Father
                        </span>
                        <span className="font-bold text-gray-800 text-right w-1/2">
                          {selectedProfile.fatherName}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-500 font-medium">
                          Family Type
                        </span>
                        <span className="font-bold text-gray-800">
                          {selectedProfile.familyType}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-500 font-medium">
                          Members
                        </span>
                        <span className="font-bold text-gray-800">
                          {selectedProfile.familyMembers}
                        </span>
                      </li>
                    </ul>

                    {selectedProfile.siblings.length > 0 && (
                      <div className="bg-rose-50/50 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-rose-100">
                        <span className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 sm:mb-3 block">
                          Siblings ({selectedProfile.siblingCount})
                        </span>
                        {selectedProfile.siblings.map((sib, i) => (
                          <div
                            key={i}
                            className="flex justify-between text-xs sm:text-sm border-b border-rose-100 pb-2 mb-2 last:border-0 last:pb-0 last:mb-0"
                          >
                            <span className="font-bold text-gray-800">
                              {sib.name}
                            </span>
                            <span className="bg-white px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] border border-rose-100 font-bold text-[#e02c5a] shadow-sm">
                              {sib.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Matches;
