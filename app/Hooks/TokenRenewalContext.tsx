// 'use client'
// import React, { createContext, useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/router';
// import apiAdress from '@/utils/api';

// const TokenRenewalContext = createContext<{ accessToken: string | null, renewToken: () => Promise<void> }>({
//   accessToken: null,
//   renewToken: async () => {},
// });

// export const TokenRenewalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('accessToken'));
//   // const router = useRouter();

//   const renewToken = async () => {
//     try {
//       const response = await axios.post(`${apiAdress}/token/refresh`, {}, { withCredentials: true });
//       console.log('Token renovado:', response.data);
//       const newToken = response.data.token;
//       setAccessToken(newToken);
//       localStorage.setItem('accessToken', newToken);
//     } catch (error) {
//       console.error('Erro ao renovar o token:', error);
//       // Redireciona o usuário para login se a renovação falhar
//       // router.push('/login');
//     }
//   };

//   useEffect(() => {
//     // Renovação do token a cada 14 minutos
//     const interval = setInterval(renewToken, 14 * 60 * 1000);
    
//     return () => clearInterval(interval);
//   }, []);

//   // Sincronizar o estado de accessToken com o localStorage
//   useEffect(() => {
//     const syncStorage = (event: StorageEvent) => {
//       if (event.key === 'accessToken') {
//         setAccessToken(event.newValue);
//       }
//     };
    
//     window.addEventListener('storage', syncStorage);
    
//     return () => {
//       window.removeEventListener('storage', syncStorage);
//     };
//   }, []);

//   return (
//     <TokenRenewalContext.Provider value={{ accessToken, renewToken }}>
//       {children}
//     </TokenRenewalContext.Provider>
//   );
// };



// export const useTokenRenewal = () => {
//   const context = useContext(TokenRenewalContext);
//   if (!context) {
//     throw new Error('useTokenRenewal must be used within a CartProvider');
//   }
//   return context;
// };
