import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Help from "./pages/Help";
import PersonalProfile from "./pages/PersonalProfile";
import Dashboard from "./pages/Dashboard";
import Matches from "./pages/Matches";
import FinalProfile from "./pages/FinalProfile";
import Notifications from "./pages/Notifications";
import PremiumPlans from "./pages/Premium";

// 🔥 Naya Protected Route Component
// Ye component routes ko guard karega
const ProtectedRoute = ({ children, requireProfileComplete = true }) => {
  // LocalStorage se token aur user data nikalna (Aap apne hisaab se Redux/Context bhi use kar sakte ho)
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // 1. Agar login nahi hai, toh Login page par bhejo
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 2. Agar logged in hai par profile setup nahi ki, toh usko Setup page par bhejo
  if (requireProfileComplete && !user.isProfileComplete) {
    return <Navigate to="/profile-setup" replace />;
  }

  // 3. Agar profile setup pehle hi complete hai, aur wo dubara setup page kholna chahta hai, toh Dashboard par bhejo
  if (!requireProfileComplete && user.isProfileComplete) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#fff0f5] flex flex-col font-sans">
        <main className="flex-grow">
          <Routes>
            {/* 🔥 PUBLIC PAGES */}
            <Route
              path="/"
              element={
                <>
                  <Navbar />
                  <Hero />
                  <About />
                  <Footer />
                </>
              }
            />

            <Route
              path="/help"
              element={
                <>
                  <Navbar />
                  <Help />
                  <Footer />
                </>
              }
            />

            <Route path="/login" element={<Login />} />

            {/* ======================================================== */}
            {/* 🔥 PROFILE SETUP PAGE (Yahan requireProfileComplete false hai taaki incomplete wale yahan aa sakein) */}
            {/* ======================================================== */}
            <Route
              path="/profile-setup"
              element={
                <ProtectedRoute requireProfileComplete={false}>
                  <Navbar />
                  <PersonalProfile />
                </ProtectedRoute>
              }
            />

            {/* ======================================================== */}
            {/* 🔥 POST-LOGIN PROTECTED PAGES (In sabke liye Profile Complete hona zaroori hai) */}
            {/* ======================================================== */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Navbar />
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/matches"
              element={
                <ProtectedRoute>
                  <Navbar />
                  <Matches />
                </ProtectedRoute>
              }
            />

            <Route
              path="/final-profile"
              element={
                <ProtectedRoute>
                  <Navbar />
                  <FinalProfile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Navbar />
                  <Notifications />
                </ProtectedRoute>
              }
            />

            <Route
              path="/premium"
              element={
                <ProtectedRoute>
                  <Navbar />
                  <PremiumPlans />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
