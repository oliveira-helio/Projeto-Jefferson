'use client'
import { useCart } from "@/Hooks/useCart";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const success = () => {
    const { handleRemoveProductFromCart, selectedProducts } = useCart();
    const router = useRouter();

    useEffect(() => {
    selectedProducts.map((product)=> {
        handleRemoveProductFromCart(product)
        console.log('passou pelo remove')
        }
    )
    router.push('/');
    },[selectedProducts])

    return ( null );
}
 
export default success;