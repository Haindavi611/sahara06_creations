import { createContext, useContext, useState } from "react";
const AuthContext = createContext(null);
// Admin credentials — change these as needed
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "sahara06@2026";
const AUTH_KEY = "sahara06_auth";
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(AUTH_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const login = (username, password) => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const userData = { username, role: "admin" };
      localStorage.setItem(AUTH_KEY, JSON.stringify(userData));
      setUser(userData);
      return { success: true };
    }
    return { success: false, error: "Invalid username or password" };
  };
  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    setUser(null);
  };
  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAdmin: user?.role === "admin" }}
    >
      {" "}
      {children}{" "}
    </AuthContext.Provider>
  );
}
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
