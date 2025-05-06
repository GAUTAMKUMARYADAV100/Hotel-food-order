import React, { useState, useEffect, useContext, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiHome, FiTool, FiBell, FiAlertTriangle, FiDollarSign, FiPlus, FiLogOut, FiUser } from "react-icons/fi";
import { DiwaliLamp, RangoliPattern } from "./IndianDecorations";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Memoize decorative components to prevent unnecessary re-renders
const MemoizedDiwaliLamp = React.memo(DiwaliLamp);
const MemoizedRangoliPattern = React.memo(RangoliPattern);

const baseURL = import.meta.env.VITE_API_BASE_URL;

// Static data moved outside component to prevent recreation on every render
const announcements = [
  {
    id: 1,
    title: "Water Supply Interruption",
    content: "Water will be unavailable from 10 AM to 1 PM due to maintenance.",
    date: "Today",
    icon: "💧"
  },
  {
    id: 2,
    title: "Cultural Event",
    content: "Join us for a cultural celebration on Sunday at 6PM in the main hall.",
    date: "Tomorrow",
    icon: "🎭"
  }
];

const services = [
  { id: 1, name: "Maintenance", icon: <FiTool size={24} />, color: "bg-blue-100 text-blue-800" },
  { id: 2, name: "Laundry", icon: "👕", color: "bg-green-100 text-green-800" },
  { id: 3, name: "Cleaning", icon: "🧹", color: "bg-purple-100 text-purple-800" },
  { id: 4, name: "Room Service", icon: "🛎️", color: "bg-yellow-100 text-yellow-800" }
];

const complaints = [
  { id: 1, title: "AC not cooling", status: "In Progress", date: "2 hours ago" },
  { id: 2, title: "Leaky faucet", status: "Completed", date: "Yesterday" }
];

const bills = [
  { id: 1, month: "October 2023", amount: 8500, status: "Paid" },
  { id: 2, month: "November 2023", amount: 8700, status: "Pending" }
];

const tabs = [
  { id: "home", icon: <FiHome />, label: "Home" },
  { id: "services", icon: <FiTool />, label: "Services" },
  { id: "announcements", icon: <FiBell />, label: "Announcements" },
  { id: "complaints", icon: <FiAlertTriangle />, label: "Complaints" },
  { id: "bills", icon: <FiDollarSign />, label: "Bills" }
];

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [userData, setUserData] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // Memoized fetch function with error handling
  const fetchUserData = useCallback(async () => {
    try {
      if (user?.mobile) {
        const res = await axios.get(`${baseURL}/api/users?mobile=${user.mobile}`);
        if (res.status === 200) {
          setUserData(res.data);
        }
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  }, [user]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  // Memoized function to prevent recreation on every render
  const getInitials = useCallback((name) => {
    if (!name) return "GU";
    return name.split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase();
  }, []);

  // Optimized marigold flowers rendering
  const renderMarigoldFlowers = () => {
    return [...Array(10)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute text-yellow-500 text-xl"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -20, 0],
          rotate: [0, 360],
        }}
        transition={{
          duration: 5 + Math.random() * 10,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        🌼
      </motion.div>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50 relative overflow-hidden">
      {/* Decorative elements */}
      <MemoizedRangoliPattern />
      <div className="absolute top-0 right-0">
        <MemoizedDiwaliLamp />
      </div>

      {/* Floating marigold flowers */}
      {renderMarigoldFlowers()}

      {/* Main content container with responsive padding */}
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 relative z-10">
        {/* Header with responsive layout */}
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-orange-800 font-serif">Kamdhenu Bhawan</h1>
            <p className="text-sm sm:text-base text-orange-600">Traditional Indian Dining & Residence</p>
          </div>
          
          {/* User Profile with Dropdown Menu */}
          <div className="relative self-end sm:self-auto">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white rounded-full shadow-md p-2 sm:p-3 flex items-center space-x-1 sm:space-x-2 cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm sm:text-base">
                {getInitials(userData?.name)}
              </div>
              <div className="hidden sm:block">
                <p className="font-medium text-sm sm:text-base">{userData?.name || "Loading..."}</p>
                <p className="text-xs sm:text-sm text-gray-600">Room No: {userData?.room || "Loading..."}</p>
              </div>
            </motion.div>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="py-1">
                    <div className="px-4 py-2 text-sm text-gray-700 flex items-center">
                      <FiUser className="mr-2" />
                      Profile
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                        navigate("/");
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                    >
                      <FiLogOut className="mr-2" />
                      Logout
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Order Food Button with responsive sizing */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mb-6 sm:mb-8 text-center"
        >
          <button 
            onClick={() => navigate('/FoodMenuPage')} // Changed to navigate to FoodMenuPage
            className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 sm:py-4 px-6 sm:px-8 rounded-full text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all flex items-center mx-auto"
          >
            <span className="mr-2">🍛</span> Order Traditional Meal
            <span className="ml-2">🍛</span>
          </button>
        </motion.div>

        {/* Navigation Tabs with horizontal scrolling for mobile */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex border-b border-orange-200 mb-4 sm:mb-6 overflow-x-auto pb-1 scrollbar-hide"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 sm:px-4 py-2 sm:py-3 font-medium flex items-center space-x-1 sm:space-x-2 capitalize whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'text-orange-700 border-b-2 border-orange-700' 
                  : 'text-gray-500 hover:text-orange-600'
              }`}
            >
              <span className="text-sm sm:text-base">{tab.icon}</span>
              <span className="text-sm sm:text-base">{tab.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Tab Content with responsive padding */}
        <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-xl shadow-lg p-4 sm:p-6 min-h-[300px] sm:min-h-[400px]">
          {/* Home Tab */}
          {activeTab === "home" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-lg sm:text-xl font-bold text-orange-800 mb-4 sm:mb-6 font-serif">Quick Actions</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
                {services.map(service => (
                  <motion.div
                    key={service.id}
                    whileHover={{ y: -5, scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className={`${service.color} p-3 sm:p-4 rounded-xl shadow-md text-center cursor-pointer transition`}
                  >
                    <div className="text-xl sm:text-2xl mb-1 sm:mb-2">{service.icon}</div>
                    <p className="text-sm sm:text-base font-medium">{service.name}</p>
                  </motion.div>
                ))}
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-orange-800 mb-4 sm:mb-6 font-serif">Recent Announcements</h3>
              <div className="space-y-3 sm:space-y-4">
                {announcements.map(announcement => (
                  <motion.div 
                    key={announcement.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white p-3 sm:p-4 rounded-lg border border-orange-100 shadow-sm hover:shadow-md transition"
                  >
                    <div className="flex items-start">
                      <div className="text-xl sm:text-2xl mr-2 sm:mr-3">{announcement.icon}</div>
                      <div>
                        <h4 className="font-semibold text-sm sm:text-base text-orange-700">{announcement.title}</h4>
                        <p className="text-xs sm:text-sm text-gray-600">{announcement.content}</p>
                        <p className="text-xs text-gray-500 mt-1">{announcement.date}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Services Tab */}
          {activeTab === "services" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
                <h3 className="text-lg sm:text-xl font-bold text-orange-800 font-serif">Request Services</h3>
                <button className="bg-orange-600 text-white py-1 sm:py-2 px-3 sm:px-4 rounded-md hover:bg-orange-700 transition flex items-center text-sm sm:text-base">
                  <FiPlus className="mr-1" /> New Request
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {services.map(service => (
                  <motion.div
                    key={service.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white border border-orange-200 rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition cursor-pointer text-center"
                  >
                    <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{service.icon}</div>
                    <h4 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">{service.name}</h4>
                    <button className="mt-1 sm:mt-2 bg-orange-100 text-orange-700 py-1 px-3 sm:px-4 rounded-full text-xs sm:text-sm hover:bg-orange-200 transition">
                      Request Service
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Other tabs would go here with similar responsive structure */}
        </div>
      </div>
    </div>
  );
};

export default React.memo(DashboardPage);