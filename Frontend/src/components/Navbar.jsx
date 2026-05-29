import React, { useState, useEffect } from "react";
import {
  User,
  ChevronDown,
  Heart,
  Bell,
  Home,
  LogOut,
  Settings,
  LayoutDashboard,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // 🔥 State Variables: Real Name, Phone Number, and Unread Notifications
  const [userName, setUserName] = useState("User");
  const [userPhone, setUserPhone] = useState("");
  const [unreadCount, setUnreadCount] = useState(0);

  const isProfileSetupRoute = location.pathname === "/profile-setup";
  const isActive = (path) => location.pathname === path;

  // 1. Auth Status & User Data Fetching
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);

      if (token) {
        try {
          const userDataString = localStorage.getItem("user");
          if (userDataString) {
            const userData = JSON.parse(userDataString);
            setUserName(userData.name || "User");
            setUserPhone(userData.phone || "");
          }
        } catch (error) {
          console.error("Error parsing user data from localStorage:", error);
        }
      }
    };

    checkAuthStatus();
    window.addEventListener("authChange", checkAuthStatus);

    return () => {
      window.removeEventListener("authChange", checkAuthStatus);
    };
  }, []);

  // 🔥 2. REAL-TIME NOTIFICATION FETCHING LOGIC
  useEffect(() => {
    const fetchUnreadCount = async () => {
      if (!isLoggedIn) return;
      try {
        const token = localStorage.getItem("token");
        const API_URL = import.meta.env.VITE_API_BASE_URL
          ? import.meta.env.VITE_API_BASE_URL + "/auth"
          : "http://localhost:5001/api/auth";

        const res = await fetch(`${API_URL}/notifications`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (data.success && data.notifications) {
          // Unread notifications count
          const count = data.notifications.filter((n) => !n.isRead).length;
          setUnreadCount(count);
        }
      } catch (error) {
        console.error("Error fetching notification count:", error);
      }
    };

    // Page load ya route change hone par check karega (Instant update)
    fetchUnreadCount();

    // Har 30 seconds me background me check karega naye notifications ke liye (Real-time feel)
    const interval = setInterval(fetchUnreadCount, 30000);

    return () => clearInterval(interval);
  }, [isLoggedIn, location.pathname]); // location.pathname se page change hone par count turant update hoga

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("authChange"));
    setIsLoggedIn(false);
    setShowProfileMenu(false);
    navigate("/");
  };

  // =========================================================================
  // 🔴 STATE 1: BINA LOGIN WALA NAVBAR
  // =========================================================================
  if (!isLoggedIn) {
    return (
      <nav className="sticky top-0 w-full z-50 bg-rose-50/90 backdrop-blur-md shadow-sm border-b border-rose-100">
        <div className="max-w-7xl mx-auto px-3 md:px-8 py-3 md:py-5 flex items-center justify-between">
          <RouterLink
            to="/"
            className="relative flex flex-col items-start decoration-transparent"
          >
            <img
              src="https://ik.imagekit.io/dlolttjjd/Shadi_assets/colourlogotext.webp?updatedAt=1779353927500"
              alt="Local Shaadi Logo"
              className="h-9 md:h-12 w-auto object-contain"
            />
          </RouterLink>

          <div className="flex items-center gap-2 sm:gap-4 md:gap-8">
            <div className="flex items-center gap-2 md:gap-6 text-[10px] md:text-base font-medium text-gray-800 md:text-gray-700">
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
  // 🔵 STATE 3: PROFILE SETUP (ONBOARDING) WALA NAVBAR
  // =========================================================================
  if (isLoggedIn && isProfileSetupRoute) {
    return (
      <nav className="sticky top-0 w-full z-50 bg-rose-50/90 backdrop-blur-md shadow-sm border-b border-rose-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-3 md:py-4 flex items-center justify-between">
          <div className="relative flex flex-col items-start decoration-transparent">
            <img
              src="https://ik.imagekit.io/dlolttjjd/Shadi_assets/colourlogotext.webp?updatedAt=1779353927500"
              alt="Local Shaadi Logo"
              className="h-9 md:h-12 w-auto object-contain"
            />
          </div>

          <div className="flex items-center gap-1.5 md:gap-2 bg-green-50 border border-green-200 text-green-700 px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-sm">
            <ShieldCheck className="w-4 h-4 md:w-5 md:h-5" />
            <span className="text-xs md:text-sm font-bold tracking-wide">
              100% Secure
            </span>
          </div>
        </div>
      </nav>
    );
  }

  // =========================================================================
  // 🟢 STATE 2: LOGIN KE BAAD WALA NORMAL NAVBAR + MOBILE BOTTOM BAR
  // =========================================================================
  return (
    <>
      <nav className="sticky top-0 w-full z-50 bg-rose-50/90 backdrop-blur-md shadow-sm border-b border-rose-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-3 md:py-4 flex items-center justify-between">
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

          <div className="flex items-center gap-4 md:gap-6">
            {/* Desktop Links with Active State */}
            <div className="hidden md:flex items-center gap-4 font-bold text-gray-700">
              <RouterLink
                to="/dashboard"
                className={`transition-colors px-4 py-2 rounded-full flex items-center gap-1 ${
                  isActive("/dashboard")
                    ? "bg-rose-50 text-[#e02c5a]"
                    : "hover:text-[#e02c5a]"
                }`}
              >
                Home
              </RouterLink>
              <RouterLink
                to="/matches"
                className={`transition-colors px-4 py-2 rounded-full flex items-center gap-1 ${
                  isActive("/matches")
                    ? "bg-rose-50 text-[#e02c5a]"
                    : "hover:text-[#e02c5a]"
                }`}
              >
                Matches
              </RouterLink>
              <button
                onClick={() => navigate("/notifications")}
                className={`transition-colors px-4 py-2 rounded-full flex items-center gap-1 relative focus:outline-none ${
                  isActive("/notifications")
                    ? "bg-rose-50 text-[#e02c5a]"
                    : "hover:text-[#e02c5a]"
                }`}
              >
                Notifications
                {/* 🔥 REAL-TIME BADGE */}
                {unreadCount > 0 && (
                  <span className="bg-[#e02c5a] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full absolute -top-1 -right-1 shadow-sm animate-pulse">
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </span>
                )}
              </button>
              <RouterLink
                to="/premium"
                className={`transition-colors px-4 py-2 rounded-full flex items-center gap-1 ${
                  isActive("/premium")
                    ? "bg-rose-50 text-[#e02c5a]"
                    : "hover:text-[#e02c5a]"
                }`}
              >
                Premium{" "}
                <Sparkles
                  size={14}
                  className={
                    isActive("/premium") ? "text-[#e02c5a]" : "text-[#fbbf24]"
                  }
                />
              </RouterLink>
            </div>

            {/* Mobile Top Icons: Only Notification and Profile */}
            <div
              className={`md:hidden relative cursor-pointer p-2 rounded-full ${isActive("/notifications") ? "bg-rose-50" : ""}`}
              onClick={() => navigate("/notifications")}
            >
              <Bell
                size={22}
                className={
                  isActive("/notifications")
                    ? "text-[#e02c5a]"
                    : "text-gray-600"
                }
              />
              {/* 🔥 REAL-TIME BADGE */}
              {unreadCount > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-white">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </div>

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

              {showProfileMenu && (
                <div className="absolute right-0 mt-3 w-56 bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_15px_40px_rgba(224,44,90,0.15)] border border-rose-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-4 border-b border-rose-50 bg-gradient-to-b from-rose-50/50 to-transparent">
                    <p className="text-sm font-bold text-gray-800 font-serif truncate">
                      {userName}
                    </p>
                    <p className="text-xs text-gray-500 font-medium mt-0.5 tracking-wide">
                      {userPhone ? `+91 ${userPhone}` : "Profile Incomplete"}
                    </p>
                  </div>
                  <div className="p-2 space-y-1">
                    <RouterLink
                      to="/final-profile"
                      onClick={() => setShowProfileMenu(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-colors ${isActive("/final-profile") ? "bg-rose-50 text-[#e02c5a]" : "text-gray-700 hover:bg-rose-50 hover:text-[#e02c5a]"}`}
                    >
                      <User size={16} /> Edit Profile
                    </RouterLink>
                    <RouterLink
                      to="/dashboard"
                      onClick={() => setShowProfileMenu(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-colors md:hidden ${isActive("/dashboard") ? "bg-rose-50 text-[#e02c5a]" : "text-gray-700 hover:bg-rose-50 hover:text-[#e02c5a]"}`}
                    >
                      <LayoutDashboard size={16} /> Dashboard
                    </RouterLink>
                    <RouterLink
                      to="/matches"
                      onClick={() => setShowProfileMenu(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-colors md:hidden ${isActive("/matches") ? "bg-rose-50 text-[#e02c5a]" : "text-gray-700 hover:bg-rose-50 hover:text-[#e02c5a]"}`}
                    >
                      <Heart size={16} /> My Matches
                    </RouterLink>
                    <RouterLink
                      to="/account-settings"
                      onClick={() => setShowProfileMenu(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-colors ${isActive("/account-settings") ? "bg-rose-50 text-[#e02c5a]" : "text-gray-700 hover:bg-rose-50 hover:text-[#e02c5a]"}`}
                    >
                      <Settings size={16} /> Account Settings
                    </RouterLink>
                  </div>
                  <div className="p-2 border-t border-rose-50">
                    <button
                      onClick={handleLogout}
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

      {/* ================= MOBILE BOTTOM NAVIGATION BAR WITH ACTIVE STATE ================= */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-rose-100 flex justify-around items-center h-[72px] z-50 px-2 pb-2 shadow-[0_-5px_15px_rgba(224,44,90,0.05)]">
        {/* Home */}
        <button
          onClick={() => navigate("/dashboard")}
          className={`flex flex-col items-center justify-center gap-1 w-16 transition-all duration-300 group ${
            isActive("/dashboard")
              ? "text-[#e02c5a] -translate-y-1"
              : "text-gray-500 hover:text-[#e02c5a]"
          }`}
        >
          <Home
            size={24}
            className={
              isActive("/dashboard")
                ? "fill-rose-100"
                : "group-hover:fill-rose-50"
            }
          />
          <span
            className={`text-[10px] ${isActive("/dashboard") ? "font-extrabold" : "font-medium"}`}
          >
            Home
          </span>
        </button>

        {/* Matches */}
        <button
          onClick={() => navigate("/matches")}
          className={`flex flex-col items-center justify-center gap-1 w-16 transition-all duration-300 group ${
            isActive("/matches")
              ? "text-[#e02c5a] -translate-y-1"
              : "text-gray-500 hover:text-[#e02c5a]"
          }`}
        >
          <Heart
            size={22}
            className={
              isActive("/matches")
                ? "fill-rose-100"
                : "group-hover:fill-rose-50"
            }
          />
          <span
            className={`text-[10px] ${isActive("/matches") ? "font-extrabold" : "font-medium"}`}
          >
            Matches
          </span>
        </button>

        {/* Notifications */}
        <button
          onClick={() => navigate("/notifications")}
          className={`flex flex-col items-center justify-center gap-1 w-16 transition-all duration-300 relative focus:outline-none group ${
            isActive("/notifications")
              ? "text-[#e02c5a] -translate-y-1"
              : "text-gray-500 hover:text-[#e02c5a]"
          }`}
        >
          <Bell
            size={22}
            className={
              isActive("/notifications")
                ? "fill-rose-100"
                : "group-hover:fill-rose-50"
            }
          />
          {/* 🔥 REAL-TIME BADGE */}
          {unreadCount > 0 && (
            <span className="absolute top-0 right-3 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white shadow-sm">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
          <span
            className={`text-[10px] ${isActive("/notifications") ? "font-extrabold" : "font-medium"}`}
          >
            Notifs
          </span>
        </button>

        {/* Premium */}
        <button
          onClick={() => navigate("/premium")}
          className={`flex flex-col items-center justify-center gap-1 w-16 transition-all duration-300 group ${
            isActive("/premium")
              ? "text-[#e02c5a] -translate-y-1"
              : "text-gray-500 hover:text-[#e02c5a]"
          }`}
        >
          <Sparkles
            size={22}
            className={
              isActive("/premium")
                ? "text-[#e02c5a] fill-rose-100"
                : "text-[#fbbf24] group-hover:text-[#e02c5a]"
            }
          />
          <span
            className={`text-[10px] ${isActive("/premium") ? "font-extrabold" : "font-medium"}`}
          >
            Premium
          </span>
        </button>

        {/* Profile */}
        <button
          onClick={() => navigate("/final-profile")}
          className={`flex flex-col items-center justify-center gap-1 w-16 transition-all duration-300 group ${
            isActive("/final-profile")
              ? "text-[#e02c5a] -translate-y-1"
              : "text-gray-500 hover:text-[#e02c5a]"
          }`}
        >
          <User
            size={22}
            className={
              isActive("/final-profile")
                ? "fill-rose-100"
                : "group-hover:fill-rose-50"
            }
          />
          <span
            className={`text-[10px] ${isActive("/final-profile") ? "font-extrabold" : "font-medium"}`}
          >
            Profile
          </span>
        </button>
      </div>
    </>
  );
};

export default Navbar;
