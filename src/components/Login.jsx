import React, { useState } from "react";
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
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // 🔥 Default 1st screen ab Login ki hogi (true set kiya hai)
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 🔥 Registration Steps State
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  // 🔥 Success Animation & Loading State
  const [showSuccessHearts, setShowSuccessHearts] = useState(false);

  // 🔥 Form Data State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const onlyNums = value.replace(/[^0-9]/g, ""); // Sirf 0-9 allowed
      if (onlyNums.length <= 10) {
        setFormData({ ...formData, [name]: onlyNums });
      }
    } else if (name === "otp") {
      // 🔥 OTP ke liye strictly 4 digits aur sirf numbers allow kiye
      const onlyNums = value.replace(/[^0-9]/g, "");
      if (onlyNums.length <= 4) {
        setFormData({ ...formData, [name]: onlyNums });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      // LOGIC: Jab user Login kar raha ho
      if (formData.phone.length !== 10) {
        alert("Please enter a valid 10-digit mobile number.");
        return;
      }
      console.log("Logging in with: ", formData.phone, formData.password);

      // 🔥 Trigger Heart & Rose Explosion Animation then navigate after 6 seconds (Double time)
      setShowSuccessHearts(true);
      setTimeout(() => {
        navigate("/profile-setup");
      }, 6000); // 6 Second Loading Time
    } else {
      // LOGIC: Jab user Register kar raha ho (Step-by-step)

      if (!otpSent) {
        // Step 1: Send OTP
        if (formData.phone.length !== 10) {
          alert("Please enter a valid 10-digit mobile number.");
          return;
        }
        console.log("Sending OTP to", formData.phone);
        setOtpSent(true);
        alert(
          `OTP sent successfully to ${formData.phone}! (Use 1234 for testing)`,
        );
      } else if (otpSent && !otpVerified) {
        // Step 2: Verify OTP
        if (formData.otp.length !== 4) {
          alert("Please enter a 4-digit OTP.");
          return;
        }
        if (formData.otp === "1234") {
          // Dummy check
          setOtpVerified(true);
          alert("Phone number verified successfully!");
        } else {
          alert("Invalid OTP. Please try again. (Enter 1234)");
        }
      } else if (otpVerified) {
        // Step 3: Final Submit (Create Account)
        if (formData.password !== formData.confirmPassword) {
          alert("Passwords do not match!");
          return;
        }
        console.log("Account Created: ", formData);

        // 🔥 Trigger Heart & Rose Explosion Animation then navigate after 6 seconds (Double time)
        setShowSuccessHearts(true);
        setTimeout(() => {
          navigate("/profile-setup");
        }, 6000); // 6 Second Loading Time
      }
    }
  };

  // Jab user tab switch kare (Login -> Signup) toh OTP state reset kar do
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
    <>
      {/* Inline CSS for Magical Continuous Heart & Rose Bubbles */}
      <style>{`
        @keyframes float-magical {
          0% { transform: translateY(0) scale(0.5) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(-120vh) scale(1.5) rotate(180deg); opacity: 0; }
        }
        .animate-float-magical {
          animation: float-magical linear forwards;
        }
        @keyframes gentle-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-gentle {
          animation: gentle-bounce 4s ease-in-out infinite;
        }
      `}</style>

      {/* CONTINUOUS SUCCESS MAGICAL EXPLOSION (Hearts + Red Roses) */}
      {showSuccessHearts && (
        <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
          {[...Array(70)].map((_, i) => {
            // Mix of Dark Pink, Light Pink, and Deep Red Roses
            const isRose = i % 4 === 0; // Har 4th item ek Rose (Phool) hoga
            const colors = ["#e02c5a", "#fbcfe8", "#be123c", "#fb7185"]; // Dark Pink, Light Pink, Deep Red, Soft Red
            const color = colors[i % colors.length];
            const size = Math.random() * 30 + 20; // 20px se 50px tak random size
            const left = Math.random() * 100; // Poori screen ki width par random
            const delay = Math.random() * 5; // 0 se 5s ke beech lagaatar niklenge (kyunki ab 6s tak chalega)
            const duration = Math.random() * 2 + 2; // 2 se 4s lagayenge upar jaane me

            return (
              <div
                key={i}
                className="absolute animate-float-magical drop-shadow-xl"
                style={{
                  left: `${left}%`,
                  bottom: "-100px", // Screen ke theek niche se start hoga taaki ruke hue na dikhein
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
                  /> // Beautiful Red Rose
                ) : (
                  <Heart
                    size={size}
                    color={color}
                    fill={color}
                    strokeWidth={1}
                  /> // Magical Hearts
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#fff0f5] via-white to-[#ffe4e6] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* MAGICAL ROMANTIC BACKGROUND */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] rounded-full bg-[#e02c5a]/10 blur-[90px]"></div>
          <div className="absolute -bottom-[20%] -left-[10%] w-[500px] h-[500px] rounded-full bg-[#fbbf24]/10 blur-[90px]"></div>
          <div className="absolute top-[30%] left-[5%] w-[300px] h-[300px] rounded-full bg-rose-200/20 blur-[60px]"></div>

          {/* Floating Vibe Icons */}
          <div
            className="absolute top-[15%] left-[10%] opacity-20 animate-gentle"
            style={{ animationDelay: "0s" }}
          >
            <Heart
              size={60}
              fill="#e02c5a"
              color="#e02c5a"
              className="-rotate-12"
            />
          </div>
          <div
            className="absolute bottom-[20%] right-[10%] opacity-20 animate-gentle"
            style={{ animationDelay: "1s" }}
          >
            <Heart
              size={80}
              fill="#fbbf24"
              color="#fbbf24"
              className="rotate-12"
            />
          </div>
          <div className="absolute top-[40%] right-[15%] opacity-15 animate-pulse">
            <Flower2 size={50} color="#e02c5a" strokeWidth={1.5} />
          </div>
          <div
            className="absolute bottom-[30%] left-[15%] opacity-30 animate-gentle"
            style={{ animationDelay: "2s" }}
          >
            <Sparkles size={40} color="#fbbf24" strokeWidth={1.5} />
          </div>
        </div>

        <div className="max-w-md w-full bg-white/90 backdrop-blur-md rounded-[40px] shadow-[0_15px_50px_rgba(224,44,90,0.15)] p-8 md:p-10 border-2 border-[#e02c5a]/20 relative z-10 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(224,44,90,0.2)]">
          {/* Magical Header Tag */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#ed2c5b] to-[#c0163e] text-white px-6 py-1.5 rounded-full text-xs font-bold tracking-widest shadow-lg flex items-center gap-2">
            <Sparkles size={14} /> FIND YOUR FOREVER
          </div>

          <div className="flex justify-center mb-8 mt-4">
            {/* PURANA TEXT LOGO (Safe rakha gaya hai comment ke andar)
            <div className="relative flex flex-col items-center">
              <span className="text-[#821511] text-[0.65rem] font-bold uppercase tracking-widest absolute -top-2 -left-1">
                L<span className="text-[#eab308]">O</span>CAL
              </span>
              <div className="flex items-baseline">
                <span className="text-[#e02c5a] text-4xl font-extrabold tracking-tight drop-shadow-sm">Shaadi</span>
                <span className="text-[#821511] text-2xl font-bold">.in</span>
              </div>
            </div>
            */}

            {/* NAYA IMAGE LOGO */}
            <img
              src="https://ik.imagekit.io/dlolttjjd/Shadi_assets/colourlogotext.webp?updatedAt=1779353927500"
              alt="Local Shaadi Logo"
              className="h-12 w-auto object-contain"
            />
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 font-serif tracking-wide">
              {isLogin ? "Welcome Back, Love!" : "Begin Your Beautiful Journey"}
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
            {/* ================= LOGIN FORM ================= */}
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

            {/* ================= REGISTRATION FORM (STEP-BY-STEP) ================= */}
            {!isLogin && (
              <>
                {/* STEP 1: Name, Email, Phone (Hides when OTP is verified) */}
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

                {/* STEP 2: OTP Input (Appears after Send OTP) */}
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
                      maxLength="4"
                      disabled={showSuccessHearts}
                      placeholder="Enter 4-digit OTP (Test: 1234)"
                      className="w-full pl-11 pr-4 py-3.5 bg-white border-2 border-[#e02c5a]/40 rounded-2xl text-sm font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#e02c5a]/60 focus:border-[#e02c5a] transition-all shadow-[0_0_20px_rgba(224,44,90,0.15)] disabled:opacity-60"
                      required
                    />
                  </div>
                )}

                {/* STEP 3: Passwords (Appears after OTP is verified) */}
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

            {/* DYNAMIC SUBMIT BUTTON WITH MAGICAL LOADING STATE */}
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

          {/* DYNAMIC TEXT FOR REGISTRATION/LOGIN TOGGLE */}
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
      </div>
    </>
  );
};

export default Login;
