import React, { useState, useEffect } from 'react';
import { Heart, MapPin, Phone, Video, UserPlus } from 'lucide-react';

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const backgroundImages = [
    { desktop: "https://ik.imagekit.io/rbrxweg2q/couple.jpeg" }, 
    { desktop: "https://ik.imagekit.io/rbrxweg2q/muslim-couple.jpg" }, 
    { desktop: "https://ik.imagekit.io/rbrxweg2q/sickh-couple.jpg" }, 
    { desktop: "https://ik.imagekit.io/rbrxweg2q/cheristinity-couple.jpg" }, 
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      // ✅ Window check added for safe Vercel build
      if (typeof window !== 'undefined' && window.innerWidth >= 768) { 
        setCurrentImage((prev) => (prev + 1) % backgroundImages.length);
      }
    }, 4000); 

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <section className="relative w-full flex flex-col md:flex-row md:items-center overflow-hidden bg-gradient-to-b from-[#fff0f5] to-white md:bg-[#fff0f5] min-h-[100dvh] md:min-h-0 md:h-[650px]">
      
      {/* DESKTOP BACKGROUND IMAGE SLIDER */}
      <div className="hidden md:block absolute inset-0 w-full h-full z-0 overflow-hidden">
        {backgroundImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentImage ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <img 
              src={img.desktop} 
              alt={`Wedding Couple ${index + 1}`} 
              className="w-full h-full object-cover object-center"
            />
          </div>
        ))}
      </div>

      {/* MOBILE DECORATIVE BACKGROUND */}
      <div className="md:hidden absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-[#e02c5a]/10 rounded-full blur-[60px] translate-x-1/3 -translate-y-1/4"></div>
        <div className="absolute bottom-[20%] left-0 w-[50vw] h-[50vw] bg-[#fbbf24]/10 rounded-full blur-[50px] -translate-x-1/3"></div>
        
        <div className="absolute top-[25%] left-[10%] opacity-20"><Heart size={28} fill="#e02c5a" className="text-[#e02c5a] -rotate-12" /></div>
        <div className="absolute top-[45%] right-[15%] opacity-20"><Heart size={36} fill="#fbbf24" className="text-[#fbbf24] rotate-12" /></div>
        <div className="absolute bottom-[15%] left-[20%] opacity-10"><Heart size={24} fill="#821511" className="text-[#821511] -rotate-6" /></div>
      </div>

      {/* MAIN CONTENT CONTAINER */}
      <div className="relative z-40 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex flex-col md:flex-row justify-center md:justify-between items-center h-full min-h-[100dvh] md:min-h-0 pt-28 md:pt-2 pb-16 md:pb-6 md:py-10">
        
        <div className="flex flex-col items-center md:items-start max-w-full md:max-w-[420px] w-full mt-0 md:mt-[-35px] mb-8 md:mb-0">
          
          <div className="flex items-center justify-center md:justify-start gap-1.5 mb-2 md:mb-2.5 w-full md:w-auto ml-0 md:ml-1">
            <svg width="40" height="10" viewBox="0 0 60 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-[55px] md:h-[13px]">
              <path d="M0 7 Q 20 7 35 2 T 60 7" stroke="#9ca3af" strokeWidth="1" fill="none" />
            </svg>
            <Heart size={16} className="text-[#e02c5a] md:w-[17px] md:h-[17px]" strokeWidth={1.5} fill="none" />
            <svg width="40" height="10" viewBox="0 0 60 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="scale-x-[-1] md:w-[55px] md:h-[13px]">
              <path d="M0 7 Q 20 7 35 2 T 60 7" stroke="#9ca3af" strokeWidth="1" fill="none" />
            </svg>
          </div>
          
          <h2 className="text-[28px] md:text-[36px] text-[#4b5563] leading-none font-serif tracking-wide text-center md:text-left w-full ml-0 md:ml-1">
            Choose your
          </h2>
          <h1 className="text-[64px] md:text-[90px] font-bold text-[#e02c5a] leading-[1] font-serif tracking-tight drop-shadow-sm md:drop-shadow-md text-center md:text-left w-full mt-1">
            Partner
          </h1>
          
          <div className="flex items-center justify-center md:justify-start gap-1.5 md:gap-2 mt-1 md:mt-1.5 w-full ml-0 md:ml-1">
            <span className="font-serif text-[22px] md:text-[26px] text-[#4b5563]">in</span>
            <MapPin size={22} className="text-[#fbbf24] md:w-[28px] md:h-[28px]" fill="#fbbf24" stroke="white" strokeWidth={1.5} />
            <span className="text-[#e02c5a] font-sans font-bold text-[22px] md:text-[26px] tracking-wide">Your Nearby</span>
          </div>
          
          <div className="flex items-center justify-center md:justify-start w-full max-w-[280px] md:max-w-[360px] gap-3 md:gap-4 mt-5 md:mt-6 mb-4 md:mb-4 mx-auto md:mx-0 ml-0 md:ml-1">
            <div className="h-[1px] flex-1 bg-gray-300 md:bg-gray-400/50"></div>
            <Heart size={12} fill="#e02c5a" className="text-[#e02c5a] md:w-[13px] md:h-[13px]" strokeWidth={0} />
            <div className="h-[1px] flex-1 bg-gray-400/50"></div>
          </div>
          
          <div className="w-full flex justify-center md:justify-start ml-0 md:ml-1 mb-2 md:mb-2 px-4 md:px-0">
            <p className="text-[13px] md:text-[14px] text-gray-600 md:text-gray-800 leading-[1.6] md:leading-[1.5] font-medium text-center md:text-left">
              Trusted by millions. Because every<br className="hidden md:block" /> beautiful journey begins with the right choice.
            </p>
          </div>
          
          <div className="w-full flex justify-center md:justify-start mt-6 md:mt-5 ml-0 md:ml-1">
            <div className="p-[5px] rounded-full bg-[#e02c5a]/15 shadow-[0_0_20px_rgba(224,44,90,0.2)] md:shadow-[0_0_15px_rgba(224,44,90,0.25)]">
              <button className="relative flex items-center justify-center gap-2 md:gap-2.5 bg-gradient-to-r from-[#ed2c5b] to-[#c0163e] text-white px-8 py-3.5 md:px-8 md:py-3.5 rounded-full text-[16px] md:text-[18px] font-bold w-[240px] md:w-[260px] hover:opacity-95 transition-all overflow-hidden active:scale-95">
                <div className="absolute inset-0 rounded-full border-[1.5px] border-[#fde68a]/40 m-[1px]"></div>
                <UserPlus size={20} className="relative z-10 md:w-[22px] md:h-[22px]" fill="white" strokeWidth={1.5} />
                <span className="relative z-10 tracking-wide">New Join</span>
              </button>
            </div>
          </div>

          <div className="flex md:hidden items-center justify-between w-full max-w-[320px] mx-auto mt-12 bg-white/70 backdrop-blur-xl p-2 rounded-[24px] shadow-[0_10px_40px_rgba(224,44,90,0.12)] border border-white/60">
            <a href="tel:+" className="flex-1 flex flex-col items-center gap-1.5 py-3 rounded-[18px] hover:bg-white active:bg-white/80 transition-all group">
              <div className="bg-[#fff0f5] p-2.5 rounded-full text-[#e02c5a] group-hover:scale-110 transition-transform">
                <Phone size={18} fill="currentColor" />
              </div>
              <span className="text-[12px] font-bold text-gray-700 tracking-wide">Call Now</span>
            </a>
            
            <div className="w-[2px] h-10 bg-gradient-to-b from-transparent via-gray-200 to-transparent mx-1"></div>
            
            <a href="/video" className="flex-1 flex flex-col items-center gap-1.5 py-3 rounded-[18px] hover:bg-white active:bg-white/80 transition-all group">
              <div className="bg-[#fff0f5] p-2.5 rounded-full text-[#e02c5a] group-hover:scale-110 transition-transform">
                <Video size={20} fill="currentColor" />
              </div>
              <span className="text-[12px] font-bold text-gray-700 tracking-wide">Video Meet</span>
            </a>
          </div>

        </div>
      </div>

      {/* CONTACT PANEL */}
      <div className="hidden md:flex absolute right-6 lg:right-12 top-[45%] -translate-y-1/2 z-40 bg-white/95 backdrop-blur-sm rounded-[35px] py-4 px-3.5 shadow-[0_8px_25px_rgba(0,0,0,0.1)] border border-gray-100 flex-col items-center gap-4">
        <a href="tel:+" className="flex flex-col items-center gap-1.5 hover:scale-105 transition-transform group">
          <div className="w-[50px] h-[50px] rounded-full border-2 border-gray-200 flex items-center justify-center text-[#e02c5a] bg-white shadow-sm group-hover:bg-[#fff0f5] group-hover:border-[#e02c5a]/30 transition-all">
            <Phone size={20} fill="currentColor" />
          </div>
          <span className="text-[11px] text-gray-800 font-bold tracking-wide">Call</span>
        </a>
        <div className="w-6 border-b-2 border-dotted border-gray-300"></div>
        <a href="/video" className="flex flex-col items-center gap-1.5 hover:scale-105 transition-transform group">
          <div className="w-[50px] h-[50px] rounded-full border-2 border-gray-200 flex items-center justify-center text-[#e02c5a] bg-white shadow-sm group-hover:bg-[#fff0f5] group-hover:border-[#e02c5a]/30 transition-all">
            <Video size={22} fill="currentColor" />
          </div>
          <span className="text-[11px] text-gray-800 font-bold tracking-wide">Video</span>
        </a>
      </div>

      {/* BOTTOM WAVE */}
      <div className="hidden md:block absolute bottom-0 left-0 w-full z-30 overflow-hidden leading-none h-[160px]">
        <svg viewBox="0 0 1440 180" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0 180V120C300 160 800 180 1440 40V180H0Z" fill="#821511" />
          <path d="M0 180V90C240 140 720 180 1440 10V180H0Z" fill="#e02c5a" />
          <path d="M0 90C240 140 720 180 1440 10" fill="none" stroke="#fbbf24" strokeWidth="3" />
        </svg>
      </div>
      
    </section>
  );
};

export default Hero;