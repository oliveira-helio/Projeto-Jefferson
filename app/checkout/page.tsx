'use client'
import { useEffect, useState } from "react";
import { useCart } from "../../Hooks/useCart";
import { initMercadoPago, Payment } from "@mercadopago/sdk-react";
import apiAdress from "@/utils/api";

declare global {
  interface Window {
    paymentBrickController?: { unmount: () => void };
  }
}

const Checkout =  () => {
  const { cart } = useCart();
  const [cartTotal, setCartTotal] = useState(0);
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const items = cart.map((product) => ({
    id: product.productId,
    title: product.name,
    description: product.subCategory,
    picture_url: product.image,
    quantity: product.quantity,
    currency_id: "BRL",
    unit_price: Number(product.price),
    deliveryFee: product.deliveryFee
  }));

  useEffect(() => {
    initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY!, { locale: "pt-BR" });
  }, []);


  useEffect(() => {
    if (cart.length === 0) return;

    const subTotal = cart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );

    const freteTotal = cart.reduce(
      (total, product) => total + (product.deliveryFee || 0),
      0
    );

    setCartTotal(subTotal + freteTotal );
  }, [cart]);
  
  useEffect(() => {
    if (cartTotal === 0) return;

    const createOrder = async () => {
      const response = await fetch(`${apiAdress}/api/orders/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "accessToken": `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({
          totalPrice: cartTotal,
          items: cart.map((product) => ({
            productId: product.productId,
            quantity: product.quantity,
            price: product.price
          }))
        })
      });
      const order = await response.json();
      return order.Id; // Retorne o ID do pedido gerado
    };

    const createPaymentPreference = async () => {
      if (cart.length === 0) return;      

      const orderId = await createOrder();
    
      try {
        const response = await fetch(
          `${apiAdress}/api/payments/create-preference`,
          {
            method: "POST",
            headers: { 
              "Content-Type": "application/json", 
              'accessToken': `Bearer ${localStorage.getItem('accessToken')}` || '' 
            },
            body: JSON.stringify({ items, orderId }),
          }
        );
        const data = await response.json();
        setPreferenceId(data.preferenceId);
      } catch (error) {
        console.error("Erro ao criar pagamento:", error);
      }
    };

    createPaymentPreference();
  }, [cart]);

  useEffect(() => {
    return () => {
      if (window.paymentBrickController) {
        window.paymentBrickController.unmount();
      }
    };
  }, []);

  const initialization = {
    amount: cartTotal,
    preferenceId: preferenceId || undefined
  };

  const customization = {
    paymentMethods: {
      bankTransfer: "all",
      wallet_purchase: "all",
      creditCard: "all",
      debitCard: "all",
      ticket: "all",
      maxInstallments: 6
    },
  };

  const onSubmit = async (formData: any) => {
    
    return new Promise((resolve, reject) => {
      fetch(`${apiAdress}/api/payments/process_payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((response) => {
          // receber o resultado do pagamento
          resolve(response);
        })
        .catch((error) => {
          // lidar com a resposta de erro ao tentar criar o pagamento
          reject();
        });
    });
  };

  const onError = async (error: any) => {
    // callback chamado para todos os casos de erro do Brick
    console.error('Payment Brick error', error);
  };

  const onReady = async () => {
    /*
      Callback chamado quando o Brick estiver pronto.
      Aqui você pode ocultar loadings do seu site, por exemplo.
    */
      console.log('Payment Brick ready');
  };

  if (!preferenceId) return <p>Carregando pagamento...</p>;

  return (
    <Payment
      initialization={initialization}
      customization={customization}
      onSubmit={onSubmit}
      onReady={onReady}
      onError={onError}
    />
  );
};

export default Checkout;





 