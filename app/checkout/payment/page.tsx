'use client'
import { useEffect, useState, useRef } from "react";
import { useCart } from "@/Hooks/useCart";
import { initMercadoPago, Payment } from "@mercadopago/sdk-react";
import apiAdress from "@/utils/api";
import { v4 as uuidv4 } from 'uuid';
import { useAddress } from "@/Hooks/useAddress";
import { useRouter } from "next/navigation";
import { stat } from "fs";

declare global {
  interface Window {
    paymentBrickController?: { unmount: () => void };
  }
}

interface orderData {
  externalOrderId: string;
  paymentType: string;
  status: string;
  total: number;
  installments?: number;
  liquidAmount?: number;
  installment_amount?: number;
  fees?: {type?: string, amount?: number, fee_payer?: string}[];
}


const Checkout = () => {
  const router = useRouter();
  const { selectedProducts } = useCart();
  const { selectedDelivery, selectedAddress } = useAddress();
  const [cartTotal, setCartTotal] = useState(0);
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const hasRequestedPayment = useRef(false);
  const idempotencyKey = uuidv4()
  const [orderId, setOrderId] = useState<number | null>(null);
  const [payer, setPayer] = useState<{} | null>(null);
  const items = selectedProducts.map((product) => ({
    id: product.productId,
    title: product.name,
    description: product.subCategory,
    picture_url: product.image,
    quantity: product.quantity,
    currency_id: "BRL",
    unit_price: Number(product.price),
    deliveryFee: product.deliveryFee
  }));


  // create order
  const createOrder = async () => {
    const response = await fetch(`${apiAdress}/api/orders/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "accessToken": `Bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify({
        totalPrice: cartTotal,
        items: selectedProducts.map((product) => ({
          productId: product.productId,
          quantity: product.quantity,
          price: product.price
        }))
      })
    });
    const order = await response.json();
    console.log('order:', order);
    return order.id; // Retorne o ID do pedido gerado
  };

  //fetch orderId
  useEffect(() => {
    const fetchOrderId = async () => {
      if(cartTotal === 0) return;
      const id = await createOrder();
      setOrderId(id);
    };
    fetchOrderId();
  }, [cartTotal]);

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

  //fetchPayer
  useEffect(() => {
    const fetchPayer = async () => {
      const data = await getPayer();
      console.log('await payer', data.payer);
      setPayer(data.payer);
    };
    fetchPayer();
  }, []);


  const updateOrder = async (orderData: orderData, orderId: number | null) => {
    try {
      await fetch(`${apiAdress}/api/orders/update-order`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "accessToken": `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({ orderData, orderId })
      });
    } catch (error) {
      console.error(error)
    }
  };

  // cart total
  useEffect(() => {
    if (selectedProducts.length === 0) return;

    const subTotal = selectedProducts.reduce((total, product) => total + product.price * product.quantity, 0);
    const deliveryFee = Number(selectedDelivery?.price) || 0;
    const total = subTotal + deliveryFee;

    setCartTotal(total);
  }, [selectedProducts, selectedDelivery]);

  // cria preferenceId
  useEffect(() => {
    if (selectedProducts.length === 0 || cartTotal === 0 || hasRequestedPayment.current) return;

    hasRequestedPayment.current = true;
    initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY!, { locale: "pt-BR" });

    const createPaymentPreference = async () => {
      if (selectedProducts.length === 0) return;

      try {
        const response = await fetch(
          `${apiAdress}/api/payments/create-preference`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              'accessToken': `Bearer ${localStorage.getItem('accessToken')}` || '',
              "X-Idempotency-Key": idempotencyKey,
            },
            body: JSON.stringify({ items, orderId, payer }),
          }
        );
        const data = await response.json();
        console.log('preferenceId:', data.preferenceId);
        console.log('data do preferenceId:', data);


        setPreferenceId(data.preferenceId);
        
      } catch (error) {
        console.error("Erro ao criar pagamento:", error);
      }
    };

    createPaymentPreference();
  }, [cartTotal, selectedProducts]);

  // desmonta janela?
  useEffect(() => {
    return () => {
      if (window.paymentBrickController) {
        window.paymentBrickController.unmount();
      }
    };
  }, []);

  const initialization = {
    amount: Number(cartTotal.toFixed(2)),
    preferenceId: preferenceId || undefined
  };

  const customization = {
    paymentMethods: {
      bankTransfer: "all" as const,
      creditCard: "all" as const,
      debitCard: "all" as const,
      ticket: "all" as const,
      maxInstallments: 6
    },
  };

  const onSubmit = async (formData: any) => {
  
    return new Promise((resolve, reject) => {
      fetch(`${apiAdress}/api/payments/process-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formData,
          orderId,
          items,
          payer,
          idempotencyKey,
          address: {
            zip_code: selectedAddress?.cep,
            street_name: selectedAddress?.street,
            street_number: selectedAddress?.number == 's/n' ? 's/n' : Number(selectedAddress!.number),
          }
        }),
      })
        .then((response) => response.json())
        .then(async (response) => {

          resolve(response);

          const orderData: orderData ={
            externalOrderId: response.id,
            paymentType: response.payment_type_id,
            status: response.status,
            total: response.transaction_amount,
            ...(response.installments && { installments: response.installments }),
            ...(response.transaction_details.net_received_amount && {liquidAmount: response.transaction_details.net_received_amount}),
            ...(response.transaction_details.installment_amount && {installmentAmount: response.transaction_details.installment_amount}),
            ...(response.fee_details && {fees: response.fee_details}),
          }
          
          await updateOrder(orderData, orderId);
          updateOrder(response, orderId);
          localStorage.setItem('paymentId', JSON.stringify(response.id));
          window.paymentBrickController?.unmount()
        })
        .then(() => router.push('/checkout/status'))
        .catch((error) => {
          console.error('error:', error);
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
    <div className="relative w-full h-full">
      <Payment
        initialization={initialization}
        customization={customization}
        onSubmit={onSubmit}
        onReady={onReady}
        onError={onError}
      />
    </div>
  );
};

export default Checkout;





