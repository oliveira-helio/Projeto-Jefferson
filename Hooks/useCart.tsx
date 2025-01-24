import { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
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
  handleProductQtyIncreaseUnit: (product: CartProductType) => void;
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

  // Recovers the token from localStorage when building the component
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('accessToken');
      setToken(storedToken);
    }
  }, []);

  // Updates axiosInstance avery time that the token changes
  useEffect(() => {
    if (token) {
      const instance = axios.create({
        baseURL: API_URL,
        headers: {
          'Content-Type': 'application/json',
          accessToken: `Bearer ${token}`,
        },
      });
      setAxiosInstance(() => instance);
    }
  }, [token]);

  // Fetch the client cart
  const fetchCart = useCallback(async () => {
    if (!axiosInstance) return;

    try {
      const response = await axiosInstance.get('/');
      setCart(response.data.products);
      localStorage.setItem('cart', JSON.stringify(response.data.products)); // Salva o carrinho no localStorage
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
        toast.error("Acesso não autorizado - faça login novamente");
      } else {
        toast.error("Erro ao buscar o carrinho");
      }
    }
  }, [axiosInstance]);

  // Sincronize cart between tabs
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === 'cart') {
        const updatedCart = localStorage.getItem('cart');
        setCart(updatedCart ? JSON.parse(updatedCart) : []);
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  // Add product to cart
  const handleAddProductToCart = async (product: CartProductType) => {
    if (!axiosInstance) return;

    if (cart.some((item) => item.productId === product.productId)) {
      handleProductQtyIncrease(product);
      return;
    }

    try {
      await axiosInstance.post('/', product);
      fetchCart();
      toast.success("Produto adicionado à sacola");
    } catch {
      toast.error("Erro ao adicionar produto ao carrinho");
    }
  };

  // Removes product from cart
  const handleRemoveProductFromCart = async (product: CartProductType) => {
    if (!axiosInstance) return;

    try {
      await axiosInstance.delete(`/${product.productId}`);
      fetchCart();
      toast.success("Produto removido da sacola");
    } catch {
      toast.error("Erro ao remover produto do carrinho");
    }
  };

  // Increase the quantity of the product in the cart
  const handleProductQtyIncrease = async (product: CartProductType) => {
    if (!axiosInstance) return;

    try {
      await axiosInstance.put(`/${product.productId}`, { operation: "increase", quantity: product.quantity });
      fetchCart();
    } catch {
      toast.error("Erro ao aumentar quantidade do produto");
    }
  };

    // Increase the quantity of the product in the cart by 1
  const handleProductQtyIncreaseUnit = async (product: CartProductType) => {
    if (!axiosInstance) return;

    try {
      await axiosInstance.put(`/${product.productId}`, { operation: "increaseOne" });
      fetchCart();
    } catch {
      toast.error("Erro ao aumentar quantidade do produto");
    }
  };

  // Decrease the quantity of the product in the cart
  const handleProductQtyDecrease = async (product: CartProductType) => {
    if (!axiosInstance) return;

    if (product.quantity === 1) {
      return;
    }

    try {
      await axiosInstance.put(`/${product.productId}`, { operation: "decrease" });
      fetchCart();
    } catch {
      toast.error("Erro ao diminuir quantidade do produto");
    }
  };

  // Clear the cart in localstorage
  const handleclearLocalCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  // Clear the cart in server and localstorage
  const handleclearCart = async () => {
    if (!axiosInstance) return;

    try {
      await axiosInstance.delete(`/`);
      handleclearLocalCart();
      toast.success("Carrinho limpo");
    } catch {
      toast.error("Erro ao limpar o carrinho");
    }
  };

  // Fecth cart when building the component
  useEffect(() => {
    if (axiosInstance) {
      fetchCart();
    }
  }, [axiosInstance, fetchCart]);

  // Watch changes in cart
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
        handleProductQtyIncreaseUnit,
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
    throw new Error('useCart deve ser usado dentro de CartProvider');
  }
  return context;
};
