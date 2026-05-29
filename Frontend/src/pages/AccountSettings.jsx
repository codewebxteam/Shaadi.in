import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Settings,
  User,
  Mail,
  Phone,
  Lock,
  ShieldCheck,
  CheckCircle,
  ArrowLeft,
  Sparkles,
} from "lucide-react";

const AccountSettings = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Account Info State
  const [accountInfo, setAccountInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Password State
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    // Page load hone par profile fetch karo taaki Email, Phone, Name dikhe
    const fetchAccountData = async () => {
      try {
        const token = localStorage.getItem("token");
        const API_URL = import.meta.env.VITE_API_BASE_URL
          ? import.meta.env.VITE_API_BASE_URL + "/auth"
          : "http://localhost:5001/api/auth";

        const res = await fetch(`${API_URL}/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success && data.user) {
          setAccountInfo({
            name: data.user.name || data.user.fullName || "N/A",
            email: data.user.email || "N/A",
            phone: data.user.phone || "N/A",
          });
        }
      } catch (error) {
        console.error("Error fetching account info:", error);
      }
    };
    fetchAccountData();
  }, []);

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("New Password and Confirm Password do not match!");
      return;
    }

    if (passwords.newPassword.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const API_URL = import.meta.env.VITE_API_BASE_URL
        ? import.meta.env.VITE_API_BASE_URL + "/auth"
        : "http://localhost:5001/api/auth";

      const res = await fetch(`${API_URL}/change-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword,
        }),
      });

      const data = await res.json();
      if (data.success) {
        alert("Password updated successfully! 💖");
        setPasswords({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }); // Form clear
      } else {
        alert("Failed: " + data.message);
      }
    } catch (error) {
      console.error("Change password error:", error);
      alert("Server error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:ring-2 focus:ring-[#e02c5a]/20 focus:border-[#e02c5a] focus:bg-white outline-none transition-all";

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff0f5] via-white to-[#ffe4e6] font-sans pb-12 relative overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-10 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#821511] flex items-center gap-2">
              <Settings className="text-[#e02c5a]" size={28} /> Account Settings
            </h1>
            <p className="text-gray-600 mt-1 text-sm font-medium">
              Manage your account details and security.
            </p>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/80 border border-rose-200 rounded-xl text-sm font-bold text-[#e02c5a] hover:bg-rose-50 shadow-sm transition-all"
          >
            <ArrowLeft size={16} /> Back
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* ================= CARD 1: ACCOUNT DETAILS (READ ONLY) ================= */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-[0_8px_30px_rgba(224,44,90,0.06)] border border-rose-100 p-6 sm:p-8 h-fit">
            <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
              <User size={20} className="text-blue-500" /> Registered Details
            </h2>
            <div className="space-y-5">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">
                  Full Name
                </label>
                <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 text-gray-700 font-bold">
                  <User size={16} className="text-gray-400" />{" "}
                  {accountInfo.name}
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">
                  Phone Number
                </label>
                <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 text-gray-700 font-bold">
                  <Phone size={16} className="text-gray-400" /> +91{" "}
                  {accountInfo.phone}
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">
                  Email Address
                </label>
                <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 text-gray-700 font-bold">
                  <Mail size={16} className="text-gray-400" />{" "}
                  {accountInfo.email}
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-2 text-xs font-bold text-green-600 bg-green-50 px-3 py-2 rounded-lg border border-green-100 w-fit">
              <ShieldCheck size={14} /> Account Verified
            </div>
          </div>

          {/* ================= CARD 2: CHANGE PASSWORD ================= */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-[0_8px_30px_rgba(224,44,90,0.06)] border border-rose-100 p-6 sm:p-8">
            <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
              <Lock size={20} className="text-[#e02c5a]" /> Change Password
            </h2>
            <form onSubmit={handlePasswordUpdate} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">
                  Current Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwords.currentPassword}
                  onChange={handleChange}
                  required
                  placeholder="Enter current password"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">
                  New Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwords.newPassword}
                  onChange={handleChange}
                  required
                  placeholder="Enter new password"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 block">
                  Confirm New Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwords.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Confirm new password"
                  className={inputClass}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-4 flex items-center justify-center gap-2 bg-gradient-to-r from-[#ed2c5b] to-[#c0163e] hover:shadow-lg hover:-translate-y-0.5 text-white px-6 py-3.5 rounded-xl font-bold transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Sparkles className="animate-spin" size={18} />
                ) : (
                  <CheckCircle size={18} />
                )}
                {isLoading ? "Updating..." : "Update Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
