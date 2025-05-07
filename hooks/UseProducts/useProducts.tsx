import { useContext } from "react";
import { ProductContext } from "@/contexts/ProductsContext/ProductsContext";

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de CartProvider");
  }
  return context;
};
