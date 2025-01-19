import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import axios, { AxiosInstance } from 'axios';
import { CartProductType } from '@/utils/types';
import toast from "react-hot-toast";
import apiAdress from '@/utils/api';

interface CartContextType {
  cart: CartProductType[];
  cartTotalQty: number;
  fetchCart: () => void;
  handleAddProductToCart: (product: CartProductType) => void;
  handleRemoveProductFromCart: (product: CartProductType) => void;
  handleclearLocalCart: () => void;
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
  const [token, setToken] = useState<string | null>(null);
  const [axiosInstance, setAxiosInstance] = useState<AxiosInstance | null>(null);

  // Recupera o token do localStorage ao montar o componente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('accessToken');
      setToken(storedToken);
    }
  }, []);

  // Atualiza o axiosInstance sempre que o token mudar
  useEffect(() => {
    if (token) {
      const instance = axios.create({
        baseURL: API_URL,
        headers: {
          'Content-Type': 'application/json',
          accessToken: `Bearer ${token}`, // Adicionando o token nos cabeçalhos
        },
      });
      setAxiosInstance(() => instance);
    }
  }, [token]);

  // Busca o carrinho
  const fetchCart = async () => {
    if (!axiosInstance) return;

    try {
      const response = await axiosInstance?.get('/');      
      setCart(response.data.products);
      // console.log('fecth cart:', response.data.products);

    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
        console.log('Unauthorized access - possibly invalid token');
        toast.error("Unauthorized access - please log in again");
        // Handle token expiration or invalid token scenario
      } else {
        console.error('Erro ao buscar o carrinho:', error);
        toast.error("Erro ao buscar o carrinho");
      }
      toast.error("Erro ao buscar o carrinho");
    }
  };

  // Adiciona produto ao carrinho
  const handleAddProductToCart = async (product: CartProductType) => {
    if (!axiosInstance) return;

    if (cart.some((item) => item.productId === product.productId)) {
      handleProductQtyIncrease(product);
      console.log('Produto já existe no carrinho:', product.productId);
      return;
    }

    try {
      await axiosInstance.post('/', product);
      fetchCart();
      toast.success("Produto adicionado à sacola", { id: "cart-toast-1" });
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
      toast.error("Erro ao adicionar produto ao carrinho");
    }
  };

  // Remove produto do carrinho
  const handleRemoveProductFromCart = async (product: CartProductType) => {
    if (!axiosInstance) return;

    try {
      await axiosInstance.delete(`/${product.productId}`);
      setCart((prevCart) => prevCart.filter((item) => item.productId !== product.productId));
      toast.success("Produto removido da sacola", { id: "cart-toast-4" });
    } catch (error) {
      console.error('Erro ao remover do carrinho:', error);
      toast.error("Erro ao remover produto do carrinho");
    }
  };

  // Aumenta a quantidade de um produto no carrinho
  const handleProductQtyIncrease = async (product: CartProductType) => {
    if (!axiosInstance) return;

    try {
      await axiosInstance.put(`/${product.productId}`, { operation: "increase" });
      fetchCart();
    } catch (error) {
      console.error('Erro ao alterar quantidade:', error);
      toast.error("Erro ao aumentar quantidade do produto");
    }
  };

  // Diminui a quantidade de um produto no carrinho
  const handleProductQtyDecrease = async (product: CartProductType) => {
    if (!axiosInstance) return;

    if (product.quantity === 1) {
      return;
    }

    try {
      await axiosInstance.put(`/${product.productId}`, { operation: "decrease" });
      fetchCart();
    } catch (error) {
      console.error('Erro ao alterar quantidade:', error);
      toast.error("Erro ao diminuir quantidade do produto");
    }
  };

  // Limpa o carrinho local
  const handleclearLocalCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
    console.log(cart);
  };

  // Limpa o carrinho no servidor e localmente
  const handleclearCart = async () => {
    if (!axiosInstance) return;

    try {
      await axiosInstance.delete(`/cart`);
      handleclearLocalCart();
      toast.success("Carrinho limpo", { id: "cart-toast-5" });
    } catch (error) {
      console.error('Erro ao limpar carrinho:', error);
      toast.error("Erro ao limpar o carrinho");
    }
  };

  // Busca o carrinho ao montar o componente
  useEffect(() => {
    if (axiosInstance) {
      fetchCart();
    }
  }, [axiosInstance]);

  useEffect(() => {
  console.log("carrinho mudou:",cart);
  }, [cart]);

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
        handleclearLocalCart,
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
