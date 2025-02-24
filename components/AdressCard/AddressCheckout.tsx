import { useAddress } from "@/Hooks/useAddress";
import { UserAddressType } from "@/utils/types";



const AddressCheckoutCard = () => {
  const { selectedAddress, selectedDelivery } = useAddress();

  return (
    <>
      {selectedAddress && (

        <div
          className="
            flex 
            flex-col
            items-center
            gap-2 
            my-2 
            border-solid 
            border-pink-500 
            border-2 
            rounded-3xl
            py-2
            px-4
            w-full
          "
        >
          <div className="flex justify-between">
            <span className="text-xl font-semibold p-1">Seus produtos serão entregues em: </span>
          </div>
          <div className="text-lg font-medium">
            <p className="text-base font-medium px-1">
              Endereço: {selectedAddress.street}, {selectedAddress.number}, 
              Complemento: {selectedAddress.complement} - CEP: {selectedAddress.cep} {selectedAddress.neighborhood} 
            </p>
            <p className="text-base font-medium px-1">{selectedAddress.city} - {selectedAddress.state} em até {selectedDelivery?.custom_delivery_time} dias úteis</p>
          </div>
        </div>
      )}</>
  );
};

export default AddressCheckoutCard;
