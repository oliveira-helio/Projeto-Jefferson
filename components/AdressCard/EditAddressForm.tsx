import { useState, useEffect } from "react";
import { UserAddressType } from "@/utils/types";
import { useAddress } from "@/Hooks/useAddress";

interface EditAddressModalProps {
  address: UserAddressType;
  onClose: () => void;
  onSave: (updatedAddress: UserAddressType) => void;
}

interface EditingAddressType {
  addressId: number | undefined;
  streetType: string;
  street: string;
  number: string;
  cep: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  isMainAddress: boolean;
}

const EditAddressForm: React.FC<EditAddressModalProps> = ({
  address,
  onClose,
  onSave,
}) => {
  
  const [initialAddress, setInitialAddress] = useState<UserAddressType>(address);
  const [editedAddress, setEditedAddress] = useState<EditingAddressType>({
    addressId: undefined,
    streetType: "",
    street: "",
    number: "",
    cep: "",
    neighborhood: "",
    city: "",
    state: "",
    isMainAddress: false
  });
  const [isWithoutNumber, setIsWithoutNumber] = useState(false);
  const streetTypes = [
    "Alameda", "Avenida", "Beco", "Estrada", "Ladeira",
    "Rodovia", "Rua", "Travessa", "Trecho", "Via", "Viela"
  ];

  const states = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO",
    "MA", "MT", "MS", "MG", "PA", "PB", "PE", "PI", "RJ",
    "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
  ];

  const capitalizeWords = (text: string) => {
    return text
      .toLowerCase()
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Função para converter o endereço para o tipo EditingAddressType
  const convertToEditingAddress = (address: UserAddressType): EditingAddressType => {
    console.log('address que chegou para editar', address);
    
    
    const streetParts = address.street.split(" ");
    const streetType = streetParts.shift() || ""; // Remove a primeira palavra e armazena como streetType
    const street = streetParts.join(" "); // Junta o restante da rua

    return {
      addressId: address.addressId,
      streetType,
      street,
      number: address.number,
      cep: address.cep,
      complement: address.complement,
      neighborhood: address.neighborhood,
      city: address.city,
      state: address.state,
      isMainAddress: address.isMainAddress ?? false, // Se undefined, assume false
    };
  };

  useEffect(() => {
    // Converte o endereço quando o modal é aberto
    const convertedAddress = convertToEditingAddress(address);
    setEditedAddress(convertedAddress);
    setIsWithoutNumber(convertedAddress.number === "s/n");
  }, [address]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let { name, value } = e.target;

    if (name === "cep") {
      value = value.replace(/\D/g, "").slice(0, 8);
      if (value.length === 8) {
        value = `${value.slice(0, 5)}-${value.slice(5)}`;
      }
    }

    if (["street", "complement", "neighborhood", "city"].includes(name)) {
      value = capitalizeWords(value);
    }

    setEditedAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeCheckBox = () => {
    setIsWithoutNumber(!isWithoutNumber);
    setEditedAddress((prev) => ({
      ...prev,
      number: !isWithoutNumber ? "s/n" : "",
    }));
  };

  const handleMainAddressCheckBox = () => {
    setEditedAddress((prev) => ({
      ...prev,
      isMainAddress: prev.isMainAddress ? false : true,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedAddress);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="p-6 rounded-lg shadow-lg w-96 bg-pink-200">
        <h2 className="text-xl font-bold mb-4">Novo Endereço</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="flex gap-2">
            <select
              name="streetType"
              value={editedAddress?.streetType || ""}
              onChange={handleChange}
              className="border p-2 rounded-md"
              required
            >
              <option value="">Tipo</option>
              {streetTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="street"
              placeholder="Rua"
              value={editedAddress?.street || ""}
              onChange={handleChange}
              className="border p-2 rounded-md"
              required
            />
          </div>

          <div className="flex flex-row justify-between items-center">
            <input
              type="text"
              name="number"
              placeholder="Número"
              value={editedAddress?.number || ""}
              onChange={handleChange}
              className={`border p-2 rounded-md ${isWithoutNumber ? 'opacity-100' : ""}`}
              disabled={isWithoutNumber}
              required={!isWithoutNumber}
            />
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isWithoutNumber}
                onChange={handleChangeCheckBox}
                className="border p-2 rounded-md"
              />
              <span>Sem Número</span>
            </label>
          </div>
          <input
            type="text"
            name="cep"
            placeholder="Cep"
            value={editedAddress?.cep || ""}
            onChange={handleChange}
            className="border p-2 rounded-md"
          />
          <input
            type="text"
            name="complement"
            placeholder="Complemento (opcional)"
            value={editedAddress?.complement || ""}
            onChange={handleChange}
            className="border p-2 rounded-md"
          />
          <input
            type="text"
            name="neighborhood"
            placeholder="Bairro"
            value={editedAddress?.neighborhood || ""}
            onChange={handleChange}
            className="border p-2 rounded-md"
            required
          />
          <input
            type="text"
            name="city"
            placeholder="Cidade"
            value={editedAddress?.city || ""}
            onChange={handleChange}
            className="border p-2 rounded-md"
            required
          />
          <select
            name="state"
            value={editedAddress?.state || ""}
            onChange={handleChange}
            className="border p-2 rounded-md"
            required
          >
            <option value="">Estado</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={editedAddress?.isMainAddress === true}
              onChange={handleMainAddressCheckBox}
              className="border p-2 rounded-md"
            />
            <span>Marcar como endereço principal</span>
          </label>

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded-md"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-pink-500 text-white px-4 py-2 rounded-md"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAddressForm;
