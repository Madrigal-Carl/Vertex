import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";
import { ROLES } from "@/constants/roles";
import { getRoleRedirect } from "@/utils/getRoleRedirect";

export default function PublicOnlyRoute() {
  const { isAuthenticated, role } = useAuthContext();

  // Guests can access
  if (!isAuthenticated) {
    return <Outlet />;
  }

  // Redirect authenticated users
  return <Navigate to={getRoleRedirect(role)} replace />;
}
