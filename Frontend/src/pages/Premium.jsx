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
      originalPrice: "1,499",
      price: "999",
      discount: "33% OFF",
      duration: "3 Months",
      features: [
        "Verified Profiles",
        "100 Interests",
        "Admin Profile Guidance", // 🔥 Admin will guide
        "Basic Visibility",
      ],
      color: "from-gray-300 to-gray-100",
      accent: "text-gray-500",
      bgAccent: "bg-gray-50",
      icon: <Star size={32} className="text-gray-500" />,
    },
    {
      name: "Gold",
      originalPrice: "3,499",
      price: "1,999",
      discount: "43% OFF",
      duration: "6 Months",
      features: [
        "Verified Profiles",
        "Unlimited Interests",
        "Admin Arranged Meetings", // 🔥 Admin fixes meetings
        "Top Visibility",
        "Priority Support",
      ],
      color: "from-amber-400 to-yellow-200",
      accent: "text-amber-600",
      bgAccent: "bg-amber-50",
      featured: true,
      icon: <Crown size={40} className="text-amber-600 drop-shadow-md" />,
    },
    {
      name: "Platinum",
      originalPrice: "6,999",
      price: "2,999",
      discount: "57% OFF",
      duration: "12 Months",
      features: [
        "All Gold Features",
        "Admin Personal Visit", // 🔥 Admin khud jaake milega
        "Family Meeting Setup", // 🔥 Admin baat-chit karayega
        "Background Verification",
        "VIP Badge",
      ],
      color: "from-rose-400 to-pink-300",
      accent: "text-rose-500",
      bgAccent: "bg-rose-50",
      icon: <Heart size={32} fill="white" className="text-rose-500" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff0f5] via-white to-[#ffe4e6] font-sans pb-20 relative overflow-x-hidden">
      {/* Background Magic Elements */}
      <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -right-[5%] w-[400px] h-[400px] rounded-full bg-[#e02c5a]/10 blur-[90px]"></div>
        <div className="absolute top-[40%] -left-[10%] w-[500px] h-[500px] rounded-full bg-[#fbbf24]/10 blur-[90px]"></div>

        <div className="absolute top-[20%] left-[10%] opacity-15 animate-pulse duration-[3000ms]">
          <Flower2 size={80} color="#e02c5a" />
        </div>
        <div className="absolute bottom-[20%] right-[10%] opacity-20 animate-bounce duration-[4000ms]">
          <Sparkles size={60} color="#fbbf24" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 relative z-10 pt-24 md:pt-16">
        <div className="text-center mb-16 relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100/50 text-[#e02c5a] font-bold text-sm mb-4 border border-rose-200 shadow-sm backdrop-blur-md">
            <Sparkles size={16} /> Premium Matchmaking
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#821511] mb-4 tracking-tight">
            Choose Your Forever Plan
          </h1>
          <p className="text-gray-600 font-medium text-lg max-w-2xl mx-auto">
            Get personalized assistance and complete support from our expert
            team to find your perfect match.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end mt-10 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-[2.5rem] p-8 transition-all duration-500 hover:-translate-y-3 backdrop-blur-xl bg-white/70 border border-white/60 ${
                plan.featured
                  ? "ring-2 ring-[#e02c5a]/50 scale-105 shadow-[0_30px_60px_rgba(224,44,90,0.15)] z-10"
                  : "shadow-[0_15px_50px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_60px_rgba(224,44,90,0.1)]"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 flex flex-col items-center">
                  <div className="bg-gradient-to-r from-[#ed2c5b] to-[#c0163e] text-white text-xs font-black px-6 py-2 rounded-full shadow-[0_8px_20px_rgba(224,44,90,0.4)] tracking-widest uppercase flex items-center gap-2 border border-white/20">
                    <Crown size={14} /> MOST POPULAR
                  </div>
                </div>
              )}

              {/* Discount Badge */}
              <div className="absolute top-6 right-6 bg-green-100 text-green-700 text-xs font-black px-3 py-1 rounded-lg border border-green-200">
                {plan.discount}
              </div>

              <div
                className={`mb-6 flex justify-center ${plan.bgAccent} w-24 h-24 mx-auto rounded-[2rem] items-center shadow-inner rotate-3 hover:rotate-0 transition-transform duration-300 border border-white`}
              >
                {plan.icon}
              </div>

              <h3 className="text-3xl font-bold text-center text-gray-800 mb-2 font-serif">
                {plan.name}
              </h3>

              {/* Pricing Section with Cut Price */}
              <div className="flex flex-col items-center justify-center mb-1">
                <span className="text-xl font-bold text-gray-400 line-through decoration-rose-400/60 decoration-2 mb-[-8px]">
                  ₹{plan.originalPrice}
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-extrabold text-[#821511] tracking-tight">
                    ₹{plan.price}
                  </span>
                </div>
              </div>

              <p className="text-[#e02c5a] text-center font-bold mb-8 text-sm uppercase tracking-wider bg-rose-50 w-max mx-auto px-4 py-1 rounded-full mt-2 border border-rose-100">
                {plan.duration}
              </p>

              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-8"></div>

              <ul className="space-y-4 mb-10 min-h-[220px]">
                {plan.features.map((feat, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-gray-700 font-medium text-[15px] leading-snug"
                  >
                    <CheckCircle
                      size={20}
                      className="text-green-500 shrink-0 mt-0.5"
                      strokeWidth={2.5}
                    />{" "}
                    {feat}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 rounded-2xl font-bold text-[17px] transition-all duration-300 flex items-center justify-center gap-2 group ${
                  plan.featured
                    ? "bg-gradient-to-r from-[#ed2c5b] to-[#c0163e] text-white shadow-[0_10px_25px_rgba(224,44,90,0.3)] hover:shadow-[0_15px_35px_rgba(224,44,90,0.45)] hover:-translate-y-1 border border-rose-400/50"
                    : "bg-white text-[#e02c5a] border-2 border-rose-100 hover:border-[#e02c5a] hover:bg-rose-50 shadow-sm hover:shadow-md"
                }`}
              >
                Get {plan.name} Plan
                <ShieldCheck
                  size={18}
                  className="group-hover:scale-110 transition-transform"
                />
              </button>
            </div>
          ))}
        </div>

        {/* Trust Badge at bottom */}
        <div className="mt-16 text-center flex flex-col items-center justify-center">
          <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
            <ShieldCheck size={18} className="text-green-600" />
            100% Secure & Trusted Matchmaking
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumPlans;
