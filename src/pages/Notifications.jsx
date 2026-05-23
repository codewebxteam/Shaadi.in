import React, { useState } from "react";
import {
  Heart,
  MessageSquare,
  Eye,
  CheckCircle,
  Bell,
  Award,
  Sparkles,
  Flower2,
} from "lucide-react";

const Notifications = () => {
  // 🔥 Mock Notifications Data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "view",
      text: "Neha Verma viewed your profile.",
      time: "10 mins ago",
      isRead: false,
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80",
      icon: <Eye size={16} className="text-blue-500" />,
    },
    {
      id: 2,
      type: "match",
      text: "Congratulations! You have a new 92% match with Anjali Sharma.",
      time: "2 hours ago",
      isRead: false,
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80",
      icon: <Heart size={16} className="text-[#e02c5a]" fill="currentColor" />,
    },
    {
      id: 3,
      type: "message",
      text: "Priya Singh sent you a new message. Upgrade to premium to read it.",
      time: "5 hours ago",
      isRead: true,
      img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80",
      icon: <MessageSquare size={16} className="text-green-500" />,
    },
    {
      id: 4,
      type: "system",
      text: "Your profile is getting 4x more views. Keep your details updated!",
      time: "1 day ago",
      isRead: true,
      img: null,
      icon: <Award size={24} className="text-yellow-500" />,
    },
    {
      id: 5,
      type: "shortlist",
      text: "Someone from Delhi shortlisted your profile.",
      time: "2 days ago",
      isRead: true,
      img: null,
      icon: <StarIcon />, // Using custom star since imported icons are limited above
    },
  ]);

  // Read/Unread Logic
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
  };

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    );
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

      {/* ================= MAIN CONTENT (NOTIFICATIONS FEED) ================= */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-10 relative z-10 pb-12">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-[#821511] flex items-center gap-3">
              Your Love Alerts
              {unreadCount > 0 && (
                <span className="bg-gradient-to-r from-[#ed2c5b] to-[#c0163e] text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">
                  {unreadCount} New
                </span>
              )}
            </h1>
            <p className="text-gray-600 font-medium mt-1.5 flex items-center gap-2">
              Stay updated with your profile activity{" "}
              <Sparkles size={16} className="text-[#fbbf24]" />
            </p>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-sm font-bold text-[#e02c5a] hover:text-[#c0163e] hover:underline flex items-center gap-1.5 bg-white/80 px-4 py-2 rounded-xl shadow-sm border border-rose-100 transition-all"
            >
              <CheckCircle size={16} /> Mark all as read
            </button>
          )}
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => markAsRead(notif.id)}
              className={`p-4 sm:p-5 rounded-3xl flex items-start gap-4 border transition-all duration-300 cursor-pointer 
                ${
                  notif.isRead
                    ? "bg-white/95 backdrop-blur-md border-rose-100 hover:bg-rose-50 hover:shadow-md shadow-sm"
                    : "bg-gradient-to-r from-[#fff0f5] to-white border-[#e02c5a]/30 shadow-md hover:shadow-lg scale-[1.01]"
                }
              `}
            >
              {/* Avatar / Icon */}
              <div className="relative shrink-0">
                {notif.img ? (
                  <img
                    src={notif.img}
                    alt="User"
                    className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-rose-50 border-2 border-white shadow-md flex items-center justify-center">
                    {notif.icon}
                  </div>
                )}

                {/* Small overlay icon if image is present */}
                {notif.img && (
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1.5 shadow-md border border-rose-50">
                    {notif.icon}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pt-1">
                <p
                  className={`text-[15px] sm:text-base leading-snug ${notif.isRead ? "text-gray-700 font-medium" : "text-gray-900 font-bold"}`}
                >
                  {notif.text}
                </p>
                <span className="text-[11px] sm:text-xs text-gray-500 font-bold mt-2 block uppercase tracking-wider">
                  {notif.time}
                </span>
              </div>

              {/* Unread Indicator Dot */}
              {!notif.isRead && (
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#ed2c5b] to-[#c0163e] mt-2 shrink-0 shadow-[0_0_8px_rgba(224,44,90,0.6)] animate-pulse"></div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {notifications.length === 0 && (
          <div className="text-center py-20 bg-white/80 backdrop-blur-md rounded-3xl border border-rose-100 shadow-sm mt-8">
            <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Bell size={40} className="text-[#e02c5a]/40" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2 font-serif">
              No notifications yet
            </h3>
            <p className="text-gray-500 font-medium">
              When you get beautiful matches or profile views, they'll show up
              right here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Custom Star Icon component
const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-[#fbbf24]"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

export default Notifications;
