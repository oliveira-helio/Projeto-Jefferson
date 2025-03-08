'use client'
import { useAddress } from "@/Hooks/useAddress";
import { useCart } from "@/Hooks/useCart";
import apiAdress from "@/utils/api";
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";

const success = () => {
  const { handleRemoveProductFromCart, selectedProducts } = useCart();
  const router = useRouter();
  const { selectedDelivery, selectedAddress } = useAddress();

  console.log('selectedDelivery:', selectedDelivery);
  console.log('selectedAddress:', selectedAddress);
  console.log('selectedProducts:', selectedProducts);



  // create delivery
  const createShipment = async () => {
    const response = await fetch(`${apiAdress}/api/orders/create-shipment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "accessToken": `Bearer ${localStorage.getItem('accessToken')}`
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
        selectedCompany: {id: selectedDelivery?.id, name: selectedDelivery?.company?.name, type: selectedDelivery?.name}
      })
    });
    const order = await response.json();
    console.log('order:', order);
    return order; // Retorne o ID do pedido gerado
  };

  // useEffect(() => {
  // selectedProducts.map((product)=> {
  //     handleRemoveProductFromCart(product)
  //     console.log('passou pelo remove')
  //     }
  // )
  // router.push('/');
  // },[selectedProducts])
  useEffect(() => {
    const shipment = async () => {
      await createShipment();
    };
    const data = shipment();
    console.log('data:', data);

  }, [selectedProducts, selectedAddress, selectedDelivery]);


  return (null);
}

export default success;