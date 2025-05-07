"use client";

import { AddressContextProvider } from "@/contexts/AdressContext/AdressContext";

interface AddressContextProviderProps {
  children: React.ReactNode;
}

const AddressProvider: React.FC<AddressContextProviderProps> = ({ children }) => {
  return <AddressContextProvider>{children}</AddressContextProvider>;
};

export default AddressProvider;
