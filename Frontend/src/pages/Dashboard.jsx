import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  Search,
  ChevronDown,
  User,
  Camera,
  CheckCircle,
  Filter,
  MapPin,
  Sparkles,
  Flower2,
  BookOpen,
  Briefcase,
} from "lucide-react";
import ProfileDetails from "../components/ProfileDetails";

const Dashboard = () => {
  const navigate = useNavigate();

  // 🔥 1. MOCK CURRENT USER
  const [currentUser, setCurrentUser] = useState({
    id: "current_123",
    gender: "Male",
    religion: "Hindu",
  });

  // 🔥 STATES
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [realProfiles, setRealProfiles] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoading, setIsLoading] = useState(true);

  // 🔥 LIKES STATE FROM LOCAL STORAGE
  const [likedProfiles, setLikedProfiles] = useState(() => {
    const savedLikes =
      JSON.parse(localStorage.getItem("likedProfilesData")) || [];
    return new Set(savedLikes.map((profile) => profile.id));
  });

  // 🔥 FILTERS STATE
  const [filters, setFilters] = useState({
    searchDistrict: "",
    ageGroup: "All",
    occupation: "All",
    religion: currentUser.religion,
    maritalStatus: "All",
  });

  // 🔥 2. EXTENDED DUMMY DATA (Online/Offline Hata Diya Gaya Hai)
  const dummyProfiles = [
    {
      id: "d1",
      name: "Anjali Sharma",
      gender: "Female",
      age: 25,
      height: "5'4\"",
      maritalStatus: "Single",
      location: "Lucknow, UP",
      religion: "Hindu",
      caste: "Brahmin",
      subCaste: "Gaur",
      education: "B.Tech",
      profession: "Software Engineer",
      occupation: "Private Job",
      salary: "₹ 6 LPA",
      familyType: "Nuclear",
      familyMembers: 4,
      siblingCount: 1,
      siblings: [{ name: "Rahul", status: "Single" }],
      about: "Looking for a caring and understanding partner.",
      matchPercentage: 92,
      pics: 5,
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "d2",
      name: "Priya Singh",
      gender: "Female",
      age: 24,
      height: "5'2\"",
      maritalStatus: "Single",
      location: "Delhi",
      religion: "Hindu",
      caste: "Rajput",
      subCaste: "Chauhan",
      education: "MBBS",
      profession: "Doctor",
      occupation: "Government Job",
      salary: "₹ 8 LPA",
      familyType: "Joint",
      familyMembers: 6,
      siblingCount: 2,
      siblings: [],
      about: "Passionate about my career in medicine.",
      matchPercentage: 88,
      pics: 6,
      img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "d3",
      name: "Neha Verma",
      gender: "Female",
      age: 28,
      height: "5'5\"",
      maritalStatus: "Divorced",
      location: "Prayagraj, UP",
      religion: "Hindu",
      caste: "Kayastha",
      subCaste: "Srivastava",
      education: "CA",
      profession: "Chartered Acct.",
      occupation: "Private Job",
      salary: "₹ 12 LPA",
      familyType: "Nuclear",
      familyMembers: 3,
      siblingCount: 0,
      siblings: [],
      about: "Independent and career-oriented.",
      matchPercentage: 80,
      pics: 3,
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "d4",
      name: "Sneha Mishra",
      gender: "Female",
      age: 26,
      height: "5'3\"",
      maritalStatus: "Single",
      location: "Lucknow, UP",
      religion: "Hindu",
      caste: "Brahmin",
      subCaste: "Mishra",
      education: "MBA",
      profession: "HR Manager",
      occupation: "Private Job",
      salary: "₹ 5 LPA",
      familyType: "Nuclear",
      familyMembers: 5,
      siblingCount: 1,
      siblings: [],
      about: "Love traveling and exploring.",
      matchPercentage: 85,
      pics: 4,
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "d5",
      name: "Kavya Tiwari",
      gender: "Female",
      age: 25,
      height: "5'6\"",
      maritalStatus: "Single",
      location: "Ayodhya, UP",
      religion: "Hindu",
      caste: "Brahmin",
      subCaste: "Tiwari",
      education: "B.Ed",
      profession: "Teacher",
      occupation: "Government Job",
      salary: "₹ 4 LPA",
      familyType: "Joint",
      familyMembers: 8,
      siblingCount: 2,
      siblings: [],
      about: "Traditional with modern values.",
      matchPercentage: 90,
      pics: 5,
      img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "d6",
      name: "Zoya Khan",
      gender: "Female",
      age: 26,
      height: "5'5\"",
      maritalStatus: "Single",
      location: "Lucknow, UP",
      religion: "Muslim",
      caste: "Pathan",
      subCaste: "-",
      education: "B.Des",
      profession: "Interior Designer",
      occupation: "Business",
      salary: "₹ 6 LPA",
      familyType: "Nuclear",
      familyMembers: 4,
      siblingCount: 1,
      siblings: [],
      about: "Creative and ambitious.",
      matchPercentage: 75,
      pics: 4,
      img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "d7",
      name: "Pooja Chaurasia",
      gender: "Female",
      age: 24,
      height: "5'1\"",
      maritalStatus: "Single",
      location: "Sant Kabir Nagar",
      religion: "Hindu",
      caste: "Chaurasia",
      subCaste: "-",
      education: "B.Com",
      profession: "Bank PO",
      occupation: "Government Job",
      salary: "₹ 7 LPA",
      familyType: "Nuclear",
      familyMembers: 5,
      siblingCount: 2,
      siblings: [],
      about: "Simple girl from a good family.",
      matchPercentage: 88,
      pics: 3,
      img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "d8",
      name: "Shruti Agarwal",
      gender: "Female",
      age: 29,
      height: "5'4\"",
      maritalStatus: "Widowed",
      location: "Delhi",
      religion: "Hindu",
      caste: "Baniya",
      subCaste: "Agarwal",
      education: "M.Tech",
      profession: "UI/UX Designer",
      occupation: "Private Job",
      salary: "₹ 15 LPA",
      familyType: "Nuclear",
      familyMembers: 3,
      siblingCount: 0,
      siblings: [],
      about: "Looking for a fresh start.",
      matchPercentage: 82,
      pics: 6,
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "d9",
      name: "Riya Sharma",
      gender: "Female",
      age: 23,
      height: "5'3\"",
      maritalStatus: "Single",
      location: "Kanpur, UP",
      religion: "Hindu",
      caste: "Brahmin",
      subCaste: "Sharma",
      education: "BA",
      profession: "Not Working",
      occupation: "Not Working",
      salary: "-",
      familyType: "Joint",
      familyMembers: 7,
      siblingCount: 2,
      siblings: [],
      about: "Family oriented.",
      matchPercentage: 85,
      pics: 4,
      img: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "d10",
      name: "Megha Soni",
      gender: "Female",
      age: 31,
      height: "5'5\"",
      maritalStatus: "Divorced",
      location: "Varanasi, UP",
      religion: "Hindu",
      caste: "Sunar",
      subCaste: "Soni",
      education: "MBA",
      profession: "Boutique Owner",
      occupation: "Business",
      salary: "₹ 8 LPA",
      familyType: "Nuclear",
      familyMembers: 3,
      siblingCount: 1,
      siblings: [],
      about: "I run my own business.",
      matchPercentage: 78,
      pics: 5,
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "d11",
      name: "Kritika Sharma",
      gender: "Female",
      age: 27,
      height: "5'6\"",
      maritalStatus: "Single",
      location: "Lucknow, UP",
      religion: "Hindu",
      caste: "Brahmin",
      subCaste: "Sharma",
      education: "PhD",
      profession: "Professor",
      occupation: "Government Job",
      salary: "₹ 9 LPA",
      familyType: "Nuclear",
      familyMembers: 4,
      siblingCount: 1,
      siblings: [],
      about: "Love reading and teaching.",
      matchPercentage: 94,
      pics: 7,
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "d12",
      name: "Shalini Gupta",
      gender: "Female",
      age: 25,
      height: "5'2\"",
      maritalStatus: "Single",
      location: "Noida, UP",
      religion: "Hindu",
      caste: "Baniya",
      subCaste: "Gupta",
      education: "B.Com",
      profession: "Financial Analyst",
      occupation: "Private Job",
      salary: "₹ 8 LPA",
      familyType: "Joint",
      familyMembers: 5,
      siblingCount: 1,
      siblings: [],
      about: "Ambitious and fun.",
      matchPercentage: 86,
      pics: 4,
      img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "d13",
      name: "Divya Rastogi",
      gender: "Female",
      age: 24,
      height: "5'4\"",
      maritalStatus: "Single",
      location: "Lucknow, UP",
      religion: "Hindu",
      caste: "Rastogi",
      subCaste: "-",
      education: "B.Pharma",
      profession: "Pharmacist",
      occupation: "Private Job",
      salary: "₹ 4 LPA",
      familyType: "Nuclear",
      familyMembers: 4,
      siblingCount: 2,
      siblings: [],
      about: "Caring nature.",
      matchPercentage: 81,
      pics: 3,
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "d14",
      name: "Akanksha Rajput",
      gender: "Female",
      age: 26,
      height: "5'5\"",
      maritalStatus: "Single",
      location: "Agra, UP",
      religion: "Hindu",
      caste: "Rajput",
      subCaste: "Chauhan",
      education: "B.Arch",
      profession: "Architect",
      occupation: "Business",
      salary: "₹ 10 LPA",
      familyType: "Nuclear",
      familyMembers: 5,
      siblingCount: 1,
      siblings: [],
      about: "I love designing spaces.",
      matchPercentage: 89,
      pics: 6,
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "d15",
      name: "Sara Thomas",
      gender: "Female",
      age: 27,
      height: "5'6\"",
      maritalStatus: "Single",
      location: "Delhi",
      religion: "Christian",
      caste: "Catholic",
      subCaste: "-",
      education: "MA English",
      profession: "Journalist",
      occupation: "Private Job",
      salary: "₹ 7 LPA",
      familyType: "Nuclear",
      familyMembers: 3,
      siblingCount: 1,
      siblings: [],
      about: "Love writing and exploring stories.",
      matchPercentage: 72,
      pics: 5,
      img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "d16",
      name: "Rajat Verma",
      gender: "Male",
      age: 28,
      height: "5'10\"",
      maritalStatus: "Single",
      location: "Lucknow, UP",
      religion: "Hindu",
      caste: "Kayastha",
      subCaste: "Verma",
      education: "B.Tech",
      profession: "DevOps",
      occupation: "Private Job",
      salary: "₹ 12 LPA",
      familyType: "Nuclear",
      familyMembers: 4,
      siblingCount: 0,
      siblings: [],
      about: "Tech enthusiast.",
      matchPercentage: 80,
      pics: 3,
      img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
  ];

  // 🔥 3. REAL-TIME DATA FETCHING (MongoDB se aayega)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const API_URL =
          import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api/auth";

        // JAB PRODUCTION PAR JAYEIN, IS COMMENT KO HATA DEIN:
        /*
        const res = await fetch(`${API_URL}/all-users`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
           const mappedUsers = data.users.map(u => ({
              ...u,
              id: u._id,
              img: u.profileImage || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
              matchPercentage: Math.floor(Math.random() * (95 - 75 + 1)) + 75,
              pics: 1
           }));
           setRealProfiles(mappedUsers);
        }
        */

        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching real users:", error);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const allProfiles = [...realProfiles, ...dummyProfiles];

  // 🔥 4. AUTO MATCHING & USER FILTERS (Strict Gender Rules)
  const filteredProfiles = useMemo(() => {
    return allProfiles.filter((profile) => {
      // 🔥 STRICT GENDER LOGIC: Sirf opposite gender dikhega!
      const targetGender = currentUser.gender === "Male" ? "Female" : "Male";
      // Agar backend se gender missing hai ya match nahi kar raha toh turant reject karega
      if (
        !profile.gender ||
        profile.gender.toLowerCase() !== targetGender.toLowerCase()
      ) {
        return false;
      }

      // Logic 2: Religion
      if (filters.religion !== "All" && profile.religion !== filters.religion)
        return false;

      // Logic 3: Location / Name Search
      if (filters.searchDistrict) {
        const searchTerm = filters.searchDistrict.toLowerCase();
        if (
          !profile.location.toLowerCase().includes(searchTerm) &&
          !profile.name.toLowerCase().includes(searchTerm)
        ) {
          return false;
        }
      }

      // Logic 4: Age Group
      if (filters.ageGroup !== "All") {
        const [min, max] = filters.ageGroup.split("-").map(Number);
        if (max) {
          if (profile.age < min || profile.age > max) return false;
        } else {
          if (profile.age < 35) return false;
        }
      }

      // Logic 5: Occupation
      if (
        filters.occupation !== "All" &&
        profile.occupation !== filters.occupation
      )
        return false;

      // Logic 6: Marital Status
      if (
        filters.maritalStatus !== "All" &&
        profile.maritalStatus !== filters.maritalStatus
      )
        return false;

      return true;
    });
  }, [filters, currentUser, allProfiles]);

  // Infinite Scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 300
      ) {
        setVisibleCount((prevCount) =>
          Math.min(prevCount + 4, filteredProfiles.length),
        );
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [filteredProfiles.length]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // 🔥 5. LIKE LOGIC
  const handleLike = async (e, profile) => {
    e.stopPropagation();

    if (!likedProfiles.has(profile.id)) {
      setLikedProfiles((prev) => new Set(prev).add(profile.id));

      const existingLikes =
        JSON.parse(localStorage.getItem("likedProfilesData")) || [];

      if (!existingLikes.some((p) => p.id === profile.id)) {
        const updatedLikes = [...existingLikes, profile];
        localStorage.setItem("likedProfilesData", JSON.stringify(updatedLikes));
      }

      try {
        const token = localStorage.getItem("token");
        const API_URL =
          import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api/auth";

        /*
        await fetch(`${API_URL}/like-profile`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ likedUserId: profile.id })
        });
        */

        alert(
          `💖 You liked ${profile.name}! A match request notification has been sent.`,
        );
      } catch (error) {
        console.error("Like API failed:", error);
      }
    }
  };

  const hideScrollbar =
    "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]";

  return (
    <div
      className={`min-h-screen bg-gradient-to-b from-[#fff0f5] via-white to-[#ffe4e6] font-sans pb-12 relative overflow-x-hidden ${hideScrollbar}`}
    >
      {/* ================= BACKGROUND ANIMATIONS ================= */}
      <style>{`
        @keyframes gentle-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-gentle { animation: gentle-bounce 4s ease-in-out infinite; }
        .heart-beat { animation: heart-beat 1s infinite alternate; }
        @keyframes heart-beat {
          0% { transform: scale(1); }
          100% { transform: scale(1.15); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in-up 0.8s ease-out forwards; }
      `}</style>

      <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[10%] -right-[5%] w-[400px] h-[400px] rounded-full bg-[#e02c5a]/10 blur-[90px]"></div>
        <div className="absolute top-[40%] -left-[10%] w-[500px] h-[500px] rounded-full bg-[#fbbf24]/10 blur-[90px]"></div>
        <div className="absolute top-[15%] left-[5%] opacity-15 animate-gentle">
          <Heart
            size={50}
            fill="#e02c5a"
            color="#e02c5a"
            className="-rotate-12"
          />
        </div>
        <div className="absolute top-[60%] right-[8%] opacity-15 animate-gentle">
          <Heart
            size={70}
            fill="#fbbf24"
            color="#fbbf24"
            className="rotate-12"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-10 pb-12 relative z-10">
        {!selectedProfile ? (
          <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-500">
            {/* 🔥 HERO DESKTOP TITLE 🔥 */}
            <div className="hidden md:flex flex-col items-center justify-center text-center mb-10 mt-4">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="text-[#fbbf24]" size={20} />
                <span className="text-[#e02c5a] font-bold tracking-widest text-xs uppercase">
                  Discover True Love
                </span>
                <Sparkles className="text-[#fbbf24]" size={20} />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 font-serif">
                Perfect Matches{" "}
                <span className="text-[#e02c5a]">Just For You 💖</span>
              </h2>
            </div>

            {/* 🔥 DESKTOP FILTER BAR 🔥 */}
            <div className="hidden md:flex bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_10px_40px_rgba(224,44,90,0.1)] p-6 border border-rose-100 items-center justify-between gap-4">
              {/* Search */}
              <div className="flex-1 border-r border-rose-100 pr-4">
                <label className="text-xs text-gray-400 font-bold uppercase tracking-wider block mb-1">
                  Search Area
                </label>
                <div className="flex items-center group relative">
                  <input
                    type="text"
                    name="searchDistrict"
                    value={filters.searchDistrict}
                    onChange={handleFilterChange}
                    placeholder="e.g. Kanpur"
                    className="w-full bg-transparent border-none text-sm font-bold text-gray-800 focus:outline-none placeholder:text-gray-300"
                  />
                </div>
              </div>

              {/* Religion */}
              <div className="flex-1 border-r border-rose-100 px-4">
                <label className="text-xs text-gray-400 font-bold uppercase tracking-wider block mb-1">
                  Religion
                </label>
                <div className="flex items-center justify-between relative group">
                  <select
                    name="religion"
                    value={filters.religion}
                    onChange={handleFilterChange}
                    className="w-full appearance-none bg-transparent border-none text-sm font-bold text-gray-800 focus:outline-none cursor-pointer group-hover:text-[#e02c5a] transition-colors"
                  >
                    <option value="All">All Religion</option>
                    <option value="Hindu">Hindu</option>
                    <option value="Muslim">Muslim</option>
                    <option value="Sikh">Sikh</option>
                    <option value="Christian">Christian</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-0 text-[#e02c5a] pointer-events-none"
                  />
                </div>
              </div>

              {/* Age */}
              <div className="flex-1 border-r border-rose-100 px-4">
                <label className="text-xs text-gray-400 font-bold uppercase tracking-wider block mb-1">
                  Age Group
                </label>
                <div className="flex items-center justify-between relative group">
                  <select
                    name="ageGroup"
                    value={filters.ageGroup}
                    onChange={handleFilterChange}
                    className="w-full appearance-none bg-transparent border-none text-sm font-bold text-gray-800 focus:outline-none cursor-pointer group-hover:text-[#e02c5a] transition-colors"
                  >
                    <option value="All">Any Age</option>
                    <option value="18-22">18 - 22 Yrs</option>
                    <option value="23-26">23 - 26 Yrs</option>
                    <option value="27-30">27 - 30 Yrs</option>
                    <option value="31-35">31 - 35 Yrs</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-0 text-[#e02c5a] pointer-events-none"
                  />
                </div>
              </div>

              {/* Job */}
              <div className="flex-1 border-r border-rose-100 px-4">
                <label className="text-xs text-gray-400 font-bold uppercase tracking-wider block mb-1">
                  Job Type
                </label>
                <div className="flex items-center justify-between relative group">
                  <select
                    name="occupation"
                    value={filters.occupation}
                    onChange={handleFilterChange}
                    className="w-full appearance-none bg-transparent border-none text-sm font-bold text-gray-800 focus:outline-none cursor-pointer group-hover:text-[#e02c5a] transition-colors"
                  >
                    <option value="All">Any Job</option>
                    <option value="Private Job">Private</option>
                    <option value="Government Job">Government</option>
                    <option value="Business">Business</option>
                    <option value="Not Working">Not Working</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-0 text-[#e02c5a] pointer-events-none"
                  />
                </div>
              </div>

              {/* Marital Status */}
              <div className="flex-1 px-4">
                <label className="text-xs text-gray-400 font-bold uppercase tracking-wider block mb-1">
                  Marital Status
                </label>
                <div className="flex items-center justify-between relative group">
                  <select
                    name="maritalStatus"
                    value={filters.maritalStatus}
                    onChange={handleFilterChange}
                    className="w-full appearance-none bg-transparent border-none text-sm font-bold text-gray-800 focus:outline-none cursor-pointer group-hover:text-[#e02c5a] transition-colors"
                  >
                    <option value="All">Any Status</option>
                    <option value="Single">Single</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-0 text-[#e02c5a] pointer-events-none"
                  />
                </div>
              </div>
            </div>

            {/* 🔥 MOBILE FILTER BAR 🔥 */}
            <div className="md:hidden bg-white/80 backdrop-blur-md rounded-2xl p-4 mb-4 shadow-sm border border-rose-100">
              <div className="relative mb-3">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#e02c5a]"
                />
                <input
                  type="text"
                  name="searchDistrict"
                  value={filters.searchDistrict}
                  onChange={handleFilterChange}
                  placeholder="Search city or name..."
                  className="w-full pl-11 pr-4 py-3 bg-white rounded-xl border border-rose-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#e02c5a]/20"
                />
              </div>
              <div
                className={`flex overflow-x-auto gap-2 pb-1 ${hideScrollbar}`}
              >
                <div className="relative shrink-0">
                  <select
                    name="religion"
                    value={filters.religion}
                    onChange={handleFilterChange}
                    className="appearance-none pl-3 pr-7 py-2 bg-[#fff0f5] border border-[#e02c5a] rounded-xl text-xs font-bold text-[#e02c5a] focus:outline-none"
                  >
                    <option value="All">Religion: All</option>
                    <option value="Hindu">Hindu</option>
                    <option value="Muslim">Muslim</option>
                  </select>
                  <ChevronDown
                    size={14}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-[#e02c5a] pointer-events-none"
                  />
                </div>
                <div className="relative shrink-0">
                  <select
                    name="ageGroup"
                    value={filters.ageGroup}
                    onChange={handleFilterChange}
                    className="appearance-none pl-3 pr-7 py-2 bg-white border border-rose-200 rounded-xl text-xs font-bold text-gray-700 shadow-sm focus:outline-none focus:border-[#e02c5a]"
                  >
                    <option value="All">Age: All</option>
                    <option value="18-22">18 - 22</option>
                    <option value="23-26">23 - 26</option>
                  </select>
                  <ChevronDown
                    size={14}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-[#e02c5a] pointer-events-none"
                  />
                </div>
                <div className="relative shrink-0">
                  <select
                    name="occupation"
                    value={filters.occupation}
                    onChange={handleFilterChange}
                    className="appearance-none pl-3 pr-7 py-2 bg-white border border-rose-200 rounded-xl text-xs font-bold text-gray-700 shadow-sm focus:outline-none focus:border-[#e02c5a]"
                  >
                    <option value="All">Job: All</option>
                    <option value="Private Job">Private</option>
                    <option value="Government Job">Govt.</option>
                  </select>
                  <ChevronDown
                    size={14}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-[#e02c5a] pointer-events-none"
                  />
                </div>
              </div>
            </div>

            {/* 🔥 TITLE FOR MOBILE 🔥 */}
            <div className="md:hidden flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-[#821511] font-serif flex items-center gap-2">
                Your Matches{" "}
                <Heart
                  size={24}
                  className="text-[#e02c5a] animate-pulse"
                  fill="#e02c5a"
                />
              </h2>
            </div>

            {/* 🔥 GRID 🔥 */}
            {isLoading ? (
              <div className="flex justify-center py-20">
                <Sparkles className="animate-spin text-[#e02c5a]" size={36} />
              </div>
            ) : filteredProfiles.length === 0 ? (
              <div className="bg-white/80 backdrop-blur-md rounded-3xl p-10 text-center border border-rose-100 shadow-sm max-w-2xl mx-auto">
                <Filter size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  No Matches Found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your filters to see more profiles.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 pb-10">
                {filteredProfiles.slice(0, visibleCount).map((profile) => {
                  const isLiked = likedProfiles.has(profile.id);

                  return (
                    <div
                      key={profile.id}
                      onClick={() => setSelectedProfile(profile)}
                      className="animate-fade-in bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-[28px] p-3 sm:p-5 shadow-[0_8px_30px_rgba(224,44,90,0.06)] border border-rose-100 flex flex-row gap-3 sm:gap-6 hover:shadow-[0_15px_40px_rgba(224,44,90,0.12)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer group"
                    >
                      {/* Image Container (Online/Offline Removed) */}
                      <div className="relative w-[100px] sm:w-[150px] h-[140px] sm:h-[190px] shrink-0 rounded-xl sm:rounded-2xl overflow-hidden bg-rose-50 border-2 border-white shadow-md z-10">
                        <img
                          src={profile.img}
                          alt={profile.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                        <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 flex items-center gap-0.5 bg-black/40 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md border border-white/20">
                          <Camera size={10} className="sm:w-3 sm:h-3" />{" "}
                          {profile.pics}
                        </div>
                      </div>

                      {/* Info & Button Container */}
                      <div className="flex-1 min-w-0 flex flex-col justify-center py-1 z-10">
                        <h4 className="text-[16px] sm:text-xl font-bold text-gray-900 flex items-center gap-1 sm:gap-1.5 mb-1 sm:mb-2 font-serif group-hover:text-[#e02c5a] transition-colors truncate">
                          {profile.name}
                          <CheckCircle
                            size={14}
                            className="text-green-500 bg-white rounded-full shrink-0 sm:w-4 sm:h-4"
                            fill="currentColor"
                          />
                        </h4>
                        <div className="space-y-1 sm:space-y-1.5 text-[11px] sm:text-[13px] text-gray-600 font-medium">
                          <p className="flex items-center gap-1.5 truncate">
                            <User
                              size={12}
                              className="text-[#eab308] shrink-0 sm:w-3.5 sm:h-3.5"
                            />{" "}
                            {profile.age} Yrs, {profile.height}
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

                      {/* Like Action */}
                      <div className="flex flex-col justify-center items-end shrink-0 pr-1 z-20">
                        <button
                          onClick={(e) => handleLike(e, profile)}
                          className={`w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center rounded-full border transition-all shadow-sm group/btn
                            ${isLiked ? "bg-[#e02c5a] border-[#e02c5a]" : "bg-white border-rose-200 hover:bg-[#e02c5a] hover:border-[#e02c5a]"}`}
                        >
                          <Heart
                            size={16}
                            className={`sm:w-6 sm:h-6 transition-transform ${isLiked ? "text-white fill-white heart-beat" : "text-[#e02c5a] group-hover/btn:text-white group-hover/btn:scale-110"}`}
                          />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Infinite Scroll Loader */}
            {visibleCount < filteredProfiles.length && (
              <div className="flex justify-center items-center py-6 gap-2 text-[#e02c5a] font-bold">
                <Sparkles size={20} className="animate-spin" /> Fetching more
                matches...
              </div>
            )}
          </div>
        ) : (
          /* 🔥 VIEW 2: FULL PROFILE COMPONENT 🔥 */
          <ProfileDetails
            profile={selectedProfile}
            onBack={() => setSelectedProfile(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
