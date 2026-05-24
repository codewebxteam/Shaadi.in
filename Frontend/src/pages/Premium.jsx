import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  CheckCircle,
  Crown,
  Star,
  ShieldCheck,
  Sparkles,
  Flower2,
} from "lucide-react";

const PremiumPlans = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Silver",
      price: "999",
      duration: "3 Months",
      features: [
        "Verified Profiles",
        "100 Interests",
        "Admin Profile Guidance", // 🔥 Updated: No chat, admin will guide
        "Basic Visibility",
      ],
      color: "from-gray-300 to-gray-100",
      icon: <Star size={32} className="text-gray-500" />,
    },
    {
      name: "Gold",
      price: "1,999",
      duration: "6 Months",
      features: [
        "Verified Profiles",
        "Unlimited Interests",
        "Admin Arranged Meetings", // 🔥 Updated: Admin fixes meetings
        "Top Visibility",
        "Priority Support",
      ],
      color: "from-amber-400 to-yellow-200",
      featured: true,
      icon: <Crown size={40} className="text-amber-600" />,
    },
    {
      name: "Platinum",
      price: "2,999",
      duration: "12 Months",
      features: [
        "All Gold Features",
        "Admin Personal Visit", // 🔥 Updated: Admin khud jaake milega
        "Family Meeting Setup", // 🔥 Updated: Admin baat-chit karayega
        "Background Verification",
        "VIP Badge",
      ],
      color: "from-rose-400 to-pink-300",
      icon: <Heart size={32} fill="white" className="text-rose-500" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff0f5] via-white to-[#ffe4e6] font-sans pb-20 relative overflow-x-hidden">
      {/* Background Magic Elements */}
      <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[10%] opacity-10 animate-pulse">
          <Flower2 size={100} color="#e02c5a" />
        </div>
        <div className="absolute bottom-[20%] right-[10%] opacity-10 animate-bounce">
          <Sparkles size={80} color="#fbbf24" />
        </div>
      </div>

      {/* 🔥 Hardcoded Navbar removed as requested! Global Navbar will take its place. */}

      <div className="max-w-6xl mx-auto px-4 py-16 relative z-10 pt-24 md:pt-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#821511] mb-4">
            Choose Your Premium Plan
          </h1>
          <p className="text-gray-600 font-medium text-lg">
            Complete support from our team to find your perfect match.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end mt-10">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(224,44,90,0.15)] ${
                plan.featured
                  ? "border-2 border-[#e02c5a] scale-105 shadow-2xl relative z-10"
                  : "border border-rose-100 shadow-[0_15px_50px_rgba(0,0,0,0.05)]"
              }`}
            >
              {plan.featured && (
                <div className="bg-gradient-to-r from-[#ed2c5b] to-[#c0163e] text-white text-xs font-bold px-5 py-1.5 rounded-full absolute -top-4 left-1/2 -translate-x-1/2 shadow-lg tracking-wider">
                  MOST POPULAR
                </div>
              )}

              <div className="mb-6 flex justify-center bg-gray-50/50 w-20 h-20 mx-auto rounded-full items-center shadow-inner">
                {plan.icon}
              </div>
              <h3 className="text-2xl font-bold text-center text-gray-800 mb-2">
                {plan.name}
              </h3>
              <div className="text-4xl font-extrabold text-center text-[#821511] mb-1">
                ₹{plan.price}
              </div>
              <p className="text-gray-500 text-center font-bold mb-8">
                {plan.duration}
              </p>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feat, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-gray-700 font-medium text-sm md:text-base"
                  >
                    <CheckCircle
                      size={20}
                      className="text-green-500 shrink-0"
                    />{" "}
                    {feat}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 rounded-2xl font-bold transition-all duration-300 ${
                  plan.featured
                    ? "bg-gradient-to-r from-[#ed2c5b] to-[#c0163e] text-white shadow-[0_10px_25px_rgba(224,44,90,0.3)] hover:shadow-[0_15px_35px_rgba(224,44,90,0.4)]"
                    : "bg-rose-50 text-[#e02c5a] border border-rose-100 hover:bg-[#e02c5a] hover:text-white hover:border-[#e02c5a]"
                }`}
              >
                Select {plan.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PremiumPlans;
