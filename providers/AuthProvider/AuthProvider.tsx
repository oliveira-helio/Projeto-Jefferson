"use client";

import { AuthContextProvider } from "@/contexts/AuthContext/AuthContext";

interface AuthContextProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  return <AuthContextProvider>{children}</AuthContextProvider>;
};

export default AuthProvider;
