import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#fff0f5] flex flex-col font-sans">
        <main className="flex-grow">
          <Routes>
            {/* 🔥 HOME PAGE (Yahan Navbar aur Footer dono rahenge) */}
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

            {/* 🔥 HELP PAGE (Navbar + Footer) */}
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

            {/* 🔥 LOGIN PAGE (Bina Navbar aur Footer ke) */}
            <Route path="/login" element={<Login />} />

            {/* 🔥 PROFILE SETUP PAGE (Sirf Navbar rahega, NO FOOTER) */}
            <Route
              path="/profile-setup"
              element={
                <>
                  <Navbar />
                  <PersonalProfile />
                </>
              }
            />

            {/* ======================================================== */}
            {/* 🔥 POST-LOGIN PAGES (Sirf Navbar rahega, NO FOOTER) */}
            {/* ======================================================== */}
            <Route
              path="/dashboard"
              element={
                <>
                  <Navbar />
                  <Dashboard />
                </>
              }
            />

            <Route
              path="/matches"
              element={
                <>
                  <Navbar />
                  <Matches />
                </>
              }
            />

            <Route
              path="/final-profile"
              element={
                <>
                  <Navbar />
                  <FinalProfile />
                </>
              }
            />

            <Route
              path="/notifications"
              element={
                <>
                  <Navbar />
                  <Notifications />
                </>
              }
            />

            <Route
              path="/premium"
              element={
                <>
                  <Navbar />
                  <PremiumPlans />
                </>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
