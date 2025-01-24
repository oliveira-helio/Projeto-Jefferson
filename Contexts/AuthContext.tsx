'use client'
import React, { createContext, useEffect, useState, useCallback } from 'react';
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
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const { fetchCart, handleclearLocalCart, cart } = useCart();
  const router = useRouter();

  const login = async (credentials: FieldValues) => {
    try {
      const response = await axios.post(`${apiAdress}/login`, credentials, { withCredentials: true });
      localStorage.setItem('accessToken', response.data.accessToken);
      await fetchCart(); 
      setIsAuthenticated(true);
      if (response.data.user.isAdmin) {
        setIsAdmin(true);
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  const logout = useCallback(async () => {
    localStorage.removeItem('accessToken');
    setIsAdmin(false);
    handleclearLocalCart();
    setIsAuthenticated(false);  

    try {
      await axios.post(`${apiAdress}/logout`, {}, { withCredentials: true });
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  }, [handleclearLocalCart]);

  const renewToken = async () => {
    try {
      const response = await axios.post(`${apiAdress}/token/refresh`, {}, { withCredentials: true });
      localStorage.setItem('accessToken', response.data.accessToken);
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

  // Periodicaly renew the access token
  useEffect(() => {
    const interval = setInterval(() => {
      if (localStorage.getItem('accessToken')) {
        renewToken();
      }
    }, 30 * 60 * 1000); 

    return () => clearInterval(interval);
  }, []);

  // Logout automatically when inactive
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleTimeout = async () => {
      await logout();
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
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
