import React from "react";
import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // Ensure you have jwt-decode installed

const ProtectedRoute = ({ children, allowedRoles }) => {
  const getAuthToken = () => {
    return localStorage.getItem("token"); // Get token from localStorage
  };

  const token = getAuthToken();

  if (!token) {
    return <Navigate to="/login" />; // Redirect to login if no token exists
  }

  try {
    const decodedToken = jwtDecode(token); // Decode the JWT token
    const userRole = decodedToken.role; // Get role from decoded token

    if (!allowedRoles.includes(userRole)) {
      return <div>You do not have permission to access this page</div>; // Show if role is not allowed
    }

    return children; // Render children if user has proper role
  } catch (error) {
    console.error("Invalid token", error);
    return <Navigate to="/login" />; // Redirect if token is invalid
  }
};

export default ProtectedRoute;
