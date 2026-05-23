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
        "Chat Support",
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
        "Direct Calling",
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
        "Personalized Matchmaker",
        "Background Verification",
        "Incognito Mode",
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

      {/* Navbar (Same as previous) */}
      <nav className="bg-rose-50/90 backdrop-blur-md border-b border-rose-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <img
            onClick={() => navigate("/dashboard")}
            src="https://ik.imagekit.io/dlolttjjd/Shadi_assets/colourlogotext.webp?updatedAt=1779353927500"
            alt="Logo"
            className="h-11 w-auto object-contain cursor-pointer"
          />
          <button
            onClick={() => navigate("/dashboard")}
            className="font-bold text-[#821511] hover:text-[#e02c5a]"
          >
            Back to Dashboard
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-16 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#821511] mb-4">
            Choose Your Premium Plan
          </h1>
          <p className="text-gray-600 font-medium text-lg">
            Unlock your perfect match with our specially curated plans.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-3xl p-8 shadow-[0_15px_50px_rgba(0,0,0,0.08)] border-2 ${plan.featured ? "border-[#e02c5a] scale-105 shadow-2xl" : "border-rose-100"}`}
            >
              {plan.featured && (
                <div className="bg-[#e02c5a] text-white text-xs font-bold px-4 py-1 rounded-full absolute -top-3 left-1/2 -translate-x-1/2">
                  MOST POPULAR
                </div>
              )}

              <div className="mb-6">{plan.icon}</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {plan.name}
              </h3>
              <div className="text-4xl font-extrabold text-[#821511] mb-1">
                ₹{plan.price}
              </div>
              <p className="text-gray-500 font-bold mb-6">{plan.duration}</p>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feat, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-gray-700 font-medium"
                  >
                    <CheckCircle size={18} className="text-green-500" /> {feat}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 rounded-xl font-bold transition-all ${plan.featured ? "bg-gradient-to-r from-[#ed2c5b] to-[#c0163e] text-white shadow-lg" : "bg-gray-100 text-gray-800 hover:bg-gray-200"}`}
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
