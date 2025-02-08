"use client";

import { AddressContextProvider } from "@/Hooks/useAddress";

interface AddressContextProviderProps {
  children: React.ReactNode;
}

const AddressProvider: React.FC<AddressContextProviderProps> = ({ children }) => {
  return <AddressContextProvider>{children}</AddressContextProvider>;
};

export default AddressProvider;
