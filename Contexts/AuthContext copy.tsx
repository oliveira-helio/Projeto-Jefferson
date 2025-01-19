'use client'
import React, { createContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import apiAdress from '@/utils/api';
import { useRouter } from 'next/navigation';
import { useCart } from '@/Hooks/useCart';
import { FieldValues } from 'react-hook-form';

interface AuthContextData {
  isAuthenticated: boolean;
  login: (credentials: { email: string; password: string } | FieldValues) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { fetchCart, handleclearLocalCart } = useCart();
  const router = useRouter();

  const login = async (credentials: FieldValues) => {
    const response = await axios.post(`${apiAdress}/login`, credentials, { withCredentials: true });
    localStorage.setItem('accessToken', response.data.accessToken);

    setIsAuthenticated(true);
  };

  const logout = useCallback(async () => {
    localStorage.removeItem('accessToken');
    handleclearLocalCart();

    if (!isAuthenticated) {
      console.log("Usuário já está deslogado.");
      return;
    }
  
    try {
      await axios.post(`${apiAdress}/logout`, {}, { withCredentials: true });
      setIsAuthenticated(false);
    } catch (error) {
      console.log("Erro no logout:", error);
    }
  }, [isAuthenticated, handleclearLocalCart]);

  const renewToken = async () => {
    try {
      const response = await axios.post(`${apiAdress}/token/refresh`, {}, { withCredentials: true });
      localStorage.setItem('accessToken', response.data.accessToken);
    } catch (error) {
      console.log("erro", error);
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
        console.log('Token renovado');
      }
    }, 25 * 60 * 1000); // A cada 25 minutos

    return () => clearInterval(interval);
  }, []);

  // Logout automático após inatividade
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleTimeout = async () => {
      if (isAuthenticated === true) {
        console.log('Usuário inativo por 30 minutos');
        await logout();
        router.push('/');
        console.log('deslogado');
        
      }
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
  }, [isAuthenticated, logout, router]);

  useEffect(() => {
    console.log('Estado de isAuthenticated mudou:', isAuthenticated);
  }, [isAuthenticated]);

  useEffect(() => {
    // Sincronizar o estado inicial com o localStorage
    const accessToken = localStorage.getItem('accessToken');
    setIsAuthenticated(!!accessToken);
  
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

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
