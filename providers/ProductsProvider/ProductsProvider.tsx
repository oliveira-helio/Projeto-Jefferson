"use client";

import { ProductContextProvider } from "@/contexts/ProductsContext/ProductsContext";

interface ProductContextProviderProps {
  children: React.ReactNode;
}

const ProductsProvider: React.FC<ProductContextProviderProps> = ({ children }) => {
  return <ProductContextProvider>{children}</ProductContextProvider>;
};

export default ProductsProvider;
