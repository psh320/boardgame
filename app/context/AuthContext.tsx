// app/context/AuthContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { User, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { auth } from "../lib/firebaseConfig";

interface AuthContextProps {
  user: User | null;
  userName: string;
  loading: boolean;
  login: (name: string) => Promise<void>;
  logout: () => void;
  setUserName: (name: string) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
        if (pathname !== "/login") {
          router.push("/login");
        }
      }
    });

    return () => unsubscribe();
  }, [pathname, router]);

  const login = async (name: string) => {
    setLoading(true);
    try {
      const result = await signInAnonymously(auth);
      setUser(result.user);
      setUserName(name);
      setLoading(false);
      router.push("/");
    } catch (error) {
      console.error("Error signing in anonymously:", error);
      setLoading(false);
    }
  };

  const logout = () => {
    auth.signOut();
    setUser(null);
    setUserName("");
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, userName, loading, login, logout, setUserName }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
