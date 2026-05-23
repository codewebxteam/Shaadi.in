import React, { useState } from "react";
import {
  User,
  ChevronDown,
  Heart,
  Search,
  Bell,
  Home,
  LogOut,
  Settings,
  LayoutDashboard,
  Sparkles,
} from "lucide-react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

const Navbar = () => {
  const navigate = useNavigate();

  // 🔥 AUTH STATE: Isko check karne ke liye true ya false karke dekh lo.
  // (Actual project mein ye Redux ya Context API se aayega)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // =========================================================================
  // 🔴 STATE 1: BINA LOGIN WALA NAVBAR (EXACTLY WAHI JO AAPNE BHEJA THA)
  // =========================================================================
  if (!isLoggedIn) {
    return (
      <nav className="fixed md:sticky top-0 w-full z-50 bg-rose-50/90 backdrop-blur-md shadow-sm border-b border-rose-100">
        <div className="max-w-7xl mx-auto px-3 md:px-8 py-3 md:py-5 flex items-center justify-between">
          {/* --- LOGO SECTION --- */}
          <RouterLink
            to="/"
            className="relative flex flex-col items-start decoration-transparent"
          >
            {/* NAYA IMAGE LOGO */}
            <img
              src="https://ik.imagekit.io/dlolttjjd/Shadi_assets/colourlogotext.webp?updatedAt=1779353927500"
              alt="Local Shaadi Logo"
              className="h-9 md:h-12 w-auto object-contain"
            />
          </RouterLink>

          {/* --- RIGHT SECTION: LINKS & BUTTON --- */}
          <div className="flex items-center gap-2 sm:gap-4 md:gap-8">
            <div className="flex items-center gap-2 md:gap-6 text-[10px] md:text-base font-medium text-gray-800 md:text-gray-700">
              {/* 🔥 About us: Smooth scroll karega usi page par */}
              <ScrollLink
                to="about-section"
                smooth={true}
                duration={500}
                offset={-80}
                className="hover:text-[#e02c5a] transition-colors cursor-pointer"
              >
                About us
              </ScrollLink>

              <RouterLink
                to="/help"
                className="hover:text-[#e02c5a] transition-colors"
              >
                Help
              </RouterLink>
            </div>

            {/* 🔥 Login: Naye login page par le jayega */}
            <RouterLink
              to="/login"
              className="flex items-center gap-0.5 md:gap-1.5 border md:border-2 border-[#e02c5a] text-[#e02c5a] rounded-full px-2 py-1 md:px-5 md:py-2 hover:bg-[#e02c5a] hover:text-white transition-all duration-300 bg-white/50 md:bg-transparent cursor-pointer"
            >
              <User className="w-3 h-3 md:w-5 md:h-5" strokeWidth={2.5} />
              <span className="text-[10px] md:text-base font-semibold">
                Login
              </span>
              <ChevronDown
                className="w-3 h-3 md:w-5 md:h-5"
                strokeWidth={2.5}
              />
            </RouterLink>
          </div>
        </div>
      </nav>
    );
  }

  // =========================================================================
  // 🟢 STATE 2: LOGIN KE BAAD WALA NAVBAR + MOBILE BOTTOM BAR
  // =========================================================================
  return (
    <>
      <nav className="fixed md:sticky top-0 w-full z-50 bg-rose-50/90 backdrop-blur-md shadow-sm border-b border-rose-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-3 md:py-4 flex items-center justify-between">
          {/* --- LOGO SECTION --- */}
          <RouterLink
            to="/dashboard"
            className="relative flex flex-col items-start decoration-transparent"
          >
            <img
              src="https://ik.imagekit.io/dlolttjjd/Shadi_assets/colourlogotext.webp?updatedAt=1779353927500"
              alt="Local Shaadi Logo"
              className="h-9 md:h-12 w-auto object-contain"
            />
          </RouterLink>

          {/* --- RIGHT SECTION --- */}
          <div className="flex items-center gap-4 md:gap-6">
            {/* Desktop Menu Links (Hidden on Mobile) */}
            <div className="hidden md:flex items-center gap-6 font-bold text-gray-700">
              <RouterLink
                to="/dashboard"
                className="hover:text-[#e02c5a] transition-colors"
              >
                Home
              </RouterLink>
              <RouterLink
                to="/matches"
                className="hover:text-[#e02c5a] transition-colors"
              >
                Matches
              </RouterLink>
              <button
                onClick={() => navigate("/notifications")}
                className="hover:text-[#e02c5a] transition-colors flex items-center gap-1 relative focus:outline-none"
              >
                Notifications
                <span className="bg-[#e02c5a] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full absolute -top-2 -right-3 shadow-sm animate-pulse">
                  3
                </span>
              </button>
              <RouterLink
                to="/premium"
                className="hover:text-[#e02c5a] transition-colors flex items-center gap-1"
              >
                Premium <Sparkles size={14} className="text-[#fbbf24]" />
              </RouterLink>
            </div>

            {/* Mobile Notification Icon (Visible on mobile top bar if logged in) */}
            <div
              className="md:hidden relative cursor-pointer"
              onClick={() => navigate("/notifications")}
            >
              <Bell size={22} className="text-[#e02c5a]" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-white">
                3
              </span>
            </div>

            {/* Account / Profile Dropdown (Visible on both Mobile & Desktop) */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 bg-gradient-to-r from-[#ed2c5b] to-[#c0163e] hover:shadow-lg hover:-translate-y-0.5 text-white px-3 py-1.5 md:px-5 md:py-2.5 rounded-full font-bold transition-all shadow-md"
              >
                <User className="w-4 h-4 md:w-5 md:h-5" />
                <span className="text-xs md:text-sm hidden sm:block">
                  My Account
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${showProfileMenu ? "rotate-180" : ""}`}
                />
              </button>

              {/* Dropdown Menu */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-3 w-56 bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_15px_40px_rgba(224,44,90,0.15)] border border-rose-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-4 border-b border-rose-50 bg-gradient-to-b from-rose-50/50 to-transparent">
                    <p className="text-sm font-bold text-gray-800 font-serif">
                      Rahul Verma
                    </p>
                    <p className="text-xs text-gray-500 font-medium mt-0.5">
                      ID: LSK-84729
                    </p>
                  </div>
                  <div className="p-2 space-y-1">
                    <RouterLink
                      to="/final-profile"
                      onClick={() => setShowProfileMenu(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-gray-700 hover:bg-rose-50 hover:text-[#e02c5a] transition-colors"
                    >
                      <User size={16} /> Edit Profile
                    </RouterLink>
                    <RouterLink
                      to="/dashboard"
                      onClick={() => setShowProfileMenu(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-gray-700 hover:bg-rose-50 hover:text-[#e02c5a] transition-colors md:hidden"
                    >
                      <LayoutDashboard size={16} /> Dashboard
                    </RouterLink>
                    <RouterLink
                      to="/matches"
                      onClick={() => setShowProfileMenu(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-gray-700 hover:bg-rose-50 hover:text-[#e02c5a] transition-colors md:hidden"
                    >
                      <Heart size={16} /> My Matches
                    </RouterLink>
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-gray-700 hover:bg-rose-50 hover:text-[#e02c5a] transition-colors">
                      <Settings size={16} /> Account Settings
                    </button>
                  </div>
                  <div className="p-2 border-t border-rose-50">
                    <button
                      onClick={() => {
                        setIsLoggedIn(false);
                        setShowProfileMenu(false);
                        navigate("/");
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* ================= MOBILE BOTTOM NAVIGATION BAR (ONLY IF LOGGED IN) ================= */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-rose-100 flex justify-around items-center h-[72px] z-50 px-2 pb-2 shadow-[0_-5px_15px_rgba(224,44,90,0.05)]">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex flex-col items-center justify-center gap-1 w-16 text-gray-500 hover:text-[#e02c5a] transition-colors group"
        >
          <Home size={24} className="group-hover:fill-rose-100" />
          <span className="text-[10px] font-bold">Home</span>
        </button>

        <button
          onClick={() => navigate("/search")}
          className="flex flex-col items-center justify-center gap-1 w-16 text-gray-500 hover:text-[#e02c5a] transition-colors"
        >
          <Search size={22} />
          <span className="text-[10px] font-medium">Search</span>
        </button>

        <button
          onClick={() => navigate("/matches")}
          className="flex flex-col items-center justify-center gap-1 w-16 text-gray-500 hover:text-[#e02c5a] transition-colors group"
        >
          <Heart size={22} className="group-hover:fill-rose-100" />
          <span className="text-[10px] font-medium">Matches</span>
        </button>

        <button
          onClick={() => navigate("/notifications")}
          className="flex flex-col items-center justify-center gap-1 w-16 text-gray-500 hover:text-[#e02c5a] transition-colors relative focus:outline-none"
        >
          <Bell size={22} />
          <span className="absolute top-0 right-3 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white shadow-sm">
            3
          </span>
          <span className="text-[10px] font-medium">Notifs</span>
        </button>

        <button
          onClick={() => navigate("/final-profile")}
          className="flex flex-col items-center justify-center gap-1 text-gray-500 hover:text-[#e02c5a] transition-colors group"
        >
          <User size={22} className="group-hover:fill-rose-100" />
          <span className="text-[10px] font-medium">Profile</span>
        </button>
      </div>
    </>
  );
};

export default Navbar;
