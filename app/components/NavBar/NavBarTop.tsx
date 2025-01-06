"use client";
import Link from "next/link";
import { LocalMallRounded } from "@mui/icons-material";
import { useCart } from "@/app/Hooks/useCart";
import UserMenu from "./UserMenu";

const NavBarTop = () => {
  const { cartTotalQty } = useCart();

  return (
    <div className="flex flex-row items-center justify-between p-0 max-h-28 w-full">
      <div className=" p-0 m-0">
        <Link href={"/"}>
          <img
            className="h-24 w-auto"
            src="/assets/img/Logo1.png"
            alt="Logo da loja"
          />
        </Link>
      </div>

      <div className="md:w-2/5 hidden md:block ">
        <form
          action=""
          className="flex flex-row flex-nowrap w-full justify-center"
        >
          <input
            type="text"
            placeholder="Buscar produtos..."
            required
            className="flex-1 px-4 py-2 rounded-l-3xl focus:outline-none text-black w-max"
          />
          <button
            className="flex-grow-[0.12] p-2 bg-pinkSecondary text-black cursor-pointer rounded-r-3xl"
            type="submit"
          >
            enviar
          </button>
        </form>
      </div>

      <div className="flex flex-row h-full gap-1 items-center md:mr-2 xl:mr-0">
        <div className="cartDiv h-full relative">
          <a href="/carrinho" className="h-full">
            <button className="cart-btn">
              <div
                id="cartItemCounter"
                className={`absolute right-px top-0.5 box-border rounded-full text-white bg-black w-4 text-xs z-10 ${
                  cartTotalQty === 0 ? "hidden" : ""
                }`}
              >
                {cartTotalQty}
              </div>
              <div 
                className="
                text-pinkSecondary 
                  text-4xl
                  md:text-[2.25rem] 
                  p-2 
                  border-[1px] 
                  border-pinkSecondary 
                  flex 
                  flex-row 
                  items-center 
                  gap-1 
                  rounded-3xl 
                  cursor-pointer
                  hover:shadow-md
                  transition"
              >
                <LocalMallRounded fontSize='inherit' />
              </div>
            </button>
          </a>
        </div>

        <div>
          <a href="#">
            <UserMenu/>
          </a>
        </div>
      </div>
    </div>
  );
};

export default NavBarTop;
