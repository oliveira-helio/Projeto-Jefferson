'use client'
import { useAddress } from "@/Hooks/useAddress";
import { useCart } from "@/Hooks/useCart";
import apiAdress from "@/utils/api";
import { useRouter } from "next/navigation";
import { useEffect, useCallback } from "react";

const Success = () => {
  const { handleRemoveProductFromCart, selectedProducts } = useCart();
  const router = useRouter();
  const { selectedDelivery, selectedAddress } = useAddress();

  // Função createShipment otimizada com useCallback
  const createShipment = useCallback(async () => {
    if ( typeof window !== "undefined" ) {
      const response = await fetch(`${apiAdress}/api/orders/create-shipment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "accessToken": `Bearer ${localStorage.getItem('accessToken') || ""}`
        },
        body: JSON.stringify({
          volumes: selectedDelivery?.packages.map((pack) => ({
            weight: pack.weight,
            width: pack.dimensions?.width,
            height: pack.dimensions?.height,
            length: pack.dimensions?.length
          })),
          address: selectedAddress,
          items: selectedProducts.map((product) => ({
            name: product.productId,
            quantity: product.quantity,
            unitary_value: product.price
          })),
          selectedCompany: { id: selectedDelivery?.id, name: selectedDelivery?.company?.name, type: selectedDelivery?.name }
        })
      });
      const order = await response.json();
      return order; // Retorne o ID do pedido gerado
    };
  }, [selectedAddress, selectedDelivery, selectedProducts]); // Dependências do createShipment

  useEffect(() => {
    selectedProducts.forEach((product) => {
      handleRemoveProductFromCart(product);
    });
    router.push('/');
  }, [selectedProducts, handleRemoveProductFromCart, router]);

  useEffect(() => {
    const shipment = async () => {
      await createShipment();
    };
    shipment();
  }, [createShipment]); // Chamando o useCallback aqui com a dependência correta

  return null;
}

export default Success;
