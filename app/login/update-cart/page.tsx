'use client'
import { useCart } from "@/Hooks/useCart";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const UpdatedCart = () => {
  const { syncLocalCartToBackend } = useCart();
  const router = useRouter();
  const hasSynced = useRef(false); // <- Ref para rastrear se já sincronizou

  useEffect(() => {
    if (!hasSynced.current) {
      syncLocalCartToBackend();
      hasSynced.current = true; // <- Marca que já foi sincronizado
      router.push('/');
    }
  }, []);

  return null;
};

export default UpdatedCart;
