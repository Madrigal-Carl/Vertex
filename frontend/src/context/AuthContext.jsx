import { createContext, useEffect, useState } from "react";

import {
  loginUser,
  registerUser,
  googleAuth as googleAuthService,
  logoutUser,
  getMe,
} from "@/services/auth.service";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  async function fetchCurrentUser() {
    try {
      const response = await getMe();

      setUser(response.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  const login = async (credentials) => {
    const response = await loginUser(credentials);

    setUser(response.user);

    return response;
  };

  const register = async (userData) => {
    const response = await registerUser(userData);

    return response;
  };

  const googleLogin = async (token) => {
    const response = await googleAuthService(token);

    setUser(response.user);

    return response;
  };

  const logout = async () => {
    await logoutUser();

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        role: user?.role || null,
        login,
        register,
        googleLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
