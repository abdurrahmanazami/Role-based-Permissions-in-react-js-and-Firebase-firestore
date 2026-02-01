import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ allowedRole, children }) {
  const { user, role, loading } = useAuth();

  // ⏳ Wait for Firebase + claims
  if (loading) return null;

  // 🔒 Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 🚫 Logged in but wrong role
  if (role !== allowedRole) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Authorized
  return children;
}

