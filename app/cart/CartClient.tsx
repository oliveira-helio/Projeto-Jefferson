"use client";
import { Suspense, useCallback, useEffect, useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { useCart } from "../../Hooks/useCart";
import Link from "next/link";
import { formatCurrency } from "@/utils/utilitaryFunctions";
import { Delete } from "@mui/icons-material";
import Button from "../../components/MicroComponents/Button";
import ItemContent from "./ItemContent";
import { useRouter } from "next/navigation";
import { DeliveryInfoType } from "@/utils/types";
import { useAddress } from "@/Hooks/useAddress";

const CartClient = () => {
  const router = useRouter();
  const { handleclearCart, cart, selectedProducts, setSelectedProducts, handleSelectProduct } = useCart();
  const { selectedAddress, selectedDelivery, handleSelectDeliveryType, fetchDeliveryOptions } = useAddress();
  const [selectedSubTotal, setSelectedSubTotal] = useState(0);
  const [selectedTotal, setSelectedTotal] = useState(0);


  const calculateDelivery = useCallback(async () => {

    if (!selectedProducts || !selectedAddress || selectedProducts.length === 0) {
      setSelectedSubTotal(0);
      setSelectedTotal(0);
      return;
    };

    try {
      const deliveryOptions: DeliveryInfoType[] = await fetchDeliveryOptions(selectedProducts, selectedAddress.cep);
      const preferredOptions = deliveryOptions.find(option => option.name === 'PAC' && !option.error)
        ? [deliveryOptions.find(option => option.name === 'PAC')!]
        : deliveryOptions.sort((a, b) => Number(a.price) - Number(b.price));
      const selectedOption = preferredOptions.find(option => option && !option.error);

      if (selectedOption) {
        handleSelectDeliveryType(selectedOption);
      } else { throw new Error('No delivery option found') }
      const subTotal = selectedProducts.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      );

      setSelectedSubTotal(subTotal);
      setSelectedTotal(Number(selectedOption!.price) + subTotal);

    } catch (error) {
      console.error('Erro ao calcular o frete:', error);
    }
  }, [selectedProducts, selectedAddress, fetchDeliveryOptions, handleSelectDeliveryType]);

  useEffect(() => {
    calculateDelivery();
  }, [selectedProducts, selectedAddress]);

  useEffect(() => {
    setSelectedProducts((prevSelectedProducts) =>
      prevSelectedProducts.map(selectedProduct => {
        const updatedProduct = cart.find(cartProduct => cartProduct.productId === selectedProduct.productId);
        return updatedProduct ? { ...selectedProduct, quantity: updatedProduct.quantity } : selectedProduct;
      })
    );
  }, [cart, setSelectedProducts]);  
  
  const handleCheckout = () => {
    if (selectedProducts.length === 0) {
      alert("Selecione pelo menos um produto para pagar.");
      return;
    }
    router.push(`/checkout/address`);
  };

  useEffect(() => {
    if (typeof window !== "undefined"){
      if (selectedProducts.length === 0) {
        localStorage.removeItem("selectedProducts");
      }
    }
  }, [selectedProducts]);
  
  if (!cart || cart.length === 0){
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
  }

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center justify-center max-md:m-8 max-w-[1024px]">
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
              <div className="grid grid-cols-6 my-2 pr-8">
                <div className="justify-self-start col-span-3 font-semibold text-base text-slate-600 px-8">
                  PRODUTO
                </div>
                <div className="justify-self-center font-semibold text-base text-slate-600">
                  PREÇO
                </div>
                <div className="justify-self-start font-semibold text-base text-slate-600">
                  QUANTIDADE
                </div>
                <div className="justify-self-center lg:justify-self-center font-semibold text-base text-slate-600 pr-6 lg:pr-0 ">
                  TOTAL
                </div>
                <div className="justify-self-center font-semibold text-base text-slate-600  ">

                </div>
              </div>
            </div>

            <div>
              {cart &&
                cart.map((item) => (
                  <div key={item.productId} className="flex flex-col">
                    <div className="flex items-center">
                      <ItemContent item={item} />
                      <input
                        type="checkbox"
                        checked={selectedProducts.some((product) => product.productId === item.productId)}
                        onChange={() => handleSelectProduct(item)}
                        className="ml-4 w-5 h-5"
                      />
                    </div>

                  </div>
                ))}
            </div>

            <div className="flex justify-between border-solid border-[1.2px] border-pink-400 bg-pink-50 rounded-xl m-4 py-2 px-4">
              <p className="text-2xl font-semibold text-pinkSecondary">
                SUBTOTAL:
              </p>
              <p className="text-2xl font-semibold text-slate-700">
                {formatCurrency(selectedSubTotal)}
              </p>
            </div>

            <div className=" border-solid border-[1.2px] border-pink-400 bg-pink-50 rounded-xl m-4 py-2 px-4">
              <div className="flex justify-between">
                <p className="text-2xl font-bold text-pinkSecondary">Frete dos produtos selecionados</p>
                <p className="text-2xl font-bold text-slate-700">
                  {formatCurrency(  selectedProducts.length === 0 ? 0 : Number(selectedDelivery?.price) || 0)}
                </p>
              </div>
            </div>

            <div className="flex justify-between flex-auto border-solid border-[1.2px] border-pink-400 bg-pink-100 rounded-xl m-4 py-2 px-4">
              <p className="text-2xl font-bold text-pinkSecondary">TOTAL:</p>
              <p className="text-2xl font-bold text-pinkSecondary">
                {formatCurrency(selectedTotal)}
              </p>
            </div>

            <div className="flex justify-between items-center">
              <button
                className="flex flex-row items-center p-2 m-2 gap-2 underline font-medium"
                onClick={handleclearCart}
              >
                <Delete className="text-[2rem] text-red-800" />
                <p className="text-sm ">LIMPAR CARRINHO</p>
              </button>
              <Button
                custom="flex w-[30%] md:w-fit h-10 justify-self-end"
                label="SELECIONAR FORMA DE ENTREGA"
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
