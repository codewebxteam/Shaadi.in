import React, { useState } from "react";
import {
  Phone,
  Mail,
  MessageCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Send,
  Heart,
  Sparkles,
  Flower2,
} from "lucide-react";

const Help = () => {
  // FAQ toggle state
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      question: "How do I create a new account?",
      answer:
        "Click on the 'Login' button at the top right, then select 'Create Account'. Fill in your basic details like Name, Mobile Number, and Password to get started.",
    },
    {
      question: "Is my personal information and photos safe?",
      answer:
        "Absolutely! We use advanced encryption to protect your data. Your photos and contact details are only visible to verified premium members you accept.",
    },
    {
      question: "How do I edit my profile details?",
      answer:
        "Once logged in, go to your Dashboard and click on 'Edit Profile'. You can update your bio, location, education, and partner preferences there.",
    },
    {
      question: "Are there any charges for registering?",
      answer:
        "Registration and creating a profile on Local Shaadi is completely free. We also offer Premium plans if you want to directly call or message other matches.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff0f5] via-white to-[#ffe4e6] pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
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

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full bg-[#e02c5a]/10 blur-[90px]"></div>
        <div className="absolute bottom-[20%] right-[5%] w-[500px] h-[500px] rounded-full bg-[#fbbf24]/10 blur-[90px]"></div>
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-rose-200/20 blur-[80px]"></div>

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

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles size={20} className="text-[#fbbf24]" />
            <span className="text-[#e02c5a] font-bold tracking-widest text-sm uppercase">
              Support Center
            </span>
            <Sparkles size={20} className="text-[#fbbf24]" />
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#821511] mb-4">
            How can we help you?
          </h1>
          <p className="text-gray-600 font-medium max-w-2xl mx-auto text-lg">
            Whether you have a question about our features, finding your match,
            or need technical support, our team is always here for you.
          </p>
        </div>

        {/* Quick Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16">
          {/* Card 1 */}
          <div className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-[0_10px_40px_rgba(224,44,90,0.08)] border border-rose-100 flex flex-col items-center text-center hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(224,44,90,0.15)] transition-all duration-300 group">
            <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center text-[#e02c5a] mb-5 group-hover:bg-[#e02c5a] group-hover:text-white transition-colors duration-300 shadow-sm border border-rose-100">
              <Phone size={28} />
            </div>
            <h3 className="font-bold text-[#821511] text-xl mb-1 font-serif">
              Call Us
            </h3>
            <p className="text-gray-500 text-sm mb-4 font-medium">
              Mon-Sat from 10am to 6pm
            </p>
            {/* 🔥 Updated Call Number */}
            <a
              href="tel:+919005520320"
              className="text-[#e02c5a] font-bold text-lg hover:text-[#c0163e] hover:underline transition-colors"
            >
              +91 90055 20320
            </a>
          </div>

          {/* Card 2 */}
          <div className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-[0_10px_40px_rgba(224,44,90,0.08)] border border-rose-100 flex flex-col items-center text-center hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(224,44,90,0.15)] transition-all duration-300 group">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 mb-5 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300 shadow-sm border border-blue-100">
              <Mail size={28} />
            </div>
            <h3 className="font-bold text-[#821511] text-xl mb-1 font-serif">
              Email Us
            </h3>
            <p className="text-gray-500 text-sm mb-4 font-medium">
              We'll respond within 24 hours
            </p>
            <a
              href="mailto:support@localshaadi.in"
              className="text-[#e02c5a] font-bold text-lg hover:text-[#c0163e] hover:underline transition-colors"
            >
              support@localshaadi.in
            </a>
          </div>

          {/* Card 3 */}
          <div className="bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-[0_10px_40px_rgba(224,44,90,0.08)] border border-rose-100 flex flex-col items-center text-center hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(224,44,90,0.15)] transition-all duration-300 group">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-5 group-hover:bg-green-500 group-hover:text-white transition-colors duration-300 shadow-sm border border-green-100">
              <MessageCircle size={28} />
            </div>
            <h3 className="font-bold text-[#821511] text-xl mb-1 font-serif">
              WhatsApp
            </h3>
            <p className="text-gray-500 text-sm mb-4 font-medium">
              Instant chat support
            </p>
            {/* 🔥 Updated WhatsApp Link */}
            <a
              href="https://wa.me/919005520320"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#e02c5a] font-bold text-lg hover:text-[#c0163e] hover:underline transition-colors"
            >
              Start Chat
            </a>
          </div>
        </div>

        {/* Main Content Split: FAQs and Contact Form */}
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* LEFT: FAQ Accordion */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl font-serif font-bold text-[#821511] mb-6 flex items-center gap-2">
              Frequently Asked Questions{" "}
              <HelpCircle size={24} className="text-[#e02c5a]" />
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`bg-white/90 backdrop-blur-sm rounded-2xl border transition-all duration-300 overflow-hidden ${openFaq === index ? "border-[#e02c5a]/40 shadow-md ring-1 ring-[#e02c5a]/10" : "border-rose-100 shadow-sm hover:border-[#e02c5a]/30 hover:shadow-md"}`}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                  >
                    <span
                      className={`text-[15px] sm:text-base font-bold ${openFaq === index ? "text-[#e02c5a]" : "text-gray-800"}`}
                    >
                      {faq.question}
                    </span>
                    <div
                      className={`p-1 rounded-full transition-colors ${openFaq === index ? "bg-rose-50" : "bg-transparent"}`}
                    >
                      {openFaq === index ? (
                        <ChevronUp size={20} className="text-[#e02c5a]" />
                      ) : (
                        <ChevronDown size={20} className="text-gray-400" />
                      )}
                    </div>
                  </button>
                  <div
                    className={`px-6 text-sm sm:text-[15px] text-gray-600 font-medium leading-relaxed transition-all duration-300 ${openFaq === index ? "pb-5 max-h-40 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}
                  >
                    {faq.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Contact Form */}
          <div className="w-full lg:w-1/2 bg-white/95 backdrop-blur-md rounded-[36px] shadow-[0_15px_50px_rgba(224,44,90,0.12)] p-8 md:p-10 border-2 border-rose-100 relative">
            <div className="absolute -top-4 -right-4 bg-white p-2 rounded-full shadow-md text-[#e02c5a]">
              <Heart size={24} className="animate-pulse" fill="currentColor" />
            </div>

            <h2 className="text-3xl font-serif font-bold text-[#821511] mb-2">
              Send us a Message
            </h2>
            <p className="text-gray-500 text-[15px] mb-8 font-medium">
              Fill out the form below and we'll get back to you with love and
              care.
            </p>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <input
                  type="text"
                  placeholder="Your Beautiful Name"
                  className="w-full px-5 py-4 bg-rose-50/50 border border-rose-100 rounded-2xl text-[15px] font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#e02c5a]/30 focus:border-[#e02c5a] focus:bg-white transition-all shadow-sm"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email Address"
                  className="w-full px-5 py-4 bg-rose-50/50 border border-rose-100 rounded-2xl text-[15px] font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#e02c5a]/30 focus:border-[#e02c5a] focus:bg-white transition-all shadow-sm"
                  required
                />
              </div>
              <div>
                <textarea
                  placeholder="How can we help you find your match?"
                  rows="5"
                  className="w-full px-5 py-4 bg-rose-50/50 border border-rose-100 rounded-2xl text-[15px] font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#e02c5a]/30 focus:border-[#e02c5a] focus:bg-white transition-all resize-none shadow-sm"
                  required
                ></textarea>
              </div>
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#ed2c5b] to-[#c0163e] text-white py-4 rounded-2xl font-bold text-[17px] tracking-wide shadow-[0_10px_25px_rgba(224,44,90,0.3)] hover:shadow-[0_15px_35px_rgba(224,44,90,0.45)] hover:-translate-y-1 transition-all duration-300"
                >
                  <Send size={20} />
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
