import React from "react";
import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  const token = JSON.parse(localStorage.getItem("pingApp"));
  if (!token) return <Navigate to="/login" />;
  return children;
};

export default ProtectedRoute;
