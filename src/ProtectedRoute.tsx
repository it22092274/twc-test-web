// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useUserStore } from "./store/useUserStore"; // Adjust the import according to your folder structure

const ProtectedRoute = ({ element }) => {
  const { user } = useUserStore(); // Access user from Zustand store

  // If user is not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  return element; // Return the requested element if user is logged in
};

export default ProtectedRoute;
