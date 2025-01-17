'use client'
import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import apiAdress from '@/utils/api';

interface AuthContextData {
  isAuthenticated: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (credentials: { email: string; password: string }) => {
    const response = await axios.post(`${apiAdress}/login`, credentials, { withCredentials: true });
    localStorage.setItem('accessToken', response.data.accessToken);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await axios.post(`${apiAdress}/logout`, {}, { withCredentials: true });
    localStorage.removeItem('accessToken');
    setIsAuthenticated(false);
  };

  const renewToken = async () => {
    try {
      const response = await axios.post(`${apiAdress}/token/refresh`, {}, { withCredentials: true });
      localStorage.setItem('accessToken', response.data.accessToken);
    } catch (error) {
      logout();
    }
  };

  // Escuta mudanças no localStorage para sincronizar entre abas
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === 'accessToken') {
        setIsAuthenticated(!!event.newValue);
      }
    };

    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  // Renova o token periodicamente
  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        renewToken();
      }
    }, 20 * 60 * 1000); // A cada 20 minutos

    return () => clearInterval(interval);
  }, []);

  // Logout automático após inatividade
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const resetTimeout = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        logout();
      }, 30 * 60 * 1000); // 30 minutos
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
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
