'use client';

import { MobileContextProvider } from "@/contexts/MobileContext/MobileContext";
import { FC, ReactNode } from "react";

interface MobileContextProviderProps {
  children: ReactNode;
}

const MobileProvider: FC<MobileContextProviderProps> = ({ children }) => {
  return <MobileContextProvider>{children}</MobileContextProvider>
}

export default MobileProvider;