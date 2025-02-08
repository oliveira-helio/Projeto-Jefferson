'use client'
import React, { createContext, useEffect, useState, useContext, useCallback } from 'react';
import axios from 'axios';
import apiAdress from '@/utils/api';
import { useRouter } from 'next/navigation';
import { useCart } from '@/Hooks/useCart';
import { FieldValues } from 'react-hook-form';

interface AuthContextData {
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (credentials: { email: string; password: string } | FieldValues) => Promise<void>;
  logout: () => void;
  accessToken: string | null;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('accessToken'))
  const router = useRouter();

  const login = async (credentials: FieldValues) => {
    try {
      const response = await axios.post(`${apiAdress}/login`, credentials, { withCredentials: true });
      localStorage.setItem('accessToken', response.data.accessToken);    
      setAccessToken(response.data.accessToken);
      
      setIsAuthenticated(true);
      if (response.data.user.isAdmin) {
        setIsAdmin(true);
      }
      return response.data.accessToken;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  const logout = useCallback(async () => {
    localStorage.removeItem('accessToken');
    setIsAdmin(false);
    setIsAuthenticated(false);  

    try {
      await axios.post(`${apiAdress}/logout`, {}, { withCredentials: true });
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  }, []);

  const renewToken = async () => {
    try {
      const response = await axios.post(`${apiAdress}/token/refresh`, {}, { withCredentials: true });
      localStorage.setItem('accessToken', response.data.accessToken);
      setAccessToken(response.data.accessToken);    
    } catch (error) {
      console.error('Erro ao renovar token:', error);
      logout();
    }
  };

  // Sincronize `isAuthenticated` between tabs
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'accessToken') {
        setIsAuthenticated(!!event.newValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Sincronize `isAuthenticated` between tabs
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'accessToken') {
        setIsAuthenticated(!!event.newValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Sincronize token and between tabs
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === "accessToken") {
        const updatedToken = localStorage.getItem("accessToken");
        setAccessToken(updatedToken);
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  // Periodicaly renew the access token
  useEffect(() => {
    const interval = setInterval(() => {
      if (localStorage.getItem('accessToken')) {
        renewToken();
      }
    }, 30 * 60 * 1000); 

    return () => clearInterval(interval);
  }, []);

  // Change accessToken when updated
  useEffect(()=>{
    const newToken = localStorage.getItem('accessToken')
    setAccessToken(newToken)
  }, [localStorage.getItem('accessToken')])


  // Logout automatically when inactive
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleTimeout = async () => {
      await logout();
      localStorage.removeItem('cart')
      router.push('/');
    };

    const resetTimeout = () => {
      clearTimeout(timeout);
      timeout = setTimeout(handleTimeout, 30 * 60 * 1000); // 30 minutos
    };

    window.addEventListener('mousemove', resetTimeout);
    window.addEventListener('click', resetTimeout);
    window.addEventListener('keydown', resetTimeout);

    resetTimeout();

    return () => {
      window.removeEventListener('mousemove', resetTimeout);
      window.removeEventListener('click', resetTimeout);
      window.removeEventListener('keydown', resetTimeout);
      clearTimeout(timeout);
    };
  }, [logout, router]);

  // Sincronize the initial state with localStorage
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout, accessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
};
