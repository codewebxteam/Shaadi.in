import React, { useState, useEffect } from "react";
import {
  Heart,
  ShieldCheck,
  Users,
  MapPin,
  Flower2,
  Sparkles,
} from "lucide-react";

const About = () => {
  // 🔥 Carousel track karne ke liye state
  const [currentSlide, setCurrentSlide] = useState(0);

  // 🔥 ImageKit Links (Hero wala base URL + crop1 se crop4)
  const aboutImages = [
    "https://ik.imagekit.io/dlolttjjd/Shadi_assets/crop1.webp",
    "https://ik.imagekit.io/dlolttjjd/Shadi_assets/crop2.webp",
    "https://ik.imagekit.io/dlolttjjd/Shadi_assets/crop3.webp",
    "https://ik.imagekit.io/dlolttjjd/Shadi_assets/crop4.webp",
  ];

  // 🔥 Automatic slide logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % aboutImages.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [aboutImages.length]);

  return (
    <div id="about-section" className="w-full min-h-screen bg-white">
      {/* HEADER SECTION */}
      {/* Added beautiful wedding rose/pink glowing background gradients */}
      <div className="w-full bg-gradient-to-b from-[#fff0f5] via-white to-[#fff0f5] pt-32 pb-16 px-6 text-center relative overflow-hidden">
        {/* Soft Glowing Orbs for Romantic Vibe */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#e02c5a]/5 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#fbbf24]/5 rounded-full blur-[80px] pointer-events-none"></div>

        {/* Background decorative elements - ✅ FIXED BLACK HEART BUG (Used direct Hex codes instead of currentColor) */}
        <div className="absolute top-10 left-10 opacity-15 rotate-12">
          <Heart size={100} fill="#e02c5a" color="#e02c5a" strokeWidth={1} />
        </div>
        <div className="absolute bottom-10 right-10 opacity-15 -rotate-12">
          <Heart size={80} fill="#fbbf24" color="#fbbf24" strokeWidth={1} />
        </div>

        {/* 🔥 NEW: Lightweight Wedding Flowers & Sparkles Background */}
        <div className="absolute top-24 right-20 opacity-10 animate-pulse">
          <Flower2 size={60} color="#e02c5a" strokeWidth={1.5} />
        </div>
        <div
          className="absolute bottom-20 left-16 opacity-15"
          style={{ animation: "bounce 3s infinite" }}
        >
          <Sparkles size={50} color="#fbbf24" strokeWidth={1.5} />
        </div>
        <div className="absolute top-40 left-1/4 opacity-5 rotate-45">
          <Flower2 size={90} color="#821511" strokeWidth={1} />
        </div>
        <div className="absolute bottom-8 right-1/3 opacity-15 -rotate-12">
          <Heart size={45} fill="#e02c5a" color="#e02c5a" strokeWidth={1} />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-[1px] w-12 bg-[#e02c5a]/30"></div>
            <span className="text-[#e02c5a] font-bold tracking-widest text-sm uppercase">
              Our Story
            </span>
            <div className="h-[1px] w-12 bg-[#e02c5a]/30"></div>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#4b5563] mb-6 leading-tight">
            Bringing Hearts Together in{" "}
            <span className="text-[#e02c5a]">Your City</span>
          </h1>
          <p className="text-gray-600 md:text-lg font-medium leading-relaxed max-w-2xl mx-auto">
            At Local Shaadi.in, we believe every beautiful journey begins with
            the right choice. We are dedicated to helping you find your perfect
            life partner right from your own community and culture.
          </p>
        </div>
      </div>

      {/* MAIN CONTENT SECTION */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 flex flex-col lg:flex-row gap-16 items-center">
        {/* LEFT: Image Carousel */}
        <div className="w-full lg:w-1/2 relative">
          <div className="aspect-square md:aspect-[4/3] bg-gray-100 rounded-[40px] overflow-hidden relative shadow-2xl border-4 border-white">
            {aboutImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`About Couple ${index + 1}`}
                className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-1000 ease-in-out ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
            <div className="absolute inset-0 bg-[#e02c5a]/10 mix-blend-overlay pointer-events-none"></div>
          </div>

          {/* Floating Badge - ✅ FIXED BLACK HEART BUG (Added direct color="#fbbf24") */}
          <div className="absolute -bottom-6 -right-2 md:-right-6 bg-white p-5 rounded-3xl shadow-[0_10px_30px_rgba(224,44,90,0.15)] flex flex-col items-center gap-1 border border-gray-50 z-10">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Heart
                  key={i}
                  size={16}
                  fill="#fbbf24"
                  color="#fbbf24"
                  className="text-[#fbbf24]"
                />
              ))}
            </div>
            <span className="font-bold text-gray-800 text-sm mt-1">
              1M+ Matches
            </span>
            <span className="text-[10px] text-gray-500 font-medium">
              Made with trust
            </span>
          </div>
        </div>

        {/* RIGHT: Text & Features Grid */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6 relative z-10">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#821511] leading-tight">
            Why Choose Local Shaadi?
          </h2>
          <p className="text-gray-600 leading-relaxed font-medium">
            Finding a partner is a huge milestone. We focus on localized
            matchmaking to ensure you find someone who truly understands your
            roots, shares your values, and matches your family's lifestyle.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-6">
            <div className="flex gap-4 items-start group">
              <div className="p-3.5 bg-[#fff0f5] rounded-2xl text-[#e02c5a] group-hover:bg-[#e02c5a] group-hover:text-white transition-colors duration-300 shadow-sm">
                <ShieldCheck size={24} strokeWidth={2} color="currentColor" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg">
                  100% Verified
                </h3>
                <p className="text-sm text-gray-500 mt-1 leading-snug">
                  Every profile undergoes strict manual screening.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start group">
              <div className="p-3.5 bg-[#fff0f5] rounded-2xl text-[#eab308] group-hover:bg-[#eab308] group-hover:text-white transition-colors duration-300 shadow-sm">
                <MapPin size={24} strokeWidth={2} color="currentColor" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg">
                  Local Matches
                </h3>
                <p className="text-sm text-gray-500 mt-1 leading-snug">
                  Connect with eligible singles from your own city.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start group">
              <div className="p-3.5 bg-[#fff0f5] rounded-2xl text-[#e02c5a] group-hover:bg-[#e02c5a] group-hover:text-white transition-colors duration-300 shadow-sm">
                <Users size={24} strokeWidth={2} color="currentColor" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg">
                  Active Community
                </h3>
                <p className="text-sm text-gray-500 mt-1 leading-snug">
                  A vast, growing network of genuine people.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start group">
              <div className="p-3.5 bg-[#fff0f5] rounded-2xl text-[#821511] group-hover:bg-[#821511] group-hover:text-white transition-colors duration-300 shadow-sm">
                <Heart size={24} strokeWidth={2} color="currentColor" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg">
                  Success Stories
                </h3>
                <p className="text-sm text-gray-500 mt-1 leading-snug">
                  Countless happy couples found their forever here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
