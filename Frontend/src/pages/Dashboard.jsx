import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  Search,
  ChevronDown,
  User,
  Camera,
  CheckCircle,
  Filter,
  SlidersHorizontal,
  MapPin,
  Sparkles,
  Flower2,
  BookOpen,
  Briefcase,
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  // 🔥 State for Liked Profiles & Infinite Scroll
  const [likedProfiles, setLikedProfiles] = useState(new Set());
  const [visibleCount, setVisibleCount] = useState(6);

  // 🔥 30 Dummy Profiles Data (No Backend changes)
  const allRecommendedProfiles = [
    {
      id: 1,
      name: "Anjali Sharma",
      age: 25,
      location: "Lucknow, UP",
      religion: "Hindu",
      caste: "Brahmin",
      profession: "Software Engineer",
      salary: "₹ 6 LPA",
      isOnline: true,
      pics: 5,
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      name: "Rohit Singhania",
      age: 28,
      location: "Kanpur, UP",
      religion: "Hindu",
      caste: "Kshatriya",
      profession: "Data Scientist",
      salary: "₹ 12 LPA",
      isOnline: true,
      pics: 4,
      img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 3,
      name: "Priya Singh",
      age: 24,
      location: "Delhi",
      religion: "Hindu",
      caste: "Rajput",
      profession: "Doctor",
      salary: "₹ 8 LPA",
      isOnline: true,
      pics: 6,
      img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 4,
      name: "Vikram Patel",
      age: 29,
      location: "Varanasi, UP",
      religion: "Hindu",
      caste: "Patel",
      profession: "Business Analyst",
      salary: "₹ 7.5 LPA",
      isOnline: false,
      pics: 3,
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 5,
      name: "Neha Verma",
      age: 24,
      location: "Prayagraj, UP",
      religion: "Hindu",
      caste: "Kayastha",
      profession: "Chartered Accountant",
      salary: "₹ 6.5 LPA",
      isOnline: true,
      pics: 3,
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 6,
      name: "Aman Gupta",
      age: 27,
      location: "Noida, UP",
      religion: "Hindu",
      caste: "Baniya",
      profession: "Marketing Executive",
      salary: "₹ 9 LPA",
      isOnline: false,
      pics: 4,
      img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 7,
      name: "Sneha Mishra",
      age: 26,
      location: "Lucknow, UP",
      religion: "Hindu",
      caste: "Brahmin",
      profession: "HR Manager",
      salary: "₹ 5 LPA",
      isOnline: true,
      pics: 5,
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 8,
      name: "Karan Yadav",
      age: 28,
      location: "Gorakhpur, UP",
      religion: "Hindu",
      caste: "Yadav",
      profession: "Civil Engineer",
      salary: "₹ 8 LPA",
      isOnline: true,
      pics: 2,
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 9,
      name: "Kavya Tiwari",
      age: 25,
      location: "Ayodhya, UP",
      religion: "Hindu",
      caste: "Brahmin",
      profession: "Teacher",
      salary: "₹ 4 LPA",
      isOnline: false,
      pics: 6,
      img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 10,
      name: "Arjun Singh",
      age: 30,
      location: "Ghaziabad, UP",
      religion: "Hindu",
      caste: "Rajput",
      profession: "Software Developer",
      salary: "₹ 15 LPA",
      isOnline: true,
      pics: 3,
      img: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 11,
      name: "Pooja Chaurasia",
      age: 24,
      location: "Sant Kabir Nagar",
      religion: "Hindu",
      caste: "Chaurasia",
      profession: "Bank PO",
      salary: "₹ 7 LPA",
      isOnline: true,
      pics: 4,
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 12,
      name: "Aditya Pandey",
      age: 29,
      location: "Lucknow, UP",
      religion: "Hindu",
      caste: "Brahmin",
      profession: "Architect",
      salary: "₹ 8.5 LPA",
      isOnline: false,
      pics: 5,
      img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 13,
      name: "Shruti Agarwal",
      age: 26,
      location: "Delhi",
      religion: "Hindu",
      caste: "Baniya",
      profession: "UI/UX Designer",
      salary: "₹ 10 LPA",
      isOnline: true,
      pics: 7,
      img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 14,
      name: "Rahul Chaudhary",
      age: 27,
      location: "Basti, UP",
      religion: "Hindu",
      caste: "Chaudhary",
      profession: "Business",
      salary: "₹ 12 LPA",
      isOnline: true,
      pics: 4,
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 15,
      name: "Riya Sharma",
      age: 23,
      location: "Kanpur, UP",
      religion: "Hindu",
      caste: "Brahmin",
      profession: "Content Writer",
      salary: "₹ 5 LPA",
      isOnline: false,
      pics: 3,
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 16,
      name: "Yash Pratap",
      age: 28,
      location: "Agra, UP",
      religion: "Hindu",
      caste: "Rajput",
      profession: "Police Officer",
      salary: "₹ 6 LPA",
      isOnline: true,
      pics: 5,
      img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 17,
      name: "Swati Dixit",
      age: 25,
      location: "Lucknow, UP",
      religion: "Hindu",
      caste: "Brahmin",
      profession: "Software Engineer",
      salary: "₹ 8 LPA",
      isOnline: true,
      pics: 6,
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 18,
      name: "Kunal Singh",
      age: 30,
      location: "Noida, UP",
      religion: "Hindu",
      caste: "Kshatriya",
      profession: "Project Manager",
      salary: "₹ 18 LPA",
      isOnline: false,
      pics: 3,
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 19,
      name: "Nisha Patel",
      age: 27,
      location: "Ahmedabad, Gujarat",
      religion: "Hindu",
      caste: "Patel",
      profession: "Dentist",
      salary: "₹ 10 LPA",
      isOnline: true,
      pics: 5,
      img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 20,
      name: "Siddharth Jain",
      age: 29,
      location: "Delhi",
      religion: "Jain",
      caste: "Digambar",
      profession: "Businessman",
      salary: "₹ 20 LPA",
      isOnline: true,
      pics: 4,
      img: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 21,
      name: "Megha Soni",
      age: 24,
      location: "Varanasi, UP",
      religion: "Hindu",
      caste: "Sunar",
      profession: "Fashion Designer",
      salary: "₹ 6 LPA",
      isOnline: false,
      pics: 5,
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 22,
      name: "Tarun Kumar",
      age: 27,
      location: "Patna, Bihar",
      religion: "Hindu",
      caste: "Kurmi",
      profession: "Software Engineer",
      salary: "₹ 9 LPA",
      isOnline: true,
      pics: 3,
      img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 23,
      name: "Kritika Sharma",
      age: 26,
      location: "Lucknow, UP",
      religion: "Hindu",
      caste: "Brahmin",
      profession: "Professor",
      salary: "₹ 5.5 LPA",
      isOnline: true,
      pics: 6,
      img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 24,
      name: "Varun Singh",
      age: 28,
      location: "Gorakhpur, UP",
      religion: "Hindu",
      caste: "Rajput",
      profession: "Doctor",
      salary: "₹ 14 LPA",
      isOnline: false,
      pics: 4,
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 25,
      name: "Shalini Gupta",
      age: 25,
      location: "Delhi",
      religion: "Hindu",
      caste: "Baniya",
      profession: "Financial Analyst",
      salary: "₹ 8 LPA",
      isOnline: true,
      pics: 5,
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 26,
      name: "Nikhil Maurya",
      age: 29,
      location: "Kanpur, UP",
      religion: "Hindu",
      caste: "Maurya",
      profession: "Government Officer",
      salary: "₹ 7 LPA",
      isOnline: true,
      pics: 3,
      img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 27,
      name: "Divya Rastogi",
      age: 24,
      location: "Lucknow, UP",
      religion: "Hindu",
      caste: "Rastogi",
      profession: "Pharmacist",
      salary: "₹ 5 LPA",
      isOnline: false,
      pics: 4,
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 28,
      name: "Manish Pandey",
      age: 31,
      location: "Noida, UP",
      religion: "Hindu",
      caste: "Brahmin",
      profession: "IT Consultant",
      salary: "₹ 16 LPA",
      isOnline: true,
      pics: 6,
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 29,
      name: "Akanksha Rajput",
      age: 26,
      location: "Agra, UP",
      religion: "Hindu",
      caste: "Rajput",
      profession: "Interior Designer",
      salary: "₹ 6.5 LPA",
      isOnline: true,
      pics: 5,
      img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 30,
      name: "Saurabh Jaiswal",
      age: 28,
      location: "Varanasi, UP",
      religion: "Hindu",
      caste: "Jaiswal",
      profession: "Entrepreneur",
      salary: "₹ 15 LPA",
      isOnline: true,
      pics: 4,
      img: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
  ];

  // 🔥 Infinite Scroll Logic
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 300
      ) {
        setVisibleCount((prevCount) =>
          Math.min(prevCount + 4, allRecommendedProfiles.length),
        );
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔥 Handle Like Logic
  const handleLike = (e, profile) => {
    e.stopPropagation();
    if (!likedProfiles.has(profile.id)) {
      setLikedProfiles((prev) => new Set(prev).add(profile.id));
      alert(
        `💖 You liked ${profile.name}! They have been added to your Matches.`,
      );
    }
  };

  // Helper class for hiding scrollbars
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
        .heart-beat {
          animation: heart-beat 1s infinite alternate;
        }
        @keyframes heart-beat {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in-up 0.8s ease-out forwards;
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

      {/* ================= DESKTOP HERO SECTION (MAGICAL VIBE) ================= */}
      <div className="hidden md:block relative bg-gradient-to-r from-[#fff0f5] via-rose-50 to-[#fce4ec] pt-12 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden z-10 border-b border-rose-100/50">
        <div
          className="absolute right-0 top-0 bottom-0 w-1/2 opacity-40 mix-blend-multiply pointer-events-none"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "right center",
            maskImage: "linear-gradient(to right, transparent, black)",
          }}
        ></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="text-[#fbbf24]" size={24} />
            <span className="text-[#e02c5a] font-bold tracking-widest text-sm uppercase">
              Discover True Love
            </span>
            <Sparkles className="text-[#fbbf24]" size={24} />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2 font-serif">
            Handpicked Matches
          </h2>
          <h2 className="text-4xl md:text-5xl font-bold text-[#e02c5a] mb-6 font-serif drop-shadow-sm">
            Just For You 💖
          </h2>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto leading-relaxed font-medium">
            We found these beautiful souls who perfectly match your preferences.
            Find your perfect partner today.
          </p>
        </div>
      </div>

      {/* ================= DESKTOP FLOATING FILTER BAR ================= */}
      <div className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-12 z-20 mb-8">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_10px_40px_rgba(224,44,90,0.1)] p-6 border border-rose-100 flex items-center gap-4">
          <div className="flex-1 border-r border-rose-100 pr-4">
            <label className="text-xs text-gray-400 font-bold uppercase tracking-wider block mb-1">
              Looking for
            </label>
            <div className="flex items-center justify-between cursor-pointer group">
              <span className="font-bold text-gray-800 group-hover:text-[#e02c5a] transition-colors">
                Bride
              </span>
              <ChevronDown size={16} className="text-[#e02c5a]" />
            </div>
          </div>
          <div className="flex-1 border-r border-rose-100 px-4">
            <label className="text-xs text-gray-400 font-bold uppercase tracking-wider block mb-1">
              Age
            </label>
            <div className="flex items-center justify-between cursor-pointer group">
              <span className="font-bold text-gray-800 group-hover:text-[#e02c5a] transition-colors">
                18 - 30
              </span>
              <ChevronDown size={16} className="text-[#e02c5a]" />
            </div>
          </div>
          <div className="flex-1 border-r border-rose-100 px-4">
            <label className="text-xs text-gray-400 font-bold uppercase tracking-wider block mb-1">
              Location
            </label>
            <div className="flex items-center justify-between cursor-pointer group">
              <span className="font-bold text-gray-800 group-hover:text-[#e02c5a] transition-colors">
                Select Location
              </span>
              <ChevronDown size={16} className="text-[#e02c5a]" />
            </div>
          </div>
          <div className="flex-1 px-4">
            <label className="text-xs text-gray-400 font-bold uppercase tracking-wider block mb-1">
              Religion
            </label>
            <div className="flex items-center justify-between cursor-pointer group">
              <span className="font-bold text-gray-800 group-hover:text-[#e02c5a] transition-colors">
                Select Religion
              </span>
              <ChevronDown size={16} className="text-[#e02c5a]" />
            </div>
          </div>
          <div className="pl-4">
            <button className="bg-gradient-to-r from-[#ed2c5b] to-[#c0163e] hover:shadow-lg hover:-translate-y-0.5 text-white px-8 py-3.5 rounded-xl font-bold transition-all flex items-center gap-2 shadow-md">
              <Filter size={18} /> Apply Matches
            </button>
          </div>
        </div>
      </div>

      {/* ================= MOBILE SEARCH & FILTERS ================= */}
      <div className="md:hidden px-4 pt-4 pb-2 bg-white/80 backdrop-blur-md relative z-20 border-b border-rose-100">
        <div className="relative mb-4">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#e02c5a]"
          />
          <input
            type="text"
            placeholder="Search your soulmate..."
            className="w-full pl-12 pr-12 py-3.5 bg-white rounded-2xl border border-rose-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#e02c5a]/20 shadow-sm text-gray-700"
          />
          <Filter
            size={20}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#e02c5a]"
          />
        </div>

        <div className={`flex overflow-x-auto gap-2.5 pb-2 ${hideScrollbar}`}>
          <button className="flex items-center gap-1.5 px-5 py-2 border-2 border-[#e02c5a] rounded-xl text-[#e02c5a] font-bold text-sm whitespace-nowrap bg-[#fff0f5]">
            <User size={16} /> Bride
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2 border border-rose-200 rounded-xl text-gray-700 font-bold text-sm whitespace-nowrap bg-white shadow-sm hover:border-[#e02c5a]/50">
            Age <ChevronDown size={14} className="text-[#e02c5a]" />
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2 border border-rose-200 rounded-xl text-gray-700 font-bold text-sm whitespace-nowrap bg-white shadow-sm hover:border-[#e02c5a]/50">
            Location <ChevronDown size={14} className="text-[#e02c5a]" />
          </button>
          <button className="flex items-center justify-center px-4 py-2 border border-rose-200 rounded-xl text-gray-700 bg-white shadow-sm shrink-0 hover:text-[#e02c5a]">
            <SlidersHorizontal size={18} />
          </button>
        </div>
      </div>

      {/* ================= PREMIUM GRID FEED (MATCHES STYLE) ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 md:mt-10 relative z-20 pb-10">
        <div className="flex items-center justify-center md:justify-start mb-6 md:mb-10">
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#821511] flex items-center gap-3">
            Matches For You{" "}
            <Heart
              size={28}
              className="text-[#e02c5a] animate-pulse"
              fill="#e02c5a"
            />
          </h3>
        </div>

        {/* 🔥 GRID LAYOUT FOR DESKTOP (2 Columns), SINGLE ON MOBILE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {allRecommendedProfiles.slice(0, visibleCount).map((profile) => {
            const isLiked = likedProfiles.has(profile.id);

            return (
              <div
                key={profile.id}
                onClick={() => navigate("/matches")}
                className="animate-fade-in relative bg-white/95 backdrop-blur-md rounded-[28px] p-4 sm:p-5 border border-rose-100 shadow-[0_8px_30px_rgba(224,44,90,0.06)] hover:shadow-[0_20px_50px_rgba(224,44,90,0.15)] hover:-translate-y-1.5 transition-all duration-300 flex flex-row gap-4 sm:gap-6 group cursor-pointer overflow-hidden"
              >
                {/* Subtle background glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-rose-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                {/* Profile Image */}
                <div className="relative w-[110px] sm:w-[160px] h-[150px] sm:h-[210px] shrink-0 rounded-2xl overflow-hidden shadow-md border-2 border-white z-10">
                  <img
                    src={profile.img}
                    alt={profile.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-90"></div>

                  <div className="absolute bottom-2 left-2">
                    <span
                      className={`flex items-center gap-1 text-[9px] sm:text-xs font-bold px-2 py-1 rounded-lg text-white backdrop-blur-md border border-white/30 ${
                        profile.isOnline ? "bg-green-500/80" : "bg-gray-600/80"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          profile.isOnline
                            ? "bg-white animate-pulse"
                            : "bg-gray-300"
                        }`}
                      ></span>
                      {profile.isOnline ? "Online" : "Offline"}
                    </span>
                  </div>
                  <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/40 backdrop-blur-md text-white text-[9px] sm:text-xs font-bold px-2 py-1 rounded-lg border border-white/20">
                    <Camera size={12} /> {profile.pics}
                  </div>
                </div>

                {/* Profile Details & Like Button */}
                <div className="relative flex-1 flex flex-col justify-between py-1 z-10">
                  <div>
                    <h4 className="text-[17px] sm:text-2xl font-bold font-serif text-gray-900 flex items-center gap-1.5 mb-1 group-hover:text-[#e02c5a] transition-colors">
                      {profile.name}
                      <CheckCircle
                        size={16}
                        className="text-green-500 bg-white rounded-full shrink-0"
                        fill="currentColor"
                      />
                    </h4>

                    <div className="space-y-1.5 text-[11px] sm:text-sm text-gray-600 font-semibold mt-2 sm:mt-3">
                      <p className="flex items-center gap-1.5 truncate">
                        <User size={14} className="text-[#eab308] shrink-0" />{" "}
                        {profile.age} Yrs
                      </p>
                      <p className="flex items-center gap-1.5 truncate">
                        <MapPin size={14} className="text-[#e02c5a] shrink-0" />{" "}
                        {profile.location}
                      </p>
                      <p className="flex items-center gap-1.5 truncate">
                        <BookOpen
                          size={14}
                          className="text-purple-500 shrink-0"
                        />{" "}
                        {profile.religion}, {profile.caste}
                      </p>
                      <p className="flex items-center gap-1.5 truncate">
                        <Briefcase
                          size={14}
                          className="text-blue-500 shrink-0"
                        />{" "}
                        {profile.profession}
                      </p>
                    </div>
                  </div>

                  {/* Like Button */}
                  <div className="flex justify-end mt-3 sm:mt-0">
                    <button
                      onClick={(e) => handleLike(e, profile)}
                      className={`flex items-center justify-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl border-2 transition-all shadow-sm group/btn
                        ${
                          isLiked
                            ? "bg-gradient-to-r from-[#ed2c5b] to-[#c0163e] border-transparent scale-[1.02] shadow-lg"
                            : "bg-white border-rose-200 hover:border-[#e02c5a] hover:bg-[#fff0f5]"
                        }`}
                    >
                      <Heart
                        size={18}
                        className={`transition-all duration-300 ${
                          isLiked
                            ? "text-white fill-white heart-beat"
                            : "text-[#e02c5a] group-hover/btn:scale-110"
                        }`}
                      />
                      <span
                        className={`text-xs sm:text-sm font-bold ${isLiked ? "text-white" : "text-[#e02c5a]"}`}
                      >
                        {isLiked ? "Matched" : "Like"}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Loading Indicator for Infinite Scroll */}
        {visibleCount < allRecommendedProfiles.length && (
          <div className="flex justify-center items-center py-12 gap-2 text-[#e02c5a] font-bold">
            <Sparkles size={24} className="animate-spin" /> Fetching more
            beautiful souls...
          </div>
        )}

        {visibleCount >= allRecommendedProfiles.length && (
          <div className="flex justify-center items-center py-12 gap-2 text-gray-500 font-bold">
            <Heart size={24} fill="currentColor" className="text-[#e02c5a]" />{" "}
            You've seen all matches for now!
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
