"use client";

import { useCallback, useState, useContext } from "react";
import Avatar from "../../MicroComponents/Avatar";
import { AiFillCaretDown } from "react-icons/ai";
import Link from "next/link";
import UserMenuItem from "./UserMenuItens";
import BackDrop from "../../MicroComponents/BackDrop";
import { AuthContext } from "@/Contexts/AuthContext";
import { useCart } from "@/Hooks/useCart";
import { LocalMallRounded } from "@mui/icons-material";

const UserMenu = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { isAuthenticated, isAdmin } = useContext(AuthContext);
  const { cartTotalQty } = useCart();

  const toggleOpen = useCallback(() => {
    setIsUserMenuOpen((prev) => !prev);
  }, []);

  return (
    <div className="flex flex-row h-full gap-1 items-center md:mr-2 xl:mr-0">
      <div className=" h-full relative">
        <a href="/carrinho" className="h-full">
          <button className="">
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
              <LocalMallRounded fontSize="inherit" />
            </div>
          </button>
        </a>
      </div>
      <>
        <div className="relative z-30">
          <div
            onClick={toggleOpen}
            className="
            text-pinkSecondary 
            md:text-[2.5rem] 
            p-2 
            border-[1px] 
            border-pinkSecondary 
            flex 
            flex-row 
            items-center 
            gap-1 
            rounded-full 
            cursor-pointer
            hover:shadow-md
            transition"
          >
            <Avatar />
            <AiFillCaretDown />
          </div>

          {isUserMenuOpen && (
            <div
              className="
                absolute 
                rounded-md 
                shadow-md 
                w-[170px] 
                bg-pink-100 
                overflow-hidden 
                right-0 
                top-12
                text-sm
                flex
                flex-col
                cursor-pointer
            "
            >
              {isAuthenticated ? (
                <div>
                  <Link href={"/"}>
                    <UserMenuItem onClick={toggleOpen}>Inicio</UserMenuItem>
                  </Link>
                  <Link href={"/orders"}>
                    <UserMenuItem onClick={toggleOpen}>
                      Meus Pedidos
                    </UserMenuItem>
                  </Link>
                  <Link href={"/favorites"}>
                    <UserMenuItem onClick={toggleOpen}>
                      Meus Favoritos
                    </UserMenuItem>
                  </Link>
                  <Link href={"/myAccount"}>
                    <UserMenuItem onClick={toggleOpen}>
                      Minha Conta
                    </UserMenuItem>
                  </Link>
                  {isAdmin ? (
                    <Link href={"/dashboard"}>
                      <UserMenuItem onClick={toggleOpen}>
                        Dashboard
                      </UserMenuItem>
                    </Link>
                  ) : null}
                  <Link href={"/logout"}>
                    <UserMenuItem onClick={toggleOpen}>Sair</UserMenuItem>
                  </Link>
                </div>
              ) : (
                <div>
                  <Link href={"/login"}>
                    <UserMenuItem onClick={toggleOpen}>
                      Acesse sua conta
                    </UserMenuItem>
                  </Link>
                  <Link href={"/register"}>
                    <UserMenuItem onClick={toggleOpen}>
                      Cadastre-se
                    </UserMenuItem>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
        {isUserMenuOpen ? <BackDrop onClick={toggleOpen} /> : null}
      </>
    </div>
  );
};

export default UserMenu;
