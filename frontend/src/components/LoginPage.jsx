import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css";
import IndianMale from "../assets/Indian-male.png";
import IndianFemale from "../assets/Indian-female.png";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const LoginPage = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [room, setRoom] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Validate fields
    if (!name || !mobile || !room) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    const userData = { name, mobile, room };

    try {
      const res = await axios.post(`${baseURL}/api/users/login`, userData);

      function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      
      if (res.status === 200) {
        login(userData);
        
        // Show toast immediately before navigation
        toast.success("✅ Login Successful! Welcome back 🙌", {
          position: "top-center",
          style: {
            backgroundColor: "#fff8dc",
            color: "#006400",
            fontWeight: "bold",
            fontFamily: "serif",
            borderRadius: "10px",
            fontSize: "1.1rem",
          },
          icon: "🔐",
          duration: 3000,
        });
      
        navigate("/dashboard");
      }
      
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Login failed. Please try again.", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <button
          onClick={() => navigate('/Kamdhenuadmin')}
          className="absolute top-4 right-4 bg-red-700 text-white text-xs px-2 py-1 rounded hover:bg-red-800 transition-all"
          style={{ height: '18px', fontSize: '10px', lineHeight: '10px' }}
        >
          Admin
        </button>
        {/* Floating Words */}
        <span className="floating-text left-4 top-10">नमस्ते</span>
        <span className="floating-text right-4 top-24">एकता</span>
        <span className="floating-text left-1/4 top-1/2">विविधता</span>
        <span className="floating-text right-1/4 bottom-16">संस्कृति</span>
        <span className="floating-text left-1/2 top-1/3">भारत</span>


        {/* Avatars */}
        <img src={IndianMale} alt="Indian Male" className="avatar avatar-left" />
        <img src={IndianFemale} alt="Indian Female" className="avatar avatar-right" />

        {/* Login Form */}
        <div className="login-form">
          <h2 className="text-xl sm:text-2xl font-bold text-red-800 mb-6">
            Welcome to Kamdhenu Bhawan
          </h2>

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
          />

          <input
            type="tel"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="input-field"
          />

          <input
            type="text"
            placeholder="Room Number"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className="input-field"
          />

          <button
            onClick={handleLogin}
            className="login-button"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
