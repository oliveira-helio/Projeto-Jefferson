import { useContext } from "react";
import { AddressContext } from "@/contexts/AdressContext/AdressContext";

export const useAddress = () => {
  const context = useContext(AddressContext);
  if (!context) {
    throw new Error("useAddress deve ser usado dentro de AddressProvider");
  } ''
  return context;
};
