"use client";
import { MdArrowBack } from "react-icons/md";
import { useCart } from "../Hooks/useCart";
import Link from "next/link";
import formatCurrency from "@/utils/utilitaryFunctions";
import { Delete } from "@mui/icons-material";

const CartClient = () => {
  const { cartProducts } = useCart();
  console.log(cartProducts);

  if (!cartProducts || cartProducts.length === 0)
    return (
      <div className="flex items-center justify-center">
        <div
          className="
          bg-[url('/assets/img/basket-retail-shopping-cart.jpg')]  
          mt-0
          rounded-2xl
          aspect-square
          bg-contain
          bg-no-repeat
          bg-center 
         bg-pink-100
          self-center flex flex-col items-center justify-between py-10"
        >
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

        <div className="flex max-md:flex-col md:flex-row  align-top gap-4 w-full m-2">
          <div className="border-solid border-[1px] border-pink-400 bg-pink-50 rounded-xl p-4 w-full">
            <div className="flex justify-center">
              <span className="text-3xl text-pinkSecondary font-semibold">
                MEUS PRODUTOS
              </span>
            </div>
            <div className="hidden md:block">
              <div className="grid grid-cols-6 my-2 px-4">
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
              </div>
            </div>

            <div className="">
              {cartProducts &&
                cartProducts.map((item) => {
                  return (
                    <div
                      key={item.productId}
                      className="relative max-md:flex max-md:flex-col md:grid md:grid-cols-6 m-4 p-2 border-solid border-[1.2px] border-pink-400 bg-pink-100 rounded-xl"
                    >
                      <div className="p-1 col-span-3 md:grid md:grid-cols-3 flex flex-row w-full">
                        <img
                          src={item.image}
                          alt="Foto do produto"
                          className="rounded-xl w-full aspect-square max-md:w-28 md:h-full md:w-full object-cover"
                        />
                        <div className="flex flex-col justify-start md:col-span-2 items-center w-full py-2">
                          <div className="px-4 w-full text-lg font-medium">
                            {item.name}
                          </div>
                          <div className="px-4 w-full text-base font-medium">
                            {item.color}
                          </div>
                          <div className="px-4 w-full text-base font-medium">
                            {item.brand}
                          </div>
                        </div>
                      </div>

                      <div className="p-2 flex justify-between md:justify-center items-center">
                        <div className=" md:hidden ">
                          <span className="text-lg font-medium">PREÇO</span>
                        </div>
                        <div>{formatCurrency(item.price)}</div>
                      </div>

                      <div className="p-2 flex justify-between md:justify-center items-center">
                        <div className="md:hidden">
                          <span className="text-lg font-medium ">
                            QUANTIDADE
                          </span>
                        </div>
                        <div>{item.quantity}</div>
                      </div>

                      <div className="p-2 flex justify-between md:justify-center items-center">
                        <div className="md:hidden">
                          <span className="text-lg font-medium ">TOTAL</span>
                        </div>
                        <div>{formatCurrency(item.price * item.quantity)}</div>
                      </div>

                      <div className="absolute right-10 max-md:top-6 sm:right-14 md:right-6 md:bottom-3 lg:right-10 xl:right-12 2xl:right-14 3xl:right-16 ">
                        <Delete className="w-full text-[1.5rem]" />
                        <p className="text-xs">REMOVER</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="border-solid border-[1px] border-pink-400 bg-pink-50 rounded-xl p-4 w-[30%] min-h-[65vh]">
            <span>bbbbbbbbbb</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CartClient;
