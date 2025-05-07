"use client";

import { CartContextProvider } from "@/contexts/CartContext/CartContext";

interface CartContextProviderProps {
  children: React.ReactNode;
}

const CartProvider: React.FC<CartContextProviderProps> = ({ children }) => {
  return <CartContextProvider>{children}</CartContextProvider>;
};

export default CartProvider;
