import { useContext } from "react";
import { MobileContext } from "@/contexts/MobileContext/MobileContext";

export const useMobile = () => {
  const context = useContext(MobileContext);
  if (!context) {
    throw new Error("useMobile deve ser usado dentro de MobileProvider");
  }
  return context;
}