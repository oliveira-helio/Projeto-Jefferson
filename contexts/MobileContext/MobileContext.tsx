'use client'
import React, { createContext, ReactNode, useEffect, useState } from 'react';

type MobileContextType = {
  isMobile: boolean;
};

export const MobileContext = createContext<MobileContextType>({ isMobile: false });

export const MobileContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);

    checkIsMobile(); // inicial
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return (
    <MobileContext.Provider value={{ isMobile }}>
      {children}
    </MobileContext.Provider>
  );
};
