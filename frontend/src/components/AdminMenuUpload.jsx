import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUpload, FiFile, FiArrowLeft } from 'react-icons/fi';
import { DiwaliLamp, RangoliPattern } from "./IndianDecorations";
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

// Memoize decorative components to prevent unnecessary re-renders
const MemoizedDiwaliLamp = React.memo(DiwaliLamp);
const MemoizedRangoliPattern = React.memo(RangoliPattern);
const baseURL = import.meta.env.VITE_API_BASE_URL;

const AdminMenuUpload = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const ADMIN_PASSWORD = 'Kamdhenu@9821'; // 🔐 Set your predefined password here

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      toast.error('Invalid password. Redirecting...');
      setTimeout(() => navigate('/'), 2000);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('menu', file);

    try {
      console.log("req gaya ");
      const response = await axios.post(`${baseURL}/api/menu/upload-menu`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('response aya',response);
      
    } catch (error) {
      toast.error('Failed to upload menu');
      console.error(error);
    } finally {
      setIsUploading(false);
      toast.success("✅ Data is uploaded", {
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
    }
  };

  // Render marigold flowers (consistent with Dashboard)
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
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-50 to-amber-50">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-semibold text-orange-700 mb-4">Admin Access Required</h2>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <input
              type="password"
              placeholder="Enter Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-orange-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              type="submit"
              className="w-full bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition"
            >
              Enter
            </button>
          </form>
        </div>
      </div>
    );
  }

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
        {/* Header with back button */}
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-6 sm:mb-8"
        >
          <button 
            onClick={() => navigate("/")}
            className="bg-white p-2 rounded-full shadow-md hover:bg-orange-50 transition"
          >
            <FiArrowLeft className="text-orange-700" />
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-orange-800 font-serif">Menu Management</h1>
            <p className="text-sm sm:text-base text-orange-600">Update the dining menu from PDF</p>
          </div>
        </motion.div>

        {/* Upload Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white bg-opacity-80 backdrop-blur-sm rounded-xl shadow-lg p-4 sm:p-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-orange-800 mb-4 font-serif">Update Menu</h2>
          
          {/* File Upload Section */}
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="mb-6 border-2 border-dashed border-orange-200 rounded-lg p-6 text-center cursor-pointer"
            onClick={() => document.getElementById('file-upload').click()}
          >
            <input 
              id="file-upload"
              type="file" 
              accept=".pdf" 
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="flex flex-col items-center justify-center">
              <FiFile className="text-4xl text-orange-500 mb-3" />
              <p className="text-orange-700 font-medium mb-1">
                {file ? file.name : 'Click to select PDF file'}
              </p>
              <p className="text-sm text-gray-500">
                {file ? 'File selected' : 'Only PDF files accepted'}
              </p>
            </div>
          </motion.div>

          {/* File Info */}
          {file && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6 bg-orange-50 p-4 rounded-lg"
            >
              <div className="flex items-center">
                <FiFile className="text-orange-600 mr-3" />
                <div>
                  <p className="font-medium text-orange-800">{file.name}</p>
                  <p className="text-xs text-orange-600">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Upload Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleUpload}
            disabled={isUploading || !file}
            className={`w-full py-3 px-4 rounded-full text-white font-semibold shadow-lg transition-all flex items-center justify-center ${
              isUploading || !file 
                ? 'bg-orange-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-orange-600 to-red-600 hover:shadow-xl'
            }`}
          >
            {isUploading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading...
              </>
            ) : (
              <>
                <FiUpload className="mr-2" />
                Update Menu
              </>
            )}
          </motion.button>

          {/* Instructions */}
          <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-100">
            <h3 className="font-medium text-amber-800 mb-2">PDF Format Guidelines</h3>
            <ul className="text-sm text-amber-700 list-disc pl-5 space-y-1">
              <li>Use the standardized template provided</li>
              <li>Ensure clear section headers (=== CATEGORY: NAME ===)</li>
              <li>Each item should be on a new line with format: "1) Item - ₹Price - Description"</li>
              <li>Maximum file size: 5MB</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminMenuUpload;