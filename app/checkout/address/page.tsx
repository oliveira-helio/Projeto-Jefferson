"use client";
import AddressCard from "@/components/AdressCard/AddressCard";
import { useAddress } from "@/Hooks/useAddress";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AddressForm from "@/components/AdressCard/AddressForm";
import { useCart } from "@/Hooks/useCart";
import ItemContentCheckout from "@/app/carrinho/ItemContentCheckout";

const Checkout = () => {
  const {
    userAddresses,
    selectedAddress,
    handleSelectAddress,
    handleAddAddress,
    handleUpdateAddress,
  } = useAddress();
  const { cart, selectedProducts } = useCart();
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);

  console.log('selectedProducts:', selectedProducts);


  const handleProceedToPayment = () => {
    if (!selectedAddress) {
      alert("Por favor, selecione um endereço de entrega.");
      return;
    }
    router.push(`/checkout/payment`);
  };

  const handleSaveAddress = (newAddress: any) => {
    console.log("Novo endereço salvo:", newAddress);
    handleAddAddress(newAddress);
    // fetchUserAddresses();
    setShowForm(false);
  };

  useEffect(() => {
    console.log("selectedAddress:", selectedAddress);
  }, [selectedAddress]);

  return (
    <div className="flex flex-col md:flex-row p-4 gap-4">
      
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

        {showForm && (
          <AddressForm
            onClose={() => setShowForm(false)}
            onSave={handleSaveAddress}
          />
        )}
      </div>
      <div className="p-4 flex-auto max-w-[50%]">
        <div className="flex flex-col h-full">
          <span className="text-2xl font-bold flex justify-center">Resumo dos itens selecionados</span>
          <hr className="border-solid border-[1px] border-pink-400 my-4" />

          <div className=" border-solid border-1 border-blue-400 p-4 rounded-3xl bg-pink-100 flex flex-col gap-4 h-full">
            <div className="flex justify-between p-2 items-center">
              <span className="text-xl font-semibold ">Itens selecionados:</span>
              <span className="text-lg font-medium">
                {selectedProducts.length}
              </span>


            </div>
            <div className="p-2">
              
              {selectedProducts.map((item) => (
                <div key={item.productId} className="flex flex-col">
                  <div className="flex items-center">
                    <ItemContentCheckout item={item} />
                  </div>
                  
                  <hr className=" border-solid border-0 border-t-[1px] w-full border-pink-400 " />
                </div>
                
              ))}
            </div>
          </div>

          <div className="flex flex-row gap-4">
              <button
                onClick={() => router.push(`/carrinho`)}
                className="bg-pink-500 text-white py-2 px-4 mt-4 rounded-lg w-[20%]"
                >
                Alterar
              </button>
                </div>
        </div>
      </div>


    </div>
  );
};

export default Checkout;
