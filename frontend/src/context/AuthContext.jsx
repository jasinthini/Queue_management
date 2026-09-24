import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("queue_user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("queue_token");
  });

  const login = (userData, accessToken = "frontend-demo-token") => {
    const finalUser = userData || {
      name: "Queue Manager",
      email: "admin@queue.com",
      role: "Administrator",
    };

    setUser(finalUser);
    setToken(accessToken);

    localStorage.setItem("queue_user", JSON.stringify(finalUser));
    localStorage.setItem("queue_token", accessToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("queue_user");
    localStorage.removeItem("queue_token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: Boolean(token),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}