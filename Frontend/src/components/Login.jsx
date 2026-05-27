import React, { useState, useEffect } from "react";
import {
  User,
  Phone,
  Lock,
  ShieldCheck,
  Eye,
  EyeOff,
  Mail,
  KeyRound,
  Heart,
  Sparkles,
  Flower2,
  MapPin,
  ChevronDown,
} from "lucide-react";
import { useNavigate, Link as RouterLink } from "react-router-dom";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [showSuccessHearts, setShowSuccessHearts] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });

  const [bgElements, setBgElements] = useState([]);

  useEffect(() => {
    const elements = [...Array(30)].map((_, i) => {
      const types = ["heart", "flower", "sparkle"];
      const colors = ["#e02c5a", "#fbbf24", "#ec4899", "#f43f5e", "#fbd38d"];
      return {
        id: i,
        type: types[Math.floor(Math.random() * types.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 30 + 20,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 3,
      };
    });
    setBgElements(elements);
  }, []);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const onlyNums = value.replace(/[^0-9]/g, "");
      if (onlyNums.length <= 10) {
        setFormData({ ...formData, [name]: onlyNums });
      }
    } else if (name === "otp") {
      const onlyNums = value.replace(/[^0-9]/g, "");
      if (onlyNums.length <= 6) {
        setFormData({ ...formData, [name]: onlyNums });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
      ? import.meta.env.VITE_API_BASE_URL + "/auth"
      : "http://localhost:5001/api/auth";

    if (isLogin) {
      if (formData.phone.length !== 10) {
        alert("Please enter a valid 10-digit mobile number.");
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phone: formData.phone,
            password: formData.password,
          }),
        });

        const data = await response.json();

        if (data.success) {
          // 🔥 NAYA CODE: Token aur User dono save kiye
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));

          window.dispatchEvent(new Event("authChange"));
          setShowSuccessHearts(true);

          // 🔥 PROFILE SETUP REDIRECT LOGIC
          const isProfileComplete = data.user?.isProfileComplete;

          setTimeout(() => {
            if (isProfileComplete) {
              navigate("/dashboard");
            } else {
              navigate("/profile-setup");
            }
          }, 6000);
        } else {
          alert(data.message || "Invalid phone number or password.");
        }
      } catch (error) {
        console.error("Login Error:", error);
        alert("Server Error. Please ensure Backend is running.");
      }
    } else {
      if (!otpSent) {
        if (formData.phone.length !== 10) {
          alert("Please enter a valid 10-digit mobile number.");
          return;
        }

        try {
          const response = await fetch(`${API_BASE_URL}/send-otp`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phone: formData.phone }),
          });

          const data = await response.json();

          if (data.success) {
            setOtpSent(true);
            alert(
              data.message || `OTP sent successfully to ${formData.phone}!`,
            );
          } else {
            alert(data.message || "Failed to send OTP.");
          }
        } catch (error) {
          console.error("OTP Send Error:", error);
          alert("Server Error. Please check backend.");
        }
      } else if (otpSent && !otpVerified) {
        if (formData.otp.length < 6) {
          alert("Please enter a valid 6-digit OTP.");
          return;
        }

        try {
          const response = await fetch(`${API_BASE_URL}/verify-otp`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              phone: formData.phone,
              otp: formData.otp,
            }),
          });

          const data = await response.json();

          if (data.success) {
            setOtpVerified(true);
            alert("Phone number verified successfully!");
          } else {
            alert(data.message || "Invalid OTP. Please try again.");
          }
        } catch (error) {
          console.error("OTP Verify Error:", error);
          alert("Server Error. Please check backend.");
        }
      } else if (otpVerified) {
        if (formData.password !== formData.confirmPassword) {
          alert("Passwords do not match!");
          return;
        }

        try {
          const response = await fetch(`${API_BASE_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              password: formData.password,
            }),
          });

          const data = await response.json();

          if (data.success) {
            // 🔥 NAYA CODE: Token aur User dono save kiye
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            window.dispatchEvent(new Event("authChange"));
            setShowSuccessHearts(true);

            setTimeout(() => {
              navigate("/profile-setup"); // Naye user ko hamesha profile setup pe bhejna hai
            }, 6000);
          } else {
            alert(data.message || "Registration Failed.");
          }
        } catch (error) {
          console.error("Register Error:", error);
          alert("Server Error. Please check backend.");
        }
      }
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setOtpSent(false);
    setOtpVerified(false);
    setShowSuccessHearts(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      otp: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#fff0f5] via-white to-[#ffe4e6] font-sans overflow-x-hidden relative">
      <style>{`
        @keyframes float-magical {
          0% { transform: translateY(0) scale(0.5) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(-120vh) scale(1.5) rotate(180deg); opacity: 0; }
        }
        .animate-float-magical { animation: float-magical linear forwards; }
        
        @keyframes gentle-bounce {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
        .animate-gentle { animation: gentle-bounce 4s ease-in-out infinite; }
      `}</style>

      {showSuccessHearts && (
        <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
          {[...Array(70)].map((_, i) => {
            const isRose = i % 4 === 0;
            const colors = ["#e02c5a", "#fbcfe8", "#be123c", "#fb7185"];
            const color = colors[i % colors.length];
            const size = Math.random() * 30 + 20;
            const left = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = Math.random() * 2 + 2;

            return (
              <div
                key={i}
                className="absolute animate-float-magical drop-shadow-xl"
                style={{
                  left: `${left}%`,
                  bottom: "-100px",
                  animationDuration: `${duration}s`,
                  animationDelay: `${delay}s`,
                }}
              >
                {isRose ? (
                  <Flower2
                    size={size}
                    color="#dc2626"
                    fill="#dc2626"
                    strokeWidth={1}
                  />
                ) : (
                  <Heart
                    size={size}
                    color={color}
                    fill={color}
                    strokeWidth={1}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[10%] -right-[5%] w-[400px] h-[400px] rounded-full bg-[#e02c5a]/10 blur-[90px]"></div>
        <div className="absolute top-[40%] -left-[10%] w-[500px] h-[500px] rounded-full bg-[#fbbf24]/10 blur-[90px]"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[300px] h-[300px] rounded-full bg-rose-200/20 blur-[60px]"></div>

        {bgElements.map((el) => (
          <div
            key={el.id}
            className="absolute opacity-20 animate-gentle"
            style={{
              left: `${el.left}%`,
              top: `${el.top}%`,
              animationDelay: `${el.delay}s`,
              animationDuration: `${el.duration}s`,
            }}
          >
            {el.type === "heart" && (
              <Heart
                size={el.size}
                fill={el.color}
                color={el.color}
                className="rotate-12"
              />
            )}
            {el.type === "flower" && (
              <Flower2 size={el.size} color={el.color} strokeWidth={1.5} />
            )}
            {el.type === "sparkle" && (
              <Sparkles size={el.size} color={el.color} strokeWidth={1.5} />
            )}
          </div>
        ))}
      </div>

      <nav className="w-full z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-rose-100 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 md:py-4 flex items-center justify-between">
          <RouterLink
            to="/"
            className="relative flex flex-col items-start decoration-transparent"
          >
            <img
              src="https://ik.imagekit.io/dlolttjjd/Shadi_assets/colourlogotext.webp?updatedAt=1779353927500"
              alt="Local Shaadi Logo"
              className="h-10 md:h-12 w-auto object-contain"
            />
          </RouterLink>

          <div className="flex items-center gap-4 md:gap-8">
            <div className="hidden md:flex items-center gap-6 font-medium text-gray-700">
              <a
                href="#about"
                className="hover:text-[#e02c5a] transition-colors cursor-pointer"
              >
                About us
              </a>
              <RouterLink
                to="/help"
                className="hover:text-[#e02c5a] transition-colors"
              >
                Help
              </RouterLink>
            </div>
            <button
              onClick={toggleAuthMode}
              className="text-[#e02c5a] font-bold hover:underline transition-all text-sm md:text-base"
            >
              {isLogin ? "Create an Account" : "Sign In instead"}
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-md w-full bg-white/95 backdrop-blur-md rounded-[40px] shadow-[0_15px_50px_rgba(224,44,90,0.15)] p-8 md:p-10 border-2 border-rose-100 relative transition-all duration-500 hover:shadow-[0_20px_60px_rgba(224,44,90,0.2)]">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#ed2c5b] to-[#c0163e] text-white px-6 py-1.5 rounded-full text-xs font-bold tracking-widest shadow-lg flex items-center gap-2">
            <Sparkles size={14} /> FIND YOUR FOREVER
          </div>

          <div className="text-center mb-8 mt-4">
            <h2 className="text-3xl font-bold text-[#821511] font-serif tracking-wide">
              {isLogin ? "Welcome Back, Love!" : "Begin Your Journey"}
            </h2>
            <p className="text-sm text-gray-500 mt-2 font-medium">
              {isLogin
                ? "Login to connect with your perfect match."
                : otpVerified
                  ? "Set a secure password for your new life."
                  : "Verify your details to find your soulmate."}
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {isLogin && (
              <>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Phone
                      size={18}
                      className="text-[#e02c5a]/60 group-focus-within:text-[#e02c5a] transition-colors"
                    />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    maxLength="10"
                    placeholder="Mobile Number (10 digits)"
                    className="w-full pl-11 pr-4 py-3.5 bg-rose-50/50 border border-rose-100 rounded-2xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#e02c5a]/30 focus:border-[#e02c5a] transition-all focus:bg-white"
                    required
                    disabled={showSuccessHearts}
                  />
                </div>

                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock
                      size={18}
                      className="text-[#e02c5a]/60 group-focus-within:text-[#e02c5a] transition-colors"
                    />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-full pl-11 pr-12 py-3.5 bg-rose-50/50 border border-rose-100 rounded-2xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#e02c5a]/30 focus:border-[#e02c5a] transition-all focus:bg-white"
                    required
                    disabled={showSuccessHearts}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#e02c5a] transition-colors"
                    disabled={showSuccessHearts}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </>
            )}

            {!isLogin && (
              <>
                {!otpVerified && (
                  <>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User
                          size={18}
                          className="text-[#e02c5a]/60 group-focus-within:text-[#e02c5a] transition-colors"
                        />
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={otpSent || showSuccessHearts}
                        placeholder="Full Name"
                        className="w-full pl-11 pr-4 py-3.5 bg-rose-50/50 border border-rose-100 rounded-2xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#e02c5a]/30 focus:border-[#e02c5a] transition-all disabled:opacity-60 focus:bg-white"
                        required
                      />
                    </div>

                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail
                          size={18}
                          className="text-[#e02c5a]/60 group-focus-within:text-[#e02c5a] transition-colors"
                        />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={otpSent || showSuccessHearts}
                        placeholder="Email Address"
                        className="w-full pl-11 pr-4 py-3.5 bg-rose-50/50 border border-rose-100 rounded-2xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#e02c5a]/30 focus:border-[#e02c5a] transition-all disabled:opacity-60 focus:bg-white"
                        required
                      />
                    </div>

                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Phone
                          size={18}
                          className="text-[#e02c5a]/60 group-focus-within:text-[#e02c5a] transition-colors"
                        />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        maxLength="10"
                        disabled={otpSent || showSuccessHearts}
                        placeholder="Mobile Number (10 digits)"
                        className="w-full pl-11 pr-4 py-3.5 bg-rose-50/50 border border-rose-100 rounded-2xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#e02c5a]/30 focus:border-[#e02c5a] transition-all disabled:opacity-60 focus:bg-white"
                        required
                      />
                    </div>
                  </>
                )}

                {otpSent && !otpVerified && (
                  <div className="relative group animate-in fade-in zoom-in duration-300 mt-2">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <KeyRound size={18} className="text-[#e02c5a]" />
                    </div>
                    <input
                      type="text"
                      name="otp"
                      value={formData.otp}
                      onChange={handleChange}
                      maxLength="6"
                      disabled={showSuccessHearts}
                      placeholder="Enter 6-digit OTP (Test: 000000)"
                      className="w-full pl-11 pr-4 py-3.5 bg-white border-2 border-[#e02c5a]/40 rounded-2xl text-sm font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#e02c5a]/60 focus:border-[#e02c5a] transition-all shadow-sm disabled:opacity-60"
                      required
                    />
                  </div>
                )}

                {otpVerified && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center gap-2 mb-2 justify-center bg-green-50/80 text-green-700 py-2.5 rounded-xl text-sm font-semibold border border-green-200">
                      <ShieldCheck size={18} />
                      Number Verified Successfully!
                    </div>

                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock
                          size={18}
                          className="text-[#e02c5a]/60 group-focus-within:text-[#e02c5a] transition-colors"
                        />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Create Password"
                        disabled={showSuccessHearts}
                        className="w-full pl-11 pr-12 py-3.5 bg-rose-50/50 border border-rose-100 rounded-2xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#e02c5a]/30 focus:border-[#e02c5a] transition-all focus:bg-white disabled:opacity-60"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#e02c5a]"
                        disabled={showSuccessHearts}
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>

                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <ShieldCheck
                          size={18}
                          className="text-[#e02c5a]/60 group-focus-within:text-[#e02c5a] transition-colors"
                        />
                      </div>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm Password"
                        disabled={showSuccessHearts}
                        className="w-full pl-11 pr-12 py-3.5 bg-rose-50/50 border border-rose-100 rounded-2xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#e02c5a]/30 focus:border-[#e02c5a] transition-all focus:bg-white disabled:opacity-60"
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#e02c5a]"
                        disabled={showSuccessHearts}
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

            <div className="pt-4 relative z-10">
              <button
                type="submit"
                disabled={showSuccessHearts}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#ed2c5b] to-[#c0163e] text-white py-4 rounded-2xl font-bold text-[17px] tracking-wide shadow-[0_10px_25px_rgba(224,44,90,0.3)] hover:shadow-[0_15px_35px_rgba(224,44,90,0.45)] hover:-translate-y-1 transition-all duration-300 disabled:opacity-90 disabled:cursor-wait disabled:hover:translate-y-0"
              >
                {showSuccessHearts ? (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <Heart size={22} className="animate-pulse" fill="white" />
                      <Heart
                        size={22}
                        className="animate-pulse -ml-2"
                        fill="#ffb3c6"
                        color="white"
                        style={{ animationDelay: "0.3s" }}
                      />
                    </div>
                    <span>Matching your hearts...</span>
                  </div>
                ) : isLogin ? (
                  <>
                    Login to Continue{" "}
                    <Heart size={18} className="animate-pulse" fill="white" />
                  </>
                ) : otpVerified ? (
                  <>
                    Start Your Journey{" "}
                    <Heart size={18} className="animate-pulse" fill="white" />
                  </>
                ) : otpSent ? (
                  "Verify & Proceed"
                ) : (
                  "Find Your Match"
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center pt-4 border-t border-rose-100 relative z-10">
            <div className="flex flex-col gap-1.5 items-center">
              <span className="text-sm text-gray-600 font-medium">
                {isLogin
                  ? "Still searching for your soulmate?"
                  : "Already found your path here?"}
              </span>
              <button
                type="button"
                onClick={toggleAuthMode}
                disabled={showSuccessHearts}
                className="text-[#e02c5a] font-bold hover:text-[#c0163e] hover:underline transition-all disabled:opacity-50 text-[15px]"
              >
                {isLogin
                  ? "Register to find your partner"
                  : "Login to your account"}
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="w-full bg-white/90 backdrop-blur-md border-t border-rose-100 pt-16 pb-8 relative z-10 mt-auto">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12">
            <div className="flex flex-col items-start">
              <RouterLink
                to="/"
                className="relative flex flex-col items-start decoration-transparent mb-5 mt-2"
              >
                <img
                  src="https://ik.imagekit.io/dlolttjjd/Shadi_assets/colourlogotext.webp?updatedAt=1779353927500"
                  alt="Local Shaadi Logo"
                  className="h-10 md:h-12 w-auto object-contain"
                />
              </RouterLink>
              <p className="text-gray-600 text-sm leading-relaxed mb-6 font-medium">
                Trusted by millions. Because every beautiful journey begins with
                the right choice. Find your perfect partner from your own
                community.
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#fff0f5] text-[#e02c5a] flex items-center justify-center hover:bg-[#e02c5a] hover:text-white transition-all"
                >
                  <Heart size={18} />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-[#821511] font-bold text-lg mb-5 font-serif">
                Quick Links
              </h3>
              <ul className="flex flex-col gap-3.5">
                <li>
                  <a
                    href="/about"
                    className="text-gray-600 hover:text-[#e02c5a] text-sm font-medium transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="/search"
                    className="text-gray-600 hover:text-[#e02c5a] text-sm font-medium transition-colors"
                  >
                    Find Matches
                  </a>
                </li>
                <li>
                  <a
                    href="/premium"
                    className="text-gray-600 hover:text-[#e02c5a] text-sm font-medium transition-colors"
                  >
                    Premium Plans
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-[#821511] font-bold text-lg mb-5 font-serif">
                Support
              </h3>
              <ul className="flex flex-col gap-3.5">
                <li>
                  <a
                    href="/help"
                    className="text-gray-600 hover:text-[#e02c5a] text-sm font-medium transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="/privacy"
                    className="text-gray-600 hover:text-[#e02c5a] text-sm font-medium transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/terms"
                    className="text-gray-600 hover:text-[#e02c5a] text-sm font-medium transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-[#821511] font-bold text-lg mb-5 font-serif">
                Contact Us
              </h3>
              <ul className="flex flex-col gap-4">
                <li className="flex items-center gap-3">
                  <MapPin size={16} className="text-[#e02c5a]" />
                  <span className="text-gray-600 text-sm font-medium">
                    Sant Kabir Nagar, UP, India
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={16} className="text-[#e02c5a]" />
                  <a
                    href="tel:+919005520320"
                    className="text-gray-600 hover:text-[#e02c5a] text-sm font-medium"
                  >
                    +91 90055 20320
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={16} className="text-[#e02c5a]" />
                  <a
                    href="mailto:support@localshaadi.in"
                    className="text-gray-600 hover:text-[#e02c5a] text-sm font-medium"
                  >
                    support@localshaadi.in
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-rose-100 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-500 text-sm font-medium">
            <p>
              © {new Date().getFullYear()} Local Shaadi.in. All rights reserved.
            </p>
            <div className="flex items-center gap-1.5">
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
                className="text-[#821511] hover:text-[#e02c5a] font-bold transition-colors"
              >
                codewebx.in
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;
