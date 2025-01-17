import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import axios from 'axios';
import { CartProductType } from '@/utils/types';
import toast from "react-hot-toast";
import apiAdress from '@/utils/api';
import { Quando } from 'next/font/google';


interface CartContextType {
  cart: CartProductType[];
  cartTotalQty: number;
  fetchCart: () => void;
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
  const token = localStorage.getItem('authToken'); // Recuperando o token armazenado
  const [cart, setCart] = useState<CartProductType[]>([]);

  const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Adicionando o token nos cabeçalhos
    },
  });

  const fetchCart = async () => {
    if (!localStorage.acessToken) {
      return;
    }
    try {
      const response = await axiosInstance.get('/');
      setCart(response.data.products);
      console.log('Carrinho:', response.data.products);
    } catch (error) {
      console.error('Erro ao buscar o carrinho:', error);
      toast.error("Erro ao buscar o carrinho");
    }
  };



  const handleAddProductToCart = async (product: CartProductType) => {
    if (cart.some((item) => item.productId === product.productId)) {
      handleProductQtyIncrease(product);
      console.log('Produto já existe no carrinho', product.productId);
      return;
    }

    try {
      const response = await axiosInstance.post(API_URL, product);
      fetchCart();
      toast.success("Produto adicionado à sacola", { id: "cart-toast-1" });
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
      toast.error("Erro ao adicionar produto ao carrinho");
    }
  };


  const handleRemoveProductFromCart = async (product: CartProductType) => {

    try {
      await axiosInstance.delete(`${API_URL}/${product.productId}`);
      setCart((prevCart) => prevCart.filter((item) => item.productId !== product.productId));
      toast.success("Produto removido da sacola", { id: "cart-toast-4" });
    } catch (error) {
      console.error('Erro ao remover do carrinho:', error);
      toast.error("Erro ao remover produto do carrinho");
    }
  };

  
  const handleProductQtyIncrease = async (product: CartProductType) => {
    try {
      await axiosInstance.put(`${API_URL}/${product.productId}`, { operation: "increase", quantity: product.quantity});
      fetchCart();
      console.log(cart)
    } catch (error) {
      console.error('Erro ao alterar quantidade:', error);
      toast.error("Erro ao aumentar quantidade do produto");
    }
  };


  const handleProductQtyDecrease = async (product: CartProductType) => {
    if (product.quantity === 1) {
      return;
    }

    try {
      await axiosInstance.put(`${API_URL}/${product.productId}`, { operation: "decrease" });
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.productId === product.productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    } catch (error) {
      console.error('Erro ao alterar quantidade:', error);
      toast.error("Erro ao diminuir quantidade do produto");
    }
  };


  const handleclearCart = async () => {
    try {
      await axiosInstance.delete(`${API_URL}/cart`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Passando o token no cabeçalho Authorization
        }
      });

      // setCart([]);
      toast.success("Carrinho limpo", { id: "cart-toast-5" });
    } catch (error) {
      console.error('Erro ao limpar carrinho:', error);
      toast.error("Erro ao limpar o carrinho");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartTotalQty: cart.length,
        fetchCart,
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