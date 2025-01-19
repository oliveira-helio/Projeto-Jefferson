'use client'

import { useCallback, useState } from "react";
import Avatar from "../MicroComponents/Avatar";
import { AiFillCaretDown } from "react-icons/ai";
import Link from "next/link";
import UserMenuItem from "./UserMenuItens";
import BackDrop from "../MicroComponents/BackDrop";

const UserMenu = () => {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

    const toggleOpen = useCallback(()=>{
        setIsUserMenuOpen((prev) => !prev);
    },[])

    return ( 
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
            <Avatar/>
            <AiFillCaretDown/>

        </div>

        { isUserMenuOpen && (
            <div className="
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
            ">
                <div>
                    <Link href={"/"}>
                        <UserMenuItem onClick={toggleOpen}>Inicio</UserMenuItem>
                    </Link>
                    <Link href={"/orders"}>
                        <UserMenuItem onClick={toggleOpen}>Meus Pedidos</UserMenuItem>
                    </Link>
                    <Link href={"/favorites"}>
                        <UserMenuItem onClick={toggleOpen}>Meus Favoritos</UserMenuItem>
                    </Link>
                    <Link href={"/myAccount"}>
                        <UserMenuItem onClick={toggleOpen}>Minha Conta</UserMenuItem>
                    </Link>
                    {/* <UserMenuItem onClick={() => { toggleOpen(), signOut()}}>Sair</UserMenuItem> */}
                    
                </div>
                <div>
                    <Link href={"/login"}>
                        <UserMenuItem onClick={toggleOpen}>Acesse sua conta</UserMenuItem>
                    </Link>
                    <Link href={"/register"}>
                        <UserMenuItem onClick={toggleOpen}>Cadastre-se</UserMenuItem>
                    </Link>
                </div>
            </div>
        )
        }
    </div>
    {isUserMenuOpen ? <BackDrop onClick={toggleOpen} /> : null}
    </>
     );
}
 
export default UserMenu;