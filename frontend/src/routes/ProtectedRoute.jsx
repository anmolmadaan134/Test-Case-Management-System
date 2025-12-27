import { Navigate } from "react-router-dom";
import { useAuth } from "./Authcontext";

const ProtectedRoute = ({ roles, children }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;
  if (!roles.includes(user.role)) return <Navigate to="/dashboard" />;

  return children;
};

export default ProtectedRoute;
