// 'use client'

// import axios from 'axios';
// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const InactivityMonitor = () => {
//   const [lastActivityTime, setLastActivityTime] = useState(() => {
//     const savedTime = localStorage.getItem('lastActivity');
//     return savedTime ? parseInt(savedTime, 10) : Date.now();
//   });
//   const navigate = useNavigate();
//   const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 minutos

//   const handleActivity = () => {
//     const currentTime = Date.now();
//     setLastActivityTime(currentTime);
//     localStorage.setItem('lastActivity', currentTime.toString());
//   };

//   const checkInactivity = () => {
//     const currentTime = Date.now();
//     if (currentTime - lastActivityTime >= INACTIVITY_TIMEOUT) {
//       handleLogout();
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await axios.post('/logout', {}, { withCredentials: true });
//       localStorage.removeItem('accessToken');
//       localStorage.removeItem('lastActivity');
//       navigate('/login');
//     } catch (error) {
//       console.error('Erro ao realizar logout:', error);
//       navigate('/login');
//     }
//   };

//   useEffect(() => {
//     const events = ['mousemove', 'keydown', 'click'];
//     events.forEach((event) => {
//       window.addEventListener(event, handleActivity);
//     });

//     const inactivityCheckInterval = setInterval(checkInactivity, 60000);

//     const syncActivity = (event: StorageEvent) => {
//       if (event.key === 'lastActivity') {
//         setLastActivityTime(event.newValue ? parseInt(event.newValue, 10) || Date.now() : Date.now());
//       }
//     };
//     window.addEventListener('storage', syncActivity);

//     return () => {
//       events.forEach((event) => {
//         window.removeEventListener(event, handleActivity);
//       });
//       clearInterval(inactivityCheckInterval);
//       window.removeEventListener('storage', syncActivity);
//     };
//   }, [lastActivityTime]);

//   // This component does not render any UI because it only monitors user inactivity.
//   return null;
// };

// export default InactivityMonitor;



