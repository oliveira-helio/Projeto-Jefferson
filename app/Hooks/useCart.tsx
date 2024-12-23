import { CartProductType } from "@/utils/types";
import toast from "react-hot-toast";
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
  handleclearCart: () => void;
  handleProductQtyIncrease: (product: CartProductType) => void;
  handleProductQtyDecrease: (product: CartProductType) => void;
};

interface Props {
  [propName: string]: any;
}

export const CartContext = createContext<CartContextType | null>(null);

export const CartContextProvider = (props: Props) => {
  const [cartTotalQty, setCartTotalQty] = useState(() => {
    const cartItems = JSON.parse(
      localStorage.getItem("eShopCartItems") || "[]"
    );
    return cartItems.length;
  });
  // TODO puxar a quantidade de itens do carrinho pelo banco de dados
  const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(
    null
  );

  useEffect(() => {
    const storedCart: any = localStorage.getItem("eShopCartItems");
    const storedCartProducts: CartProductType[] | null = JSON.parse(storedCart);

    setCartProducts(storedCartProducts);
  }, []);

  const handleAddProductToCart = useCallback((product: CartProductType) => {
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
    (product: CartProductType) => {
      if (cartProducts) {
        const filteredProducts = cartProducts.filter(
          (item) => item.productId !== product.productId
        );

        setCartProducts(filteredProducts);
        toast.success("Produto removido da sacola", { id: "cart-toast-4" });
        localStorage.setItem(
          "eShopCartItems",
          JSON.stringify(filteredProducts)
        );
      }
    },
    [cartProducts]
  );

  const handleclearCart = useCallback(() => {
    setCartProducts(null);
    setCartTotalQty(0);
    toast.success("Produtos removidos da sacola", { id: "cart-toast-5" });
    localStorage.setItem("eShopCartItems", JSON.stringify(null));
  }, []);

  const handleProductQtyIncrease = useCallback((product: CartProductType) => {
    setCartProducts((prev) => {
      if (prev) {
        const updatedCart = prev.map((item) =>
          item.productId === product.productId &&
          item.colorCode === product.colorCode
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );

        localStorage.setItem("eShopCartItems", JSON.stringify(updatedCart));
        return updatedCart;
      }
      return prev;
    });
  }, []);

  const handleProductQtyDecrease = useCallback((product: CartProductType) => {
    setCartProducts((prev) => {
      if (prev) {
        const updatedCart = prev
          .map((item) =>
            item.productId === product.productId &&
            item.colorCode === product.colorCode
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0); // Remove produtos com quantidade 0

        localStorage.setItem("eShopCartItems", JSON.stringify(updatedCart));
        return updatedCart;
      }
      return prev;
    });
  }, []);

  const value = {
    cartTotalQty,
    cartProducts,
    handleAddProductToCart,
    handleRemoveProductFromCart,
    handleclearCart,
    handleProductQtyIncrease,
    handleProductQtyDecrease,
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
