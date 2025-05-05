import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css";
import IndianMale from "../assets/Indian-male.png";
import IndianFemale from "../assets/Indian-female.png";
import { AuthContext } from "../context/AuthContext";
import { toast } from 'react-toastify';

const LoginPage = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [room, setRoom] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!name || !mobile || !room) {
      alert("Please fill all fields");
      return;
    }

    const userData = { name, mobile, room };

    try {
      const res = await axios.post("http://localhost:5000/api/users/login", userData);

      if (res.status === 200) {
        login(userData); // Save to context and localStorage
        toast.success("✅ Login Successful! Welcome back 🙌", {
          position: "top-center",
          style: {
            backgroundColor: "#fff8dc", // Light cream background
            color: "#006400",           // Dark green text
            fontWeight: "bold",
            fontFamily: "serif",
            borderRadius: "10px",
            fontSize: "1.1rem"
          },
          icon: "🔐"
        });
        
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      alert("Login failed. Try again.");
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gradient-to-b from-yellow-100 to-white flex items-center justify-center">
      <div className="relative w-full max-w-[1920px] h-full max-h-[1080px] aspect-[16/9]">

        {/* Floating background words */}
        <span className="floating-text left-10 top-20">Namaste</span>
        <span className="floating-text right-10 top-40">Unity</span>
        <span className="floating-text left-1/4 top-1/2">Diversity</span>
        <span className="floating-text right-1/3 top-3/4">Culture</span>
        <span className="floating-text left-1/2 top-1/3">India</span>

        {/* Curtains */}
        <div className="curtain curtain-left bg-red-800"></div>
        <div className="curtain curtain-right bg-red-800"></div>

        {/* Avatars */}
        <img src={IndianMale} alt="Indian Male" className="avatar avatar-left" />
        <img src={IndianFemale} alt="Indian Female" className="avatar avatar-right" />

        {/* Login Form */}
        <div className="z-10 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-2xl rounded-2xl p-6 w-[clamp(250px,30vw,400px)] animate-fade-in text-center">
          <h2 className="text-xl md:text-2xl font-bold text-red-800 mb-6">
            Welcome to Kamdhenu Bhawan
          </h2>

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <input
            type="tel"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <input
            type="text"
            placeholder="Room Number"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className="w-full mb-6 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-red-700 text-white py-2 rounded-md hover:bg-red-800 transition"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
