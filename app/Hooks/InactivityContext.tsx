// 'use client'
// import React, { createContext, useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import axios from 'axios';
// import { useTokenRenewal } from './TokenRenewalContext';

// interface InactivityContextType {
//   lastActivityTime: number;
//   handleActivity: () => void;
// }

// const InactivityContext = createContext<InactivityContextType | undefined>(undefined);

// export const InactivityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [lastActivityTime, setLastActivityTime] = useState<number>(() => {
//     const savedTime = localStorage.getItem('lastActivity');
//     return savedTime ? parseInt(savedTime, 10) : Date.now();
//   });

//   const { renewToken } = useTokenRenewal();
//   // const router = typeof window !== 'undefined' ? useRouter() : null;
//   const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 minutos
//   const TOKEN_RENEWAL_THRESHOLD = 20 * 60 * 1000; // 20 minutos

//   const handleActivity = () => {
//     const currentTime = Date.now();
//     setLastActivityTime(currentTime);
//     localStorage.setItem('lastActivity', currentTime.toString());

//     // Verifica se o token de acesso precisa ser renovado
//     const tokenCreationTime = parseInt(localStorage.getItem('tokenCreationTime') || '0', 10);
//     if (currentTime - tokenCreationTime >= TOKEN_RENEWAL_THRESHOLD) {
//       renewToken();
//       localStorage.setItem('tokenCreationTime', currentTime.toString());
//     }
//   };

//   const checkInactivity = () => {
//     if (Date.now() - lastActivityTime >= INACTIVITY_TIMEOUT) {
//       handleLogout();
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await axios.post('/logout', {}, { withCredentials: true });
//       localStorage.removeItem('accessToken');
//       localStorage.removeItem('lastActivity');
//       localStorage.removeItem('tokenCreationTime');
//       // router.push('/login');
//     } catch (error) {
//       console.error('Erro ao realizar logout:', error);
//       // router.push('/login');
//     }
//   };

//   useEffect(() => {
//     const events = ['mousemove', 'keydown', 'click'];
//     events.forEach((event) => window.addEventListener(event, handleActivity));

//     const inactivityCheckInterval = setInterval(checkInactivity, 60000);

//     const syncActivity = (event: StorageEvent) => {
//       if (event.key === 'lastActivity') {
//         setLastActivityTime(event.newValue ? parseInt(event.newValue, 10) || Date.now() : Date.now());
//       }
//     };

//     window.addEventListener('storage', syncActivity);

//     return () => {
//       events.forEach((event) => window.removeEventListener(event, handleActivity));
//       clearInterval(inactivityCheckInterval);
//       window.removeEventListener('storage', syncActivity);
//     };
//   }, [lastActivityTime]);

//   return (
//     <InactivityContext.Provider value={{ lastActivityTime, handleActivity }}>
//       {children}
//     </InactivityContext.Provider>
//   );
// };

// export const useInactivity = () => {
//   const context = React.useContext(InactivityContext);
//   if (!context) {
//     throw new Error('useInactivity deve ser usado dentro de um InactivityProvider');
//   }
//   return context;
// };
