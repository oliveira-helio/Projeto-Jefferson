import { CartProductType } from "@/utils/types";
import toast, { Toast } from "react-hot-toast";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type CartContextType = {
  cartTotalQty: number;
  cartProducts: CartProductType[] | null;
  handleAddProductToCart: (product: CartProductType) => void;
  handleRemoveProductFromCart: (product: CartProductType) => void;
};

interface Props {
  [propName: string]: any;
}

export const CartContext = createContext<CartContextType | null>(null);

export const CartContextProvider = (props: Props) => {
  const [cartTotalQty, setCartTotalQty] = useState(0);
  const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(
    null
  );

  useEffect(() => {
    const storedCart: any = localStorage.getItem("eShopCartItems");
    const storedCartProducts: CartProductType[] | null = JSON.parse(storedCart);

    setCartProducts(storedCartProducts);
  }, []);

  const handleAddProductToCart = useCallback((product: CartProductType) => {
    console.log("Adicionando ao carrinho:", product);
    setCartProducts((prev) => {
      if (prev) {
        const existingProductIndex = prev.findIndex(
          (item) =>
            item.productId === product.productId &&
            item.colorCode === product.colorCode
        );

        if (existingProductIndex > -1) {
          const updatedCart = prev.map((item, index) =>
            index === existingProductIndex
              ? { ...item, quantity: item.quantity + product.quantity }
              : item
          );

          toast.success("Produto adicionado à sacola", { id: "cart-toast-1" });
          localStorage.setItem("eShopCartItems", JSON.stringify(updatedCart));
          return updatedCart;
        } else {
          const newCart = [...prev, product];
          localStorage.setItem("eShopCartItems", JSON.stringify(newCart));
          toast.success("Produto adicionado à sacola", { id: "cart-toast-2" });
          return newCart;
        }
      } else {
        const newCart = [product];
        localStorage.setItem("eShopCartItems", JSON.stringify(newCart));
        toast.success("Produto adicionado à sacola", { id: "cart-toast-3" });
        return newCart;
      }
    });
  }, []);

  const handleRemoveProductFromCart = useCallback(
    (product: CartProductType) => {},
    []
  );

  const value = {
    cartTotalQty,
    cartProducts,
    handleAddProductToCart,
    handleRemoveProductFromCart,
  };

  return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === null) {
    throw new Error("useCart must be used within a CartContextProvider");
  }
  return context;
};
