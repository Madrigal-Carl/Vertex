import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

export default function useProtectedAction() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return ({ allowedRole, action }) => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (allowedRole && user.role !== allowedRole) {
      navigate("/unauthorized");
      return;
    }

    action?.();
  };
}
