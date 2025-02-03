import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import axios, { AxiosInstance } from "axios";
import { CartProductType } from "@/utils/types";
import toast from "react-hot-toast";
import apiAdress from "@/utils/api";

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
}

interface CartContextProviderProps {
  children: ReactNode;
}

const API_URL = `${apiAdress}/cart`;
const CartContext = createContext<CartContextType | null>(null);

export const CartContextProvider: React.FC<CartContextProviderProps> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartProductType[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [axiosInstance, setAxiosInstance] = useState<AxiosInstance | null>(
    null
  );

  // Fetch the client cart
  const fetchCart = useCallback(async () => {
    if (!axiosInstance) return;

    try {
      const response = await axiosInstance.get("/");
      const serverCart = response.data.products;

      // Merge local cart with server cart
      const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
      const mergedCart = mergeCarts(localCart, serverCart);

      setCart(mergedCart);
      localStorage.setItem("cart", JSON.stringify(mergedCart)); // Save merged cart to localStorage

      // Sync merged cart with backend
      await syncCartWithBackend(mergedCart);
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 401
      ) {
        toast.error("Acesso não autorizado - faça login novamente");
      } else {
        toast.error("Erro ao buscar o carrinho");
      }
    }
  }, [axiosInstance]);

  // Merge local cart with server cart
  const mergeCarts = (
    localCart: CartProductType[],
    serverCart: CartProductType[]
  ): CartProductType[] => {
    const mergedCart = [...localCart];

    serverCart.forEach((serverProduct) => {
      const localProductIndex = mergedCart.findIndex(
        (localProduct) => localProduct.productId === serverProduct.productId
      );

      if (localProductIndex !== -1) {
        // If product exists in local cart, update the quantity
        mergedCart[localProductIndex].quantity += serverProduct.quantity;
      } else {
        // If product does not exist in local cart, add it
        mergedCart.push(serverProduct);
      }
    });

    return mergedCart;
  };

  // Sync cart with backend
  const syncCartWithBackend = async (cart: CartProductType[]) => {
    if (!axiosInstance) return;

    try {
      await axiosInstance.post("/sync", { products: cart });
      toast.success("Carrinho sincronizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao sincronizar o carrinho");
    }
  };

  const handleAddProductToCart = async (product: CartProductType) => {
    // Usuário não logado: salva no estado local
    if (!localStorage.getItem("accessToken")) {
      setCart((prev) => {
        // Verifica se o produto já está no carrinho
        const existingProduct = prev.find(
          (item) => item.productId === product.productId
        );
        let updatedCart;
        if (existingProduct) {
          updatedCart = prev.map((item) =>
            item.productId === product.productId
              ? { ...item, quantity: item.quantity + product.quantity }
              : item
          );
        } else {
          updatedCart = [...prev, product]; // Adiciona novo produto
        }
        localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save to localStorage
        return updatedCart;
      });
      toast.success("Produto adicionado ao carrinho localmente!");
      return;
    }

    // Usuário logado: envia ao backend
    try {
      if (!axiosInstance)
        throw new Error("Erro na configuração do cliente HTTP.");

      // Verifica se o produto já está no carrinho
      if (cart.some((item) => item.productId === product.productId)) {
        handleProductQtyIncrease(product);
        return;
      }

      // Envia a requisição ao backend
      await axiosInstance.post("/cart", product);
      fetchCart(); // Atualiza o carrinho com dados do servidor
      toast.success("Produto adicionado à sacola!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao adicionar produto ao carrinho.");
    }
  };

  // Removes product from cart
  const handleRemoveProductFromCart = async (product: CartProductType) => {
    if (!localStorage.getItem("accessToken")) {
      setCart((prev) => {
        return prev.filter((item) => item.productId !== product.productId);
      });
      return;
    }
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
      await axiosInstance.put(`/${product.productId}`, {
        operation: "increase",
        quantity: product.quantity,
      });
      fetchCart();
    } catch {
      toast.error("Erro ao aumentar quantidade do produto");
    }
  };

  // Increase the quantity of the product in the cart by 1
  const handleProductQtyIncreaseUnit = async (product: CartProductType) => {
    if (!axiosInstance) return;

    try {
      await axiosInstance.put(`/${product.productId}`, {
        operation: "increaseOne",
      });
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
      await axiosInstance.put(`/${product.productId}`, {
        operation: "decrease",
      });
      fetchCart();
    } catch {
      toast.error("Erro ao diminuir quantidade do produto");
    }
  };

  // Clear the cart in localstorage
  const handleclearLocalCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  // Clear the cart in server and localstorage
  const handleclearCart = async () => {
    if (!localStorage.getItem("accessToken")) {
      handleclearLocalCart();
    }
    if (!axiosInstance) return;

    try {
      await axiosInstance.delete(`/`);
      handleclearLocalCart();
      toast.success("Carrinho limpo");
    } catch {
      toast.error("Erro ao limpar o carrinho");
    }
  };

  // Recovers the token from localStorage when building the component
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("accessToken");
      setToken(storedToken);
    }
  }, []);

  // Fetch cart when building the component
  useEffect(() => {
    if (axiosInstance) {
      fetchCart();
    } else {
      // Fetch cart from localStorage if not logged in
      const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCart(localCart);
    }
  }, [axiosInstance, fetchCart]);

  // Updates axiosInstance every time that the token changes
  useEffect(() => {
    if (token) {
      const instance = axios.create({
        baseURL: API_URL,
        headers: {
          "Content-Type": "application/json",
          accessToken: `Bearer ${token}`,
        },
      });
      setAxiosInstance(() => instance);
    }
  }, [token]);

  // Sincronize cart between tabs
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === "cart") {
        const updatedCart = localStorage.getItem("cart");
        setCart(updatedCart ? JSON.parse(updatedCart) : []);
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  // Watch changes in cart
  useEffect(() => {
    console.log("carrinho mudou:", cart);
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de CartProvider");
  }
  return context;
};
