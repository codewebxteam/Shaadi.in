import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  MessageSquare,
  User,
  Camera,
  CheckCircle,
  MapPin,
  Briefcase,
  BookOpen,
  Filter,
  Sparkles,
  Flower2,
  HeartCrack,
} from "lucide-react";
import ProfileDetails from "../components/ProfileDetails";

const Matches = () => {
  const navigate = useNavigate();
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 🔥 Real matches + Local liked matches
  const [matchesData, setMatchesData] = useState([]);

  // 🔥 Extended Dummy Data (Backup ke liye)
  const dummyMatches = [
    {
      id: "m1",
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
      siblings: [{ name: "Rahul", status: "Married" }],
      about: "I am a simple, caring, and understanding person.",
      isOnline: true,
      matchPercentage: 92,
      pics: 5,
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "m2",
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
      siblings: [{ name: "Arjun", status: "Single" }],
      about: "Passionate about my career in medicine. Love traveling.",
      isOnline: true,
      matchPercentage: 88,
      pics: 6,
      img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "m3",
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
      about: "Independent and career-oriented.",
      isOnline: false,
      matchPercentage: 85,
      pics: 3,
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
  ];

  // 🔥 FETCH LIKED MATCHES
  useEffect(() => {
    const fetchMyMatches = async () => {
      try {
        const localLiked =
          JSON.parse(localStorage.getItem("likedProfilesData")) || [];

        // Agar real matches aur local likes dono empty hain, tabhi dummy dikhaao
        if (localLiked.length === 0) {
          setMatchesData(dummyMatches);
        } else {
          // Reverse taaki latest like upar aaye
          setMatchesData(localLiked.reverse());
        }

        setTimeout(() => setIsLoading(false), 800);
      } catch (error) {
        console.error("Error fetching matches:", error);
        setMatchesData(dummyMatches);
        setIsLoading(false);
      }
    };

    fetchMyMatches();
  }, []);

  // 🔥 UNLIKE LOGIC (Confirmation + State Update + LocalStorage Update)
  const handleUnlike = (e, profileId, profileName) => {
    e.stopPropagation(); // Card click ko roko

    // Confirmation popup
    const confirmUnlike = window.confirm(
      `Are you sure you want to unlike ${profileName}?`,
    );

    if (confirmUnlike) {
      // 1. LocalStorage se delete karo
      const existingLikes =
        JSON.parse(localStorage.getItem("likedProfilesData")) || [];
      const updatedLikes = existingLikes.filter((p) => p.id !== profileId);
      localStorage.setItem("likedProfilesData", JSON.stringify(updatedLikes));

      // 2. UI/State se turant hatao
      setMatchesData((prev) => prev.filter((p) => p.id !== profileId));

      // Optional: Backend API call to unlike
      // await fetch('/api/unlike', { ... });
    }
  };

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
        .animate-gentle { animation: gentle-bounce 4s ease-in-out infinite; }
        .slide-up-fade {
          animation: slideUpFade 0.6s ease-out forwards;
          opacity: 0;
          transform: translateY(20px);
        }
        @keyframes slideUpFade {
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[10%] -right-[5%] w-[400px] h-[400px] rounded-full bg-[#e02c5a]/10 blur-[90px]"></div>
        <div className="absolute top-[40%] -left-[10%] w-[500px] h-[500px] rounded-full bg-[#fbbf24]/10 blur-[90px]"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[300px] h-[300px] rounded-full bg-rose-200/20 blur-[60px]"></div>

        <div className="absolute top-[15%] left-[5%] opacity-15 animate-gentle">
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
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-10 pb-12 relative z-10">
        {!selectedProfile ? (
          /* ================= VIEW 1: MATCHES LIST ================= */
          <div className="max-w-4xl mx-auto space-y-5 sm:space-y-6">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <div>
                <h2 className="text-2xl sm:text-4xl font-bold text-[#821511] font-serif flex items-center gap-2 sm:gap-3">
                  Your Matches{" "}
                  <Heart
                    size={28}
                    className="text-[#e02c5a] animate-pulse sm:w-8 sm:h-8"
                    fill="#e02c5a"
                  />
                </h2>
                <p className="text-sm text-gray-500 font-medium mt-1.5">
                  Profiles you have liked. Waiting for them to like back!
                </p>
              </div>
              <button className="flex items-center gap-2 bg-white/80 backdrop-blur-md border border-rose-200 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold text-[#e02c5a] hover:bg-rose-50 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
                <Filter size={16} /> Filters
              </button>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-20">
                <Sparkles className="animate-spin text-[#e02c5a]" size={36} />
              </div>
            ) : matchesData.length === 0 ? (
              <div className="bg-white/80 backdrop-blur-md rounded-3xl p-12 text-center border border-rose-100 shadow-[0_10px_40px_rgba(224,44,90,0.05)] slide-up-fade">
                <HeartCrack size={56} className="mx-auto text-rose-200 mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2 font-serif">
                  No Matches Left
                </h3>
                <p className="text-gray-500 font-medium max-w-md mx-auto">
                  Go back to the Dashboard and start liking profiles to build
                  your matches here!
                </p>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="mt-6 bg-gradient-to-r from-[#ed2c5b] to-[#c0163e] text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                  Find Matches
                </button>
              </div>
            ) : (
              matchesData.map((profile, index) => (
                <div
                  key={profile.id}
                  onClick={() => setSelectedProfile(profile)}
                  className="slide-up-fade bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-[2rem] p-3 sm:p-5 shadow-[0_8px_30px_rgba(224,44,90,0.06)] border border-rose-100/50 flex flex-row gap-3 sm:gap-6 hover:shadow-[0_20px_50px_rgba(224,44,90,0.15)] hover:-translate-y-1.5 hover:border-rose-200 transition-all duration-300 cursor-pointer group"
                  style={{ animationDelay: `${index * 0.1}s` }} // Staggered entrance animation
                >
                  {/* Card Image */}
                  <div className="relative w-[100px] sm:w-[160px] h-[140px] sm:h-[200px] shrink-0 rounded-xl sm:rounded-[1.5rem] overflow-hidden bg-rose-50 border-4 border-white shadow-lg z-10 group-hover:border-rose-50 transition-colors">
                    <img
                      src={profile.img}
                      alt={profile.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90"></div>
                    <div className="absolute bottom-2 left-2">
                      <span
                        className={`text-[9px] sm:text-[10px] font-bold px-2 py-1 rounded-lg text-white border border-white/20 backdrop-blur-md flex items-center gap-1.5 shadow-sm ${profile.isOnline ? "bg-green-500/80" : "bg-gray-600/80"}`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${profile.isOnline ? "bg-white animate-pulse" : "bg-gray-400"}`}
                        ></span>
                        {profile.isOnline ? "Online" : "Offline"}
                      </span>
                    </div>
                  </div>

                  {/* Card Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-center py-1 z-10">
                    <h4 className="text-[17px] sm:text-2xl font-bold text-gray-900 flex items-center gap-1.5 sm:gap-2 mb-2 font-serif group-hover:text-[#e02c5a] transition-colors truncate">
                      {profile.name}
                      <CheckCircle
                        size={16}
                        className="text-blue-500 bg-blue-50 rounded-full shrink-0 sm:w-5 sm:h-5"
                        fill="currentColor"
                      />
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-2 text-[11px] sm:text-[14px] text-gray-600 font-medium">
                      <p className="flex items-center gap-2 truncate">
                        <User size={14} className="text-[#eab308] shrink-0" />{" "}
                        {profile.age} Yrs, {profile.height}
                      </p>
                      <p className="flex items-center gap-2 truncate">
                        <MapPin size={14} className="text-[#e02c5a] shrink-0" />{" "}
                        {profile.location}
                      </p>
                      <p className="flex items-center gap-2 truncate">
                        <BookOpen
                          size={14}
                          className="text-purple-500 shrink-0"
                        />{" "}
                        {profile.religion} • {profile.caste}
                      </p>
                      <p className="flex items-center gap-2 truncate">
                        <Briefcase
                          size={14}
                          className="text-emerald-500 shrink-0"
                        />{" "}
                        {profile.profession}
                      </p>
                    </div>
                  </div>

                  {/* Actions (Like/Unlike & Message) */}
                  <div className="flex flex-col justify-center items-end gap-3 sm:gap-4 shrink-0 pr-1 z-20">
                    {/* 🔥 UNLIKE BUTTON 🔥 */}
                    <button
                      onClick={(e) => handleUnlike(e, profile.id, profile.name)}
                      title="Unlike Profile"
                      className="w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center rounded-full border-2 border-[#e02c5a] bg-[#e02c5a] text-white shadow-[0_5px_15px_rgba(224,44,90,0.3)] hover:bg-white hover:text-[#e02c5a] transition-all duration-300 group/btn"
                    >
                      <Heart
                        size={18}
                        className="sm:w-7 sm:h-7 fill-white group-hover/btn:fill-transparent transition-all duration-300 group-hover/btn:scale-90"
                      />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        alert("Upgrade to Premium to send a direct message!");
                      }}
                      title="Send Message"
                      className="w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center rounded-full border-2 border-rose-200 text-[#e02c5a] hover:bg-gradient-to-r hover:from-rose-50 hover:to-pink-50 transition-all shadow-sm group/msg"
                    >
                      <MessageSquare
                        size={18}
                        className="sm:w-7 sm:h-7 group-hover/msg:scale-110 transition-transform"
                      />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          /* ================= VIEW 2: FULL PROFILE VIEW ================= */
          <ProfileDetails
            profile={selectedProfile}
            onBack={() => setSelectedProfile(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Matches;
