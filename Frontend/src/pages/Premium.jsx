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
        "Admin Profile Guidance",
        "Basic Visibility",
      ],
      color: "from-gray-300 to-gray-100",
      accent: "text-gray-500",
      bgAccent: "bg-gray-50",
      icon: <Star size={24} className="text-gray-500 drop-shadow-sm" />,
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
        "Admin Arranged Meetings",
        "Top Visibility",
        "Priority Support",
      ],
      color: "from-amber-400 to-yellow-200",
      accent: "text-amber-600",
      bgAccent: "bg-gradient-to-br from-amber-50 to-yellow-100",
      featured: true,
      icon: <Crown size={28} className="text-amber-600 drop-shadow-md" />,
    },
    {
      name: "Platinum",
      originalPrice: "6,999",
      price: "2,999",
      discount: "57% OFF",
      duration: "12 Months",
      features: [
        "All Gold Features",
        "Admin Personal Visit",
        "Family Meeting Setup",
        "Background Verification",
        "VIP Badge",
      ],
      color: "from-rose-400 to-pink-300",
      accent: "text-rose-500",
      bgAccent: "bg-gradient-to-br from-rose-50 to-pink-100",
      icon: (
        <Heart
          size={24}
          fill="white"
          className="text-rose-500 drop-shadow-sm"
        />
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#fff5f7] font-sans pb-12 sm:pb-16 relative overflow-x-hidden selection:bg-rose-200 selection:text-rose-900">
      {/* ================= MAGICAL CSS ANIMATIONS ================= */}
      <style>{`
        @keyframes float-up {
          0% { transform: translateY(0px) scale(1) rotate(0deg); opacity: 0; }
          20% { opacity: 0.6; }
          80% { opacity: 0.6; }
          100% { transform: translateY(-150px) scale(1.2) rotate(20deg); opacity: 0; }
        }
        @keyframes sway {
          0%, 100% { transform: rotate(-10deg); }
          50% { transform: rotate(15deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 15px rgba(224,44,90,0.2); border-color: rgba(224,44,90,0.3); }
          50% { box-shadow: 0 0 30px rgba(224,44,90,0.4); border-color: rgba(224,44,90,0.6); }
        }
        .animate-float-1 { animation: float-up 6s ease-in-out infinite; }
        .animate-float-2 { animation: float-up 8s ease-in-out infinite 2s; }
        .animate-float-3 { animation: float-up 7s ease-in-out infinite 4s; }
        .animate-sway { animation: sway 4s ease-in-out infinite; }
      `}</style>

      {/* ================= FLOATING HEARTS & FLOWERS BACKGROUND ================= */}
      <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-rose-300/20 blur-[80px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-amber-300/15 blur-[80px]"></div>

        <div className="absolute top-[10%] left-[10%] text-rose-300 opacity-40 animate-sway">
          <Flower2 size={30} className="sm:w-10 sm:h-10" />
        </div>
        <div className="absolute top-[25%] right-[15%] text-rose-400 opacity-30 animate-float-1">
          <Heart
            size={24}
            className="sm:w-[30px] sm:h-[30px]"
            fill="currentColor"
          />
        </div>
        <div className="absolute top-[40%] left-[8%] text-amber-300 opacity-50 animate-pulse duration-[3000ms]">
          <Sparkles size={24} className="sm:w-[35px] sm:h-[35px]" />
        </div>
        <div
          className="absolute top-[50%] right-[10%] text-pink-300 opacity-40 animate-sway"
          style={{ animationDelay: "1s" }}
        >
          <Flower2 size={35} className="sm:w-[50px] sm:h-[50px]" />
        </div>
        <div className="absolute bottom-[30%] left-[15%] text-rose-300 opacity-30 animate-float-2">
          <Heart
            size={30}
            className="sm:w-[40px] sm:h-[40px]"
            fill="currentColor"
          />
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 relative z-10 pt-12 md:pt-12">
        {/* Header Section */}
        <div className="text-center mb-10 sm:mb-14 relative">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/60 text-[#e02c5a] font-bold text-[10px] sm:text-xs mb-3 sm:mb-4 border border-rose-200 shadow-sm backdrop-blur-md">
            <Heart size={12} fill="#e02c5a" className="animate-pulse" /> Find
            Your Soulmate Faster
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#821511] via-[#e02c5a] to-[#821511] mb-2 sm:mb-3 tracking-tight leading-tight px-2">
            Choose Your Forever Plan
          </h1>
          <p className="text-gray-600 font-medium text-[13px] sm:text-base max-w-xl mx-auto px-2 sm:px-4 leading-relaxed">
            Upgrade to a premium plan and let our expert matchmaking team do the
            heavy lifting for your marriage.
          </p>
        </div>

        {/* Pricing Cards Grid - Mobile Optimized spacing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-6 md:gap-8 items-stretch max-w-5xl mx-auto px-2 sm:px-0">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-3xl p-5 sm:p-6 md:p-8 flex flex-col transition-all duration-300 backdrop-blur-2xl bg-white/90 border ${
                plan.featured
                  ? "border-[#e02c5a]/50 shadow-[0_15px_40px_rgba(224,44,90,0.15)] lg:scale-105 z-10 mt-2 sm:mt-0"
                  : "border-rose-100 shadow-[0_8px_25px_rgba(224,44,90,0.05)] hover:shadow-[0_12px_30px_rgba(224,44,90,0.1)] hover:-translate-y-1"
              }`}
              style={
                plan.featured ? { animation: "pulse-glow 3s infinite" } : {}
              }
            >
              {/* Most Popular Ribbon - Fixed for mobile */}
              {plan.featured && (
                <div className="absolute -top-3.5 left-0 right-0 flex justify-center w-full">
                  <div className="bg-gradient-to-r from-[#ed2c5b] via-[#e02c5a] to-[#c0163e] text-white text-[9px] sm:text-[10px] font-black px-4 sm:px-5 py-1.5 rounded-full shadow-[0_5px_15px_rgba(224,44,90,0.4)] tracking-widest uppercase flex items-center gap-1.5 border border-white/30">
                    <Crown size={12} className="animate-pulse" /> MOST POPULAR
                  </div>
                </div>
              )}

              {/* Discount Badge */}
              <div className="absolute top-4 right-4 bg-gradient-to-r from-green-100 to-emerald-50 text-emerald-700 text-[9px] sm:text-[10px] font-black px-2 py-1 rounded-md border border-green-200 shadow-sm">
                {plan.discount}
              </div>

              {/* Card Icon */}
              <div
                className={`mt-1 sm:mt-2 mb-4 sm:mb-5 flex justify-center ${plan.bgAccent} w-12 h-12 sm:w-14 sm:h-14 mx-auto rounded-xl sm:rounded-2xl items-center shadow-inner border border-white/50 group-hover:scale-110 transition-transform duration-300`}
              >
                {plan.icon}
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-1.5 sm:mb-2 font-serif">
                {plan.name}
              </h3>

              {/* Pricing Section */}
              <div className="flex flex-col items-center justify-center mb-2">
                <span className="text-xs sm:text-sm font-bold text-gray-400 line-through decoration-rose-400/60 decoration-2 mb-[-2px] sm:mb-[-4px]">
                  ₹{plan.originalPrice}
                </span>
                <div className="flex items-baseline gap-1">
                  <span
                    className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${plan.featured ? "text-[#e02c5a]" : "text-[#821511]"}`}
                  >
                    ₹{plan.price}
                  </span>
                </div>
              </div>

              <div className="flex justify-center mb-5 sm:mb-6">
                <span
                  className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border ${plan.featured ? "bg-rose-50 border-rose-200 text-[#e02c5a]" : "bg-gray-50 border-gray-200 text-gray-500"}`}
                >
                  {plan.duration}
                </span>
              </div>

              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-rose-100 to-transparent mb-5 sm:mb-6"></div>

              {/* Features List */}
              <ul className="space-y-3 sm:space-y-3.5 mb-6 sm:mb-8 flex-grow px-1 sm:px-0">
                {plan.features.map((feat, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-gray-700 font-medium text-[13px] sm:text-sm leading-snug"
                  >
                    <div className="bg-green-50 rounded-full p-0.5 shrink-0 mt-0.5">
                      <CheckCircle
                        size={14}
                        className="text-green-500 sm:w-4 sm:h-4"
                        strokeWidth={3}
                      />
                    </div>
                    {feat}
                  </li>
                ))}
              </ul>

              {/* Call to Action Button */}
              <button
                className={`w-full py-3 sm:py-3.5 rounded-xl font-bold text-[13px] sm:text-[15px] transition-all duration-300 flex items-center justify-center gap-2 group mt-auto ${
                  plan.featured
                    ? "bg-gradient-to-r from-[#ed2c5b] to-[#c0163e] text-white shadow-[0_8px_20px_rgba(224,44,90,0.3)] hover:shadow-[0_12px_25px_rgba(224,44,90,0.4)] hover:-translate-y-0.5"
                    : "bg-white text-[#e02c5a] border border-rose-200 hover:border-[#e02c5a] hover:bg-rose-50 shadow-sm"
                }`}
              >
                Get {plan.name} Plan
                <Sparkles
                  size={14}
                  className={`sm:w-4 sm:h-4 ${plan.featured ? "text-yellow-300" : "text-[#e02c5a]"} group-hover:animate-pulse`}
                />
              </button>
            </div>
          ))}
        </div>

        {/* Trust Badge / Security Assurances */}
        <div className="mt-10 sm:mt-14 text-center flex flex-col items-center justify-center gap-3 sm:gap-4">
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-6 text-gray-500 text-[10px] sm:text-xs font-bold">
            <div className="flex items-center gap-1.5 bg-white/70 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-rose-100 shadow-sm">
              <ShieldCheck size={14} className="text-green-500 sm:w-4 sm:h-4" />
              100% Secure Payments
            </div>
            <div className="flex items-center gap-1.5 bg-white/70 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-rose-100 shadow-sm">
              <CheckCircle size={14} className="text-blue-500 sm:w-4 sm:h-4" />
              Verified Profiles
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumPlans;
