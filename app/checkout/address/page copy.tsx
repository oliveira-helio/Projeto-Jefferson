  "use client";
  import AddressCard from "@/components/AdressCard/AddressCard";
  import { useAddress } from "@/Hooks/useAddress";
  import { useRouter } from "next/navigation";
  import { useState } from "react";
  import { UserAddressType } from "@/utils/types";
  import AddressForm from "@/components/AdressCard/AddressForm";

  const Checkout = () => {
    const { userAddresses, selectedAddress, handleSelectAddress, handleAddAddress, handleUpdateAddress } = useAddress();
    const router = useRouter();
    const [showForm, setShowForm] = useState(false);
    const [editingAddress, setEditingAddress] = useState<UserAddressType | null>(null);

    const handleProceedToPayment = () => {
      if (!selectedAddress) {
        alert("Por favor, selecione um endereço de entrega.");
        return;
      }
      router.push(`/checkout/payment`);
    };

    const handleEditAddress = (address: UserAddressType) => {
      handleUpdateAddress(address);
      setShowForm(true);
    };

    const handleSaveAddress = (newAddress: any) => {
      console.log("Novo endereço salvo:", newAddress);
      handleAddAddress(newAddress)
      // fetchUserAddresses();
      setShowForm(false);
    };



    return (
      <div className="p-4 w-fit">
        <h2 className="text-2xl font-bold">Selecione um endereço de entrega</h2>
        {userAddresses?.map((address, index) => (
          <AddressCard
            key={address.addressId}
            address={address}
            index={index}
            selected={selectedAddress === address}
            onSelect={() => handleSelectAddress(address)}
            onUpdate={() => handleEditAddress(address)}
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
            onClick={() => { setEditingAddress(null); setShowForm(true); }}
            className="bg-pink-400 text-white py-2 px-4 mt-4 rounded-lg"
          >
            Cadastrar novo endereço
          </button>
        </div>

        {showForm && (
          <AddressForm 
            onClose={() => setShowForm(false)} 
            onSave={(address) => {
              if (editingAddress) {
                handleUpdateAddress(address); // Atualiza o endereço existente
              } else {
                handleAddAddress(address); // Adiciona um novo endereço
              }
              setShowForm(false);
              setEditingAddress(null);
            }}
            initialData={editingAddress} // Passa os dados se for edição 
          />
        )}
      </div>
    );
  };


  export default Checkout;