'use client'
import { useEffect, useState, useRef  } from "react";
import { useCart } from "@/Hooks/useCart";
import { initMercadoPago, Payment } from "@mercadopago/sdk-react";
import apiAdress from "@/utils/api";
import { v4 as uuidv4 } from 'uuid';

declare global {
  interface Window {
    paymentBrickController?: { unmount: () => void };
  }
}

const Checkout =  () => {
  const { cart } = useCart();
  const [cartTotal, setCartTotal] = useState(0);
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const hasRequestedPayment = useRef(false);
  const idempotencyKey = uuidv4()
  const [orderId, setOrderId] = useState<number | null>(null);
  const [payer, setPayer] = useState< {} | null>(null);
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
    return order.id; // Retorne o ID do pedido gerado
  };

  useEffect(() => {
    const fetchOrderId = async () => {
      const id = await createOrder();
      setOrderId(id);
    };
    fetchOrderId();    
  }, []);

  // get payer
  const getPayer = async () => {
    const response = await fetch(`${apiAdress}/api/payments/get-payer`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "accessToken": `Bearer ${localStorage.getItem('accessToken')}`
      }
    });
    const payer = await response.json();
    return payer;
  };

  useEffect(() => {
    const fetchPayer = async () => {
      const data = await getPayer();
      console.log('await payer', data.payer);
      setPayer(data.payer);
    };
    fetchPayer();        
  }, []);


  const updateOrder = async (formData: any, orderId: number | null) => {
    try {
      await fetch(`${apiAdress}/api/orders/update-order`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "accessToken": `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({ formData, orderId })
      });
    } catch (error) {
      console.error(error)
    }
  };

  // cart total
  useEffect(() => {
    if (cart.length === 0) return;

    const subTotal = cart.reduce((total, product) => total + product.price * product.quantity, 0);
    const freteTotal = cart.reduce((total, product) => total + (product.deliveryFee || 0), 0);

    setCartTotal(subTotal + freteTotal);
  }, [cart]);
  
  // cria preferenceId
  useEffect(() => {
    if (cart.length === 0 || cartTotal === 0 || hasRequestedPayment.current) return;
    hasRequestedPayment.current = true;
    initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY!, { locale: "pt-BR" });

    const createPaymentPreference = async () => {
      if (cart.length === 0) return;      
    
      try {

        const response = await fetch(
          `${apiAdress}/api/payments/create-preference`,
          {
            method: "POST",
            headers: { 
              "Content-Type": "application/json", 
              'accessToken': `Bearer ${localStorage.getItem('accessToken')}` || '' ,
              "X-Idempotency-Key": idempotencyKey,
            },
            body: JSON.stringify({ items, orderId, payer }),
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

  // desmonta janela?
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
      creditCard: "all",
      debitCard: "all",
      ticket: "all",
      maxInstallments: 6
    },
  };

  const onSubmit = async (formData: any) => {
    console.log('esse é o formdata:', formData);
    console.log('esse é o orderId:', orderId);
    console.log('esse é o payer:', payer);
    
    await updateOrder(formData, orderId);
    
    return new Promise((resolve, reject) => {
      fetch(`${apiAdress}/api/payments/process-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({formData, orderId, items, payer}),
      })
        .then((response) => response.json())
        .then((response) => {
          // receber o resultado do pagamento
          resolve();
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





 