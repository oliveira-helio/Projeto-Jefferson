import { createContext, useState, useContext, ReactNode } from 'react';
import axios from 'axios';
import { CartProductType } from '@/utils/types';
import toast from "react-hot-toast";
import apiAdress from '@/utils/api';

interface CartContextType {
  cart: CartProductType[];
  cartTotalQty: number;
  handleAddProductToCart: (product: CartProductType) => void;
  handleRemoveProductFromCart: (product: CartProductType) => void;
  handleclearCart: () => void;
  handleProductQtyIncrease: (product: CartProductType) => void;
  handleProductQtyDecrease: (product: CartProductType) => void;
  cartProducts: CartProductType[];
}

interface CartContextProviderProps {
  children: ReactNode;
}

const API_URL = `${apiAdress}/cart`;

const CartContext = createContext<CartContextType | null>(null);

export const CartContextProvider: React.FC<CartContextProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartProductType[]>([]);

  const fetchCart = async () => {
    try {
      const response = await axios.get(API_URL);
      setCart(response.data);
    } catch (error) {
      console.error('Erro ao buscar o carrinho:', error);
    }
  };

  const handleAddProductToCart = async (product: CartProductType) => {
    try {
      const response = await axios.post(API_URL, product);
      setCart([...cart, response.data]);
      toast.success("Produto adicionado à sacola", { id: "cart-toast-1" });
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
    }
  };

  const handleRemoveProductFromCart = (product: CartProductType) => {
    setCart(cart.filter((item) => item.productId !== product.productId));
    toast.success("Produto removido da sacola", { id: "cart-toast-4" });
  };

  const handleProductQtyIncrease = (product: CartProductType) => {
    setCart(
      cart.map((item) =>
        item.productId === product.productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const handleProductQtyDecrease = (product: CartProductType) => {
    setCart(
      cart.map((item) =>
        item.productId === product.productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleclearCart = () => {
    setCart([]);
    toast.success("Produtos removidos da sacola", { id: "cart-toast-5" });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartTotalQty: cart.reduce((acc, item) => acc + item.quantity, 0),
        handleAddProductToCart,
        handleRemoveProductFromCart,
        handleProductQtyIncrease,
        handleProductQtyDecrease,
        handleclearCart,
        cartProducts: cart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};