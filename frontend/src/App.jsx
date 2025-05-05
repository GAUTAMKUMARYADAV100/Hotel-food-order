import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import DashboardPage from "./components/DashboardPage";
import FoodMenuPage from "./components/FoodMenuPage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const isUserLoggedIn = localStorage.getItem("user");

  return (
    <>
      {/* ToastContainer must be outside Routes to work globally */}
      <ToastContainer position="top-center" />

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={isUserLoggedIn ? <DashboardPage /> : <Navigate to="/" />}
        />
        <Route
          path="/FoodMenuPage"
          element={isUserLoggedIn ? <FoodMenuPage /> : <Navigate to="/" />}
        />
        {/* Add more protected routes here */}
      </Routes>
    </>
  );
};

export default App;
