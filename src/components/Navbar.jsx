import React from "react";
import { User, ChevronDown } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

const Navbar = () => {
  return (
    // 🌟 Yahan bg-rose-50/90 aur backdrop-blur-md add kiya hai premium rose feel ke liye
    <nav className="fixed md:sticky top-0 w-full z-50 bg-rose-50/90 backdrop-blur-md shadow-sm border-b border-rose-100">
      <div className="max-w-7xl mx-auto px-3 md:px-8 py-3 md:py-5 flex items-center justify-between">
        {/* --- LOGO SECTION --- */}
        <RouterLink
          to="/"
          className="relative flex flex-col items-start decoration-transparent"
        >
          {/* PURANA TEXT LOGO (Safe rakha gaya hai comment ke andar taaki koi line delete na ho)
          <span className="text-[#821511] text-[0.55rem] md:text-[0.65rem] font-bold uppercase tracking-widest absolute -top-1.5 md:-top-2 left-0.5 md:left-1">
            L<span className="text-[#eab308]">O</span>CAL
          </span>
          <div className="flex items-baseline">
            <span className="text-[#e02c5a] text-xl md:text-3xl font-extrabold tracking-tight">
              Shaadi
            </span>
            <span className="text-[#821511] text-sm md:text-xl font-bold">
              .in
            </span>
          </div>
          */}

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
            <ChevronDown className="w-3 h-3 md:w-5 md:h-5" strokeWidth={2.5} />
          </RouterLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
