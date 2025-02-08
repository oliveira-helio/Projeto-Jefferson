import { useState } from "react";
import { UserAddressType } from "@/utils/types";
import EditAddressForm from "./EditAddressForm";

interface AddressCardProps {
  address: UserAddressType;
  index: number;
  selected: boolean;
  onSelect: () => void;
  onUpdate: (updatedAddress: UserAddressType) => void;
}

const AddressCard: React.FC<AddressCardProps> = ({
  address,
  index,
  selected,
  onSelect,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (updatedAddress: UserAddressType) => {
    onUpdate(updatedAddress);
    setIsEditing(false);
  };

  return (
    <div
      className="
        flex 
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
      <input
        type="radio"
        id={`address-${address.addressId}`}
        name="address"
        value={address.addressId}
        checked={selected}
        onChange={onSelect}
      />
      <label
        htmlFor={`address-${address.addressId}`}
        className="cursor-pointer w-full px-2"
      >
        <div className="flex justify-between">
          <span className="text-xl font-semibold p-1">Endereço {index + 1}</span>
          <button onClick={() => setIsEditing(true)} className="font-medium">
            Editar
          </button>
        </div>
        <div className="text-lg font-medium">
          <p className="text-base font-medium px-1">
            Endereço: {address.street}, {address.number} 
          </p>
          <p className="text-base font-medium px-1">
            Complemento: {address.complement} - CEP: {address.cep}
          </p>
          <p className="text-base font-medium px-1">
            {address.neighborhood}, {address.city} - {address.state}
          </p>
        </div>
      </label>

      {isEditing && (
        <EditAddressForm
          address={address}
          onClose={() => setIsEditing(false)}
          onSave={handleEdit}
        />
      )}
    </div>
  );
};

export default AddressCard;
