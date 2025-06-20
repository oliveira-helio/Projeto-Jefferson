import {
  createContext,
  useState,
  //   useContext,
  useEffect,
  useCallback,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import axios from "axios";
import { CartProductType } from "@/types/ProductTypes";
import toast from "react-hot-toast";
import apiAdress from '@/utils/variables/api';
import { useAuth } from "@/hooks/UseAuth/useAuth";
import { useRouter } from "next/navigation";
import { set } from "react-hook-form";

interface CartContextType {
  cart: CartProductType[];
  cartTotalQty: number;
  selectedProducts: CartProductType[];
  setSelectedProducts: Dispatch<SetStateAction<CartProductType[]>>,
  fetchCart: () => Promise<void>;
  syncLocalCartToBackend: () => Promise<void>;
  handleAddProductToCart: (product: CartProductType) => void;
  handleSelectProduct: (product: CartProductType) => void;
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

export const CartContext = createContext<CartContextType | null>(null);

export const CartContextProvider: React.FC<CartContextProviderProps> = ({
  children,
}) => {
  const router = useRouter();
  const { accessToken } = useAuth()
  const [cart, setCart] = useState<CartProductType[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<CartProductType[]>([]);
  const [cartTotalQty, setCartTotalQty] = useState<number>(0);

  // Fetch the client cart
  const fetchCart = useCallback(async () => {
    if (typeof window !== "undefined") {

      try {
        const response = await axios.get(`${apiAdress}/cart/get`, {
          headers: {
            "Content-Type": "application/json",
            accessToken: `Bearer ${accessToken}`,
          },
        });
        const serverCart = response.data.products;
        setCart(serverCart);
        localStorage.setItem("cart", JSON.stringify(serverCart));
        router.refresh();
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          toast.error("Acesso não autorizado - faça login novamente");
        } else {
          toast.error("Erro ao buscar o carrinho");
        }
      }
    }
  }, [accessToken]);

  // Sync cart with backend
  const syncLocalCartToBackend = useCallback(async () => {
    if (typeof window !== "undefined") {
      const localCart = JSON.parse(localStorage.getItem("cart") || "[]");

      if (localCart.length === 0) {
        await fetchCart();
        return;
      };

      try {

        await axios.post(`${apiAdress}/cart/sync`,
          {
            products: localCart
          }, {
          headers: {
            "Content-Type": "application/json",
            accessToken: `Bearer ${accessToken}`,
          },
        });

        localStorage.removeItem("cart");
        await fetchCart();
        toast.success("Carrinho sincronizado com sucesso!");
      } catch (error) {
        console.error(error);
        toast.error("Erro ao sincronizar o carrinho local com o backend");
      };
    };
  }, [fetchCart, accessToken]);

  const handleAddProductToCart = async (product: CartProductType) => {
    if (typeof window !== "undefined") {
      // user not logged: saves in localstorage
      if (!localStorage.getItem("accessToken")) {
        setCart((prev) => {
          // verify if the product is already in cart
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
            updatedCart = [...prev, product]; // adds to cart
          }
          localStorage.setItem("cart", JSON.stringify(updatedCart)); // Saves in localStorage
          return updatedCart;
        });
        toast.success("Produto adicionado ao carrinho localmente!");
        return;
      }

      // Logged user: sends to backend
      try {
        // verify if the product is already in cart
        if (cart.some((item) => item.productId === product.productId)) {
          handleProductQtyIncrease(product);
          return;
        }

        // If doesn't, sends the req to backend
        await axios.post(`${apiAdress}/cart/add`, product, {
          headers: {
            "Content-Type": "application/json",
            accessToken: `Bearer ${accessToken}`,
          }
        });
        fetchCart(); // Updates cart with backend's data
        toast.success("Produto adicionado à sacola!");
      } catch (error) {
        console.error(error);
        toast.error("Erro ao adicionar produto ao carrinho.");
      };
    };
  };

  // Selects/Unselects products to be paid
  const handleSelectProduct = (product: CartProductType) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.some((p) => p.productId === product.productId)
        ? prevSelected.filter((p) => p.productId !== product.productId) // Unselect if already selected
        : [...prevSelected, product] // Select if not selected
    );
  };

  // Removes product from cart
  const handleRemoveProductFromCart = async (product: CartProductType) => {
    if (typeof window !== "undefined") {
      if (!localStorage.getItem("accessToken")) {
        setCart((prev) => {
          return prev.filter((item) => item.productId !== product.productId);
        });
        return;
      };

      try {
        await axios.delete(`${apiAdress}/cart/remove/${product.productId}`, {
          headers: {
            "Content-Type": "application/json",
            accessToken: `Bearer ${accessToken}`,
          }
        });
        fetchCart();
        toast.success("Produto removido da sacola");
      } catch {
        toast.error("Erro ao remover produto do carrinho");
      };
    };
  };

  // Increase the quantity of the product in the cart
  const handleProductQtyIncrease = async (product: CartProductType) => {
    if (typeof window !== "undefined") {
      if (!localStorage.getItem("accessToken")) {
        setCart((prev) => {
          const updatedCart = prev.map((item) =>
            item.productId === product.productId
              ? { ...item, quantity: item.quantity + product.quantity }
              : item
          );
          localStorage.setItem("cart", JSON.stringify(updatedCart));
          return updatedCart;
        });
        toast.success("Quantidade aumentada localmente!");
        return;
      }

      try {
        await axios.put(`${apiAdress}/cart/update/${product.productId}`, {
          operation: "increase",
          quantity: product.quantity,
        }, {
          headers: {
            "Content-Type": "application/json",
            accessToken: `Bearer ${accessToken}`,
          }
        });
        fetchCart();
      } catch (error) {
        toast.error("Erro ao aumentar quantidade do produto");
      };
    };
  };

  // Increase the quantity of the product in the cart by 1
  const handleProductQtyIncreaseUnit = async (product: CartProductType) => {
    if (typeof window !== "undefined") {
      if (!localStorage.getItem("accessToken")) {
        setCart((prev) => {
          const updatedCart = prev.map((item) =>
            item.productId === product.productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
          localStorage.setItem("cart", JSON.stringify(updatedCart));
          return updatedCart;
        });
        return;
      }

      try {
        await axios.put(`${apiAdress}/cart/update/${product.productId}`, {
          operation: "increaseOne",
        }, {
          headers: {
            "Content-Type": "application/json",
            accessToken: `Bearer ${accessToken}`,
          }
        });
        fetchCart();
      } catch {
        toast.error("Erro ao aumentar quantidade do produto");
      };
    };
  };

  // Decrease the quantity of the product in the cart
  const handleProductQtyDecrease = async (product: CartProductType) => {
    if (typeof window !== "undefined") {
      if (product.quantity <= 1) return; // Não permite diminuir abaixo de 1
      if (!localStorage.getItem("accessToken")) {
        setCart((prev) => {
          const updatedCart = prev.map((item) =>
            item.productId === product.productId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
          localStorage.setItem("cart", JSON.stringify(updatedCart));
          return updatedCart;
        });
        return;
      }

      try {
        await axios.put(`${apiAdress}/cart/update/${product.productId}`, {
          operation: "decrease",
        }, {
          headers: {
            "Content-Type": "application/json",
            accessToken: `Bearer ${accessToken}`,
          }
        });
        fetchCart();

      } catch (error) {
        console.log('erro diminuir:', error);

        toast.error("Erro ao diminuir quantidade do produto");
      };
    };
  };

  // Clear the cart in localstorage
  const handleclearLocalCart = () => {
    if (typeof window !== "undefined") {
      setCart([]);
      localStorage.removeItem("cart");
    };
  };

  // Clear the cart in server and localstorage
  const handleclearCart = async () => {
    if (typeof window !== "undefined") {
      if (!localStorage.getItem("accessToken")) {
        handleclearLocalCart();
        return;
      }

      try {
        await axios.delete(`${apiAdress}/cart/clear`, {
          headers: {
            "Content-Type": "application/json",
            accessToken: `Bearer ${accessToken}`,
          }
        });
        handleclearLocalCart();
        toast.success("Carrinho limpo");
      } catch {
        toast.error("Erro ao limpar o carrinho");
      };
    };
  };


  // Builds selected products in localstorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedSelectedProducts = localStorage.getItem("selectedProducts");
      if (storedSelectedProducts) {
        setSelectedProducts(JSON.parse(storedSelectedProducts));
      }
    }
  }, []);

  // Saves selected products in localstorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts));
    };
  }, [selectedProducts]);

  // Sincronize selected products and between tabs
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleStorage = (event: StorageEvent) => {
        if (event.key === "selectedProducts") {
          const storedSelectedProducts = localStorage.getItem("selectedProducts");
          setSelectedProducts(storedSelectedProducts ? JSON.parse(storedSelectedProducts) : []);
        }
      };

      window.addEventListener("storage", handleStorage);
      return () => {
        window.removeEventListener("storage", handleStorage);
      };
    };
  }, []);


  // Sincronize cart between tabs
  useEffect(() => {
    if (typeof window !== "undefined") {
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
    };
  }, []);

  // Sincronize selected Products between tabs
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleStorage = (event: StorageEvent) => {
        if (event.key === "selectedProducts") {
          const updatedSelectedProducts = localStorage.getItem("selectedProducts");
          setSelectedProducts(updatedSelectedProducts ? JSON.parse(updatedSelectedProducts) : []);
        }
      };

      window.addEventListener("storage", handleStorage);
      return () => window.removeEventListener("storage", handleStorage);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCart(storedCart);
    };
  }, []);

  useEffect(() => {
      setCartTotalQty(cart.length);
      if(!accessToken || accessToken === null || accessToken === undefined) {
        setCartTotalQty(0);
      }
  }, [cart, accessToken]);

  // Debug: 
  // // ---------- Watch changes in cart
  // useEffect(() => {
  //   console.log("carrinho mudou:", cart);
  // }, [cart]);

  // // ---------- Watch changes in selectedProducts
  useEffect(() => {
    if (selectedProducts.length > 0) {
      const items = selectedProducts.map((item) => item.productId)
      console.log("selected mudou:", items);
    } else { console.log("selected mudou:", localStorage.getItem('selectedProducts')) }
  }, [selectedProducts]);


  return (
    <CartContext.Provider
      value={{
        cart,
        cartTotalQty,
        selectedProducts,
        setSelectedProducts,
        handleSelectProduct,
        fetchCart,
        syncLocalCartToBackend,
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


