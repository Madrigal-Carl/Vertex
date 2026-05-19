import { Navigate } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";
import { ROLES } from "@/constants/roles";
import { getRoleRedirect } from "@/utils/getRoleRedirect";

export default function FallbackRedirect() {
  const { isAuthenticated, role } = useAuthContext();

  // Guest users
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Redirect authenticated users
  return <Navigate to={getRoleRedirect(role)} replace />;
}
