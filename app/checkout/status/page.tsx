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
    if (typeof window !== "undefined") {
      const temporaryPaymentId = localStorage.getItem('paymentId');
      if (temporaryPaymentId) {
        const parsedPaymentId = JSON.parse(temporaryPaymentId);
        setPaymentId({ paymentId: parsedPaymentId });
      }
    }
  }, []);

  const onError = async (error: any) => {
    console.error('Payment Brick error', error);
  };

  const onReady = async () => {
  };

  const customization = {
    backUrls: {
      error: '<http://pincelepoesia.com/checkout/payment>',
      return: '<http://pincelepoesia.com/checkout/proceed>',
    },
    visual: {
      texts: {
          ctaGeneralErrorLabel: "Houve um erro: tentar novamente",
          ctaCardErrorLabel: "Pagamento não aprovado: tentar outro cartão",
          ctaReturnLabel: "Retornar",
      },
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





