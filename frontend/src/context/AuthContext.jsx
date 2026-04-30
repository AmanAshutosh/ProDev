"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { api } from "../api/api";

const AuthContext = createContext();

function setAuthCookie(value) {
  if (value) {
    document.cookie = `prodev-auth=1; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
  } else {
    document.cookie = "prodev-auth=; path=/; max-age=0; SameSite=Lax";
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setLoading] = useState(true);

  const hydrate = useCallback(async () => {
    const token = localStorage.getItem("prodev-token");
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const u = await api.get("/user/me");
      setUser(u);
      setAuthCookie(true);
    } catch {
      localStorage.removeItem("prodev-token");
      setAuthCookie(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const login = async (email, password) => {
    const { token, user: u } = await api.post("/auth/login", {
      email,
      password,
    });
    localStorage.setItem("prodev-token", token);
    setAuthCookie(true);
    setUser(u);
    return u;
  };

  const register = async (name, email, password) => {
    const { token, user: u } = await api.post("/auth/register", {
      name,
      email,
      password,
    });
    localStorage.setItem("prodev-token", token);
    setAuthCookie(true);
    setUser(u);
    return u;
  };

  const logout = () => {
    localStorage.removeItem("prodev-token");
    setAuthCookie(false);
    setUser(null);
  };

  const updateUser = async (updates) => {
    const updated = await api.put("/user/me", updates);
    setUser(updated);
    return updated;
  };

  return (
    <AuthContext.Provider
      value={{ user, authLoading, login, register, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
