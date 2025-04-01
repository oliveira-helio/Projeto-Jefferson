'use client'
import React, { createContext, useEffect, useState, useContext, useCallback } from 'react';
import axios from 'axios';
import apiAdress from '@/utils/api';
import { useRouter } from 'next/navigation';
import { FieldValues } from 'react-hook-form';
import { User } from '@/utils/types';

interface AuthContextData {
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (credentials: { email: string; password: string } | FieldValues) => Promise<unknown>;
  user: User | null;
  logout: () => void;
  accessToken: string | null;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const router = useRouter();
  
  const login = async (credentials: FieldValues) => {
    if (typeof window !== 'undefined') {
      try {
        const response = await axios.post(`${apiAdress}/login`, credentials, { withCredentials: true });
        
        if (response.data.accessToken) {
          const user = response.data.user;
          localStorage.setItem('accessToken', response.data.accessToken);
          setAccessToken(response.data.accessToken);
          setIsAuthenticated(true);
          setUser({
            id: user.id,
            name: user.name,
            surname: user.surname || null,
            gender: user.gender || null,
            profilePicture: user.profilePicture || null,
            email: user.email,
            birthDate: user.birthDate || null,
            phone: user.phone || null,
            cpf: user.cpf || null,
            provider: user.provider || null,
          });
          setIsAdmin(user.isAdmin || false);
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem("isAdmin", JSON.stringify(user.isAdmin || false));
        }
        return { status: response.status, data: response.data };
      } catch (error: any) {
        // return error
        return { status: error.status, data: error.response.data.error }
      }
    }
  };

  const logout = useCallback(async () => {
    if (typeof window !== 'undefined') {
      localStorage.clear();
      setIsAuthenticated(false);
      
      try {
        await axios.post(`${apiAdress}/logout`, {}, { withCredentials: true });
      } catch (error) {
        console.error('Erro ao fazer logout:', error);
      }
    }
  }, []);
  
  const renewToken = async () => {
    if (typeof window !== 'undefined') {
      try {
        const response = await axios.post(`${apiAdress}/token/refresh`, {}, { withCredentials: true });
        localStorage.setItem('accessToken', response.data.accessToken);
        setAccessToken(response.data.accessToken);
      } catch (error) {
        console.error('Erro ao renovar token:', error);
        logout();
      }
    }
  };
  
  // Load accessToken and isAdmin from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      setAccessToken(token);
      setIsAuthenticated(!!token);

      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAdmin(parsedUser.isAdmin || false); // Garante que `isAdmin` seja inicializado corretamente
      }
    }
  }, []);
  
  // Sincronize `isAuthenticated` between tabs
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleStorageChange = (event: StorageEvent) => {
        if (event.key === 'accessToken') {
          setIsAuthenticated(!!event.newValue);
        }
      };
      window.addEventListener('storage', handleStorageChange);
      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    }
  }, []);

  
  // Sincronize token and between tabs
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleStorage = (event: StorageEvent) => {
        if (event.key === "accessToken") {
          const updatedToken = localStorage.getItem("accessToken");
          setAccessToken(updatedToken);
          setIsAuthenticated(!!updatedToken);
        }
      };
      window.addEventListener("storage", handleStorage);
      return () => {
        window.removeEventListener("storage", handleStorage);
      };
    };
  }, []);

  

  // Sincronize user and between tabs
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleStorage = (event: StorageEvent) => {
        if (event.key === "user") {
          const userString = localStorage.getItem("user");
          if (userString) {
            try {
              const updatedUser: User = JSON.parse(userString); // Parse the string into a User object
              setUser({
                id: updatedUser.id,
                name: updatedUser.name,
                surname: updatedUser.surname || null,
                gender: updatedUser.gender || null,
                profilePicture: updatedUser.profilePicture || null,
                email: updatedUser.email,
                birthDate: updatedUser.birthDate || null,
                phone: updatedUser.phone || null,
                cpf: updatedUser.cpf || null,
                provider: updatedUser.provider || null,
              });
              setIsAdmin(updatedUser.isAdmin || false);
            } catch (error) {
              console.error("Failed to parse user from localStorage:", error);
              setUser(null); // Handle invalid JSON gracefully
            }
          } else {
            setUser(null); // Handle the case where user is removed from localStorage
          }
        }
      };
      window.addEventListener("storage", handleStorage);
      return () => {
        window.removeEventListener("storage", handleStorage);
      };
    };
  }, []);
  
  // Periodicaly renew the access token
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const interval = setInterval(() => {
        if (localStorage.getItem('accessToken')) {
          renewToken();
        }
      }, 30 * 60 * 1000); // Renovar a cada 90 minutos

      return () => clearInterval(interval);
    }
  }, []);

  // Saves isAdmin in localstorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("isAdmin", JSON.stringify(isAdmin));
    }
  }, [isAdmin]);

  // Logout automatically when inactive
  useEffect(() => {
    if (typeof window !== 'undefined') {
      let timeout: NodeJS.Timeout;
      const handleTimeout = async () => {
        await logout();
        router.push('/');
        localStorage.clear();
      };

      const resetTimeout = () => {
        clearTimeout(timeout);
        timeout = setTimeout(handleTimeout, 30 * 60 * 1000); // 30 minutos de inatividade
      };

      window.addEventListener('mousemove', resetTimeout);
      window.addEventListener('click', resetTimeout);
      window.addEventListener('keydown', resetTimeout);

      return () => {
        window.removeEventListener('mousemove', resetTimeout);
        window.removeEventListener('click', resetTimeout);
        window.removeEventListener('keydown', resetTimeout);
        clearTimeout(timeout);
      };
    }
  }, [logout, router]);



  return (
    <AuthContext.Provider value={{ isAuthenticated, user, isAdmin, login, logout, accessToken }}>
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