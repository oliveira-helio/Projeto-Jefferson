"use client";
import { useEffect, useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { useCart } from "../../Hooks/useCart";
import Link from "next/link";
import { formatCurrency } from "@/utils/utilitaryFunctions";
import { Delete } from "@mui/icons-material";
import Button from "../../components/MicroComponents/Button";
import ItemContent from "./ItemContent";
import { useRouter } from "next/navigation";
import { useAddress } from "@/Hooks/useAddress";

const CartClient = () => {
  const router = useRouter();
  const { handleclearCart, cart, selectedProducts, handleSelectProduct } = useCart();
  const [cartSubTotal, setCartSubTotal] = useState(0);
  const [cartFrete, setCartFrete] = useState(0);
  const [selectedFrete, setSelectedFrete] = useState(0);
  const [cartDiscount, setCartDiscount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const { selectedAddress } = useAddress()

  useEffect(() => { 
    if (cart && cart.length !== 0) {
      const subTotal = cart.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      );

      cart.map((item, index)=>{console.log(`item ${index} - frete ${item.deliveryFee}`);
      })
      const freteTotal = cart.reduce(
        (total, product) => total + (product.deliveryFee || 0),
        0
      );

      setCartSubTotal(subTotal);
      console.log('subTotal',subTotal);
      
      setCartFrete(freteTotal);
      console.log('freteTotal',freteTotal);

      setCartTotal(subTotal + freteTotal - cartDiscount);
    }
  }, [cart, cartDiscount]);

  useEffect(() => { 
    if (selectedProducts && selectedProducts.length !== 0) {
      const subTotal = selectedProducts.reduce(
        (total, product) => total + (product.deliveryFee || 0),
        0
      );

      const selectedFrete = selectedProducts.reduce(
        (total, product) => total + product.deliveryFee! * product.quantity,
        0
      );

      setSelectedFrete(subTotal);
      console.log('SelectedFrete',selectedFrete);
    }
  }, [ selectedProducts, selectedFrete]);

  const handleCheckout = () => {
    console.log(selectedProducts);
    
    if (selectedProducts.length === 0) {
      alert("Selecione pelo menos um produto para pagar.");
      return;
    }
    router.push(`/checkout/address`);
  };

  if (!cart || cart.length === 0)
    return (
      <div className="flex items-center justify-center">
        <div className="bg-[url('/assets/img/basket-retail-shopping-cart.jpg')] mt-0 rounded-2xl aspect-square bg-contain bg-no-repeat bg-center bg-pink-100 self-center flex flex-col items-center justify-between py-10">
          <div className="text-[3rem] text-pink-500 font-medium mx-8">
            Sua sacola está vazia
          </div>
          <div>
            <Link href={"/"} className=" flex flex-row items-center">
              <MdArrowBack size={50} className="text-pink-600" />
              <span className="text-4xl  text-pink-500">Começar a comprar</span>
            </Link>
          </div>
        </div>
      </div>
    );

  return (
    <div>
      <div className="flex flex-col items-center justify-center max-md:m-8">
        <div className="border-solid border-[1px] border-pink-400 bg-pink-50 rounded-2xl m-2 mt-4 py-2 px-2 w-full">
          <Link href={"/"} className=" flex flex-row items-center">
            <MdArrowBack size={20} className="text-pink-600" />
            <span className="text-xl text-pink-500 mx-2">
              Continuar comprando
            </span>
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row align-top gap-4 w-full m-2">
          <div className="border-solid border-[1px] border-pink-400 bg-pink-50 rounded-xl p-4 w-full">
            <div className="flex justify-center">
              <span className="text-3xl text-pinkSecondary font-semibold">
                MEUS PRODUTOS
              </span>
            </div>

            <div className="hidden md:block">
              <div className="grid grid-cols-7 my-2 px-4">
                <div className="justify-self-start col-span-3 font-semibold text-base text-slate-600 px-4">
                  PRODUTO
                </div>
                <div className="justify-self-center font-semibold text-base text-slate-600">
                  PREÇO
                </div>
                <div className="justify-self-center font-semibold text-base text-slate-600">
                  QUANTIDADE
                </div>
                <div className="justify-self-end lg:justify-self-center font-semibold text-base text-slate-600 pr-6 lg:pr-0 ">
                  TOTAL
                </div>
                <div className="justify-self-end lg:justify-self-center font-semibold text-base text-slate-600 pr-6 lg:pr-0 ">
                  SELECIONAR
                </div>
              </div>
            </div>

            <div>
              {cart &&
                cart.map((item) => (
                  <div key={item.productId} className="flex items-center">
                    <ItemContent item={item} />
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(item)}
                      onChange={() => handleSelectProduct(item)}
                      className="ml-4 w-5 h-5"
                    />
                  </div>
                ))}
            </div>

            <div className="flex justify-between border-solid border-[1.2px] border-pink-400 bg-pink-100 rounded-xl m-4 py-2 px-4">
              <p className="text-2xl font-semibold text-pinkSecondary">
                SUBTOTAL:
              </p>
              <p className="text-2xl font-semibold text-pinkSecondary">
                {formatCurrency(cartSubTotal)}
              </p>
            </div>

            <div className="flex">
              <button
                className="flex flex-row items-center p-2 m-2 gap-2 underline font-medium"
                onClick={handleclearCart}
              >
                <Delete className="text-[2rem] text-red-800" />
                <p className="text-sm ">LIMPAR CARRINHO</p>
              </button>
            </div>
          </div>

          <div className="flex justify-between border-solid border-[1px] border-pink-400 bg-pink-50 rounded-xl p-4 w-full md:w-[30%] min-h-[65vh] flex-col">
            <div className="h-40 w-full border-solid border-[1px] border-pink-400 bg-pink-50 rounded-xl p-4">
              FRETE: {formatCurrency(Number(cartFrete))}
              <div className="flex justify-between">
                <p className="text-2xl font-bold text-pinkSecondary">Frete dos produtos selecionados</p>
                <p className="text-2xl font-bold text-slate-800">
                  {formatCurrency(selectedFrete)}
                </p>
              </div>
            </div>

            <div>
              <div className="flex justify-between">
                <p className="text-2xl font-bold text-pinkSecondary">TOTAL:</p>
                <p className="text-2xl font-bold text-slate-800">
                  {formatCurrency(cartTotal)}
                </p>
              </div>
              
              <Button
                custom="flex w-[30%] md:w-full h-10 justify-self-end"
                label="FINALIZAR COMPRA"
                onClick={handleCheckout}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartClient;
