import { createContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  token: string | null | undefined;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null | undefined>(localStorage.getItem("token"));

  useEffect(() =>{
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    };
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return <AuthContext.Provider value={{ token, login, logout }}>{children}</AuthContext.Provider>;
};
