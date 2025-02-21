"use client";
import AddressCard from "@/components/AdressCard/AddressCard";
import { useAddress } from "@/Hooks/useAddress";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AddressForm from "@/components/AdressCard/AddressForm";
import DeliveryContentCheckout from "@/components/Checkout/DeliveryOptions";

const Checkout = () => {
  const {
    userAddresses,
    selectedAddress,
    selectedDelivery,
    handleSelectAddress,
    handleAddAddress,
    handleUpdateAddress,
    handleSelectDeliveryType
  } = useAddress();
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const { deliveryOptions } = useAddress();

  const handleProceedToPayment = () => {
    if (!selectedAddress) {
      alert("Por favor, selecione um endereço de entrega.");
      return;
    }
    router.push(`/checkout/resume`);
  };

  const handleSaveAddress = (newAddress: any) => {
    console.log("Novo endereço salvo:", newAddress);
    handleAddAddress(newAddress);
    setShowForm(false);
  };

  return (
    <div className="relative flex flex-col md:flex-row p-4 gap-4">
      <div className="p-4 w-fit flex-auto">
        <span className="text-2xl font-bold flex justify-center">Selecione um endereço de entrega</span>
        <hr className="border-solid border-[1px] border-pink-400 my-4" />
        {userAddresses?.map((address, index) => (
          <AddressCard
            key={address.addressId}
            address={address}
            index={index}
            selected={selectedAddress === address}
            onSelect={() => handleSelectAddress(address)}
            onUpdate={handleUpdateAddress}
          />
        ))}
        <div className="flex flex-row gap-4">
          <button
            onClick={handleProceedToPayment}
            className="bg-pink-500 text-white py-2 px-4 mt-4 rounded-lg"
          >
            Prosseguir para o Pagamento
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="bg-pink-400 text-white py-2 px-4 mt-4 rounded-lg"
          >
            Cadastrar novo endereço
          </button>
        </div>
      </div>
      <div className="p-4 flex-auto max-w-[50%]">
        <div className="flex flex-col h-full">
          <span className="text-2xl font-bold flex justify-center">Selecione a forma de entrega</span>
          <hr className="border-solid border-[1px] border-pink-400 mt-4 mb-2" />
          <div className=" rounded-3xl flex flex-col h-full">
            {deliveryOptions?.map((deliveryOption, index) => (
              !deliveryOption.error ?
                <div key={deliveryOption.id} className="flex flex-col">
                  <div className="flex items-center">
                    <DeliveryContentCheckout
                      delivery={deliveryOption}
                      index={index}
                      selected={selectedDelivery?.name === deliveryOption.name}
                      onSelect={() => handleSelectDeliveryType(deliveryOption)} />
                  </div>
                </div> : null
            ))}
          </div>
        </div>
      </div>
      {showForm && (
        <div className="flex fixed z-50">
          <AddressForm
            onClose={() => setShowForm(false)}
            onSave={handleSaveAddress}
          />
        </div>
      )}
    </div>
  );
};

export default Checkout;
