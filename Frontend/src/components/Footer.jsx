import React from "react";
import { Heart, Mail, Phone, MapPin } from "lucide-react"; // Brand icons removed from here

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8 mt-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12">
          {/* Column 1: Brand & Description */}
          <div className="flex flex-col items-start">
            <a
              href="/"
              className="relative flex flex-col items-start decoration-transparent mb-5 mt-2"
            >
              {/* PURANA TEXT LOGO (Safe rakha gaya hai comment ke andar taaki koi line delete na ho)
              <span className="text-[#821511] text-[0.65rem] font-bold uppercase tracking-widest absolute -top-2 left-1">
                L<span className="text-[#eab308]">O</span>CAL
              </span>
              <div className="flex items-baseline">
                <span className="text-[#e02c5a] text-3xl font-extrabold tracking-tight">Shaadi</span>
                <span className="text-[#821511] text-xl font-bold">.in</span>
              </div>
              */}

              {/* NAYA IMAGE LOGO */}
              <img
                src="https://ik.imagekit.io/dlolttjjd/Shadi_assets/colourlogotext.webp?updatedAt=1779353927500"
                alt="Local Shaadi Logo"
                className="h-10 md:h-12 w-auto object-contain"
              />
            </a>
            <p className="text-gray-600 text-sm leading-relaxed mb-6 font-medium">
              Trusted by millions. Because every beautiful journey begins with
              the right choice. Find your perfect partner from your own
              community and culture.
            </p>

            {/* Social Media Icons (Using inline SVGs to avoid Lucide brand icon errors) */}
            <div className="flex items-center gap-3">
              {/* Facebook SVG */}
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#fff0f5] text-[#e02c5a] flex items-center justify-center hover:bg-[#e02c5a] hover:text-white hover:-translate-y-1 transition-all duration-300"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              {/* Instagram SVG */}
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#fff0f5] text-[#e02c5a] flex items-center justify-center hover:bg-[#e02c5a] hover:text-white hover:-translate-y-1 transition-all duration-300"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              {/* Twitter SVG */}
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#fff0f5] text-[#e02c5a] flex items-center justify-center hover:bg-[#e02c5a] hover:text-white hover:-translate-y-1 transition-all duration-300"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-[#821511] font-bold text-lg mb-5 font-serif">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-3.5">
              <li>
                <a
                  href="/about"
                  className="text-gray-600 hover:text-[#e02c5a] text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <span className="text-[#e02c5a]/50 text-xs">▸</span> About Us
                </a>
              </li>
              <li>
                <a
                  href="/search"
                  className="text-gray-600 hover:text-[#e02c5a] text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <span className="text-[#e02c5a]/50 text-xs">▸</span> Find
                  Matches
                </a>
              </li>
              <li>
                <a
                  href="/plans"
                  className="text-gray-600 hover:text-[#e02c5a] text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <span className="text-[#e02c5a]/50 text-xs">▸</span> Premium
                  Plans
                </a>
              </li>
              <li>
                <a
                  href="/stories"
                  className="text-gray-600 hover:text-[#e02c5a] text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <span className="text-[#e02c5a]/50 text-xs">▸</span> Success
                  Stories
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h3 className="text-[#821511] font-bold text-lg mb-5 font-serif">
              Support
            </h3>
            <ul className="flex flex-col gap-3.5">
              <li>
                <a
                  href="/help"
                  className="text-gray-600 hover:text-[#e02c5a] text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <span className="text-[#e02c5a]/50 text-xs">▸</span> Help
                  Center
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-600 hover:text-[#e02c5a] text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <span className="text-[#e02c5a]/50 text-xs">▸</span> Contact
                  Us
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-gray-600 hover:text-[#e02c5a] text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <span className="text-[#e02c5a]/50 text-xs">▸</span> Privacy
                  Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="text-gray-600 hover:text-[#e02c5a] text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <span className="text-[#e02c5a]/50 text-xs">▸</span> Terms of
                  Service
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-[#821511] font-bold text-lg mb-5 font-serif">
              Contact Us
            </h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3 group">
                <div className="bg-[#fff0f5] p-2 rounded-lg group-hover:bg-[#e02c5a] transition-colors duration-300 shrink-0">
                  <MapPin
                    size={16}
                    className="text-[#e02c5a] group-hover:text-white transition-colors duration-300"
                  />
                </div>
                <span className="text-gray-600 text-sm font-medium mt-1 leading-snug">
                  Sant Kabir Nagar, Uttar Pradesh, India
                </span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="bg-[#fff0f5] p-2 rounded-lg group-hover:bg-[#e02c5a] transition-colors duration-300 shrink-0">
                  <Phone
                    size={16}
                    className="text-[#e02c5a] group-hover:text-white transition-colors duration-300"
                  />
                </div>
                <a
                  href="tel:+919876543210"
                  className="text-gray-600 hover:text-[#e02c5a] text-sm font-medium transition-colors"
                >
                  +91 9005520320
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="bg-[#fff0f5] p-2 rounded-lg group-hover:bg-[#e02c5a] transition-colors duration-300 shrink-0">
                  <Mail
                    size={16}
                    className="text-[#e02c5a] group-hover:text-white transition-colors duration-300"
                  />
                </div>
                <a
                  href="mailto:support@localshaadi.in"
                  className="text-gray-600 hover:text-[#e02c5a] text-sm font-medium transition-colors"
                >
                  support@localshaadi.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Credits */}
        <div className="pt-6 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm font-medium text-center md:text-left">
            © {new Date().getFullYear()} Local Shaadi.in. All rights reserved.
          </p>

          <div className="text-gray-500 text-sm font-medium flex items-center gap-1.5">
            Designed with{" "}
            <Heart
              size={14}
              className="text-[#e02c5a] fill-[#e02c5a] animate-pulse"
            />{" "}
            by
            <a
              href="https://codewebx.in"
              target="_blank"
              rel="noreferrer"
              className="text-[#821511] hover:text-[#e02c5a] font-bold tracking-wide transition-colors"
            >
              codewebx.in
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
