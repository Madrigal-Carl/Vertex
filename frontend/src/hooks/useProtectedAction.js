import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

export default function useProtectedAction() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const protectedAction = ({
    role,
    onSuccess,
    redirect = "/auth",
    unauthorizedMessage = "You are not authorized to perform this action.",
  }) => {
    // not logged in
    if (!user) {
      navigate(redirect);
      return;
    }

    // wrong role
    if (role && user.role !== role) {
      return;
    }

    // success
    onSuccess?.();
  };

  return protectedAction;
}
