// 'use client'

// import { useEffect } from 'react';
// import axios from 'axios';

// const TokenRenewal = () => {
//   const refreshAccessToken = async () => {
//     try {
//       const response = await axios.post('/token/refresh', {}, { withCredentials: true });
//       const newAccessToken = response.data.token;
  
//       // Atualiza o access token no localStorage
//       localStorage.setItem('accessToken', newAccessToken);
//     } catch (error) {
//       console.error('Erro ao renovar o token:', error);
//       window.location.href = '/login';
//     }
//   };

//   useEffect(() => {
//     // Verifica se o token precisa ser renovado a cada 15 minutos
//     const interval = setInterval(refreshAccessToken, 15 * 60 * 1000); // 15 minutos

//     return () => clearInterval(interval); // Limpar o intervalo ao desmontar o componente
//   }, []);

//   return null; 
// };

// export default TokenRenewal;
