
//frontend/offk/src/components/ProtectedAdminRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedAdminRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  // 🔐 If not logged in or not admin → redirect
  if (!user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  // ✅ Otherwise, show the protected page
  return children;
}

