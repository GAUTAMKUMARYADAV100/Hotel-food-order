import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import DashboardPage from "./components/DashboardPage";
import FoodMenuPage from "./components/FoodMenuPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "./context/AuthContext"; // 👈 Import context

const App = () => {
  const { user } = useContext(AuthContext); // 👈 Use context value

  return (
    <>
      <ToastContainer position="top-center" />

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={user ? <DashboardPage /> : <Navigate to="/" />}
        />
        <Route
          path="/FoodMenuPage"
          element={user ? <FoodMenuPage /> : <Navigate to="/" />}
        />
      </Routes>
    </>
  );
};

export default App;
