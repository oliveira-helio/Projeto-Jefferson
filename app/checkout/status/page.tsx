'use client'
import { useEffect, useState } from "react";
import { StatusScreen } from "@mercadopago/sdk-react";
import { IStatusScreenBrickInitialization } from "@mercadopago/sdk-react/esm/bricks/statusScreen/types";

const Checkout = () => {
  const [paymentId, setPaymentId] = useState<IStatusScreenBrickInitialization>({
    paymentId: ''
  });
  const initialization = paymentId
  
  
  useEffect(() => {
  const temporaryPaymentId = localStorage.getItem('paymentId');
  if (temporaryPaymentId) {
    setPaymentId({paymentId: JSON.parse(temporaryPaymentId)});
    console.log('paymentId aqui',paymentId);
  }
  
}, []);

  const onError = async (error: any) => {
    console.error('Payment Brick error', error);
  };

  const onReady = async () => {
    console.log('Status Brick ready');
    console.log('initialization', initialization);

  };

  const customization = {
    backUrls: {
      // error: '<http://localhost:3000/checkout/error>',
      // return: '<http://localhost:3000/>',
    },
   };

  if (!paymentId) return <p>Carregando pagamento...</p>;

  return (
    <div className={`p-4`}>
      <StatusScreen
        initialization={initialization}
        onReady={onReady}
        onError={onError}
        customization={customization}
      />
    </div>
  );
};

export default Checkout;





