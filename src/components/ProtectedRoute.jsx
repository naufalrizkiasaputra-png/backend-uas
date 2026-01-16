import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { token, user } = useAuth();

  if (!token) return <Navigate to="/login" />;
  if (user?.role !== "jobseeker") return <Navigate to="/jobs" />;

  return children;
};

export default ProtectedRoute;
