"use client";
import { useEffect } from "react";
import { Payment } from "@mercadopago/sdk-react";

interface PaymentBrickProps {
  preferenceId: string | null;
}

const PaymentBrick: React.FC<PaymentBrickProps> = ({ preferenceId }) => {
  useEffect(() => {
    if (!preferenceId) {console.log('veio sem preferenceid');
     return};
  }, [preferenceId]);

  return (
    <div className="w-full flex flex-col items-center">
      {preferenceId ? (
        <Payment 
          initialization={{ preferenceId, amount: 100 }} 
          onSubmit={(response) => {
            console.log('PaymentBricks',response);
            return Promise.resolve();
          }} 
          customization={{ paymentMethods:  {
            creditCard: "all",
            debitCard: "all",
            ticket: "all",
            bankTransfer: "all",
            mercadoPago: "all",
           
          } }} 
        />
      ) : (
        <p className="text-red-500">Erro ao carregar o pagamento</p>
      )}
    </div>
  );
};

export default PaymentBrick;
