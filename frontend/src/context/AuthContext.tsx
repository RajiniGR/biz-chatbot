import { createContext, useContext, useEffect, useState } from "react";
import axios from "../services/api";

type User = {
  id: string;
  email: string;
  role: "user" | "admin";
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;

  // 🔑 Check auth ONCE on app load
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/auth/me");
        setUser(res.data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const login = async (email: string, password: string) => {
    await axios.post("/auth/login", { email, password });
    const res = await axios.get("/auth/me");
    setUser(res.data.user);
  };

  const register = async (email: string, password: string) => {
    await axios.post("/auth/register", { email, password });
    const res = await axios.get("/auth/me");
    setUser(res.data.user);
  };

  const logout = async () => {
    await axios.post("/auth/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, register, logout }} >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
