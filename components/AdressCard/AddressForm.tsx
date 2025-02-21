import { useState } from "react";

interface AddressFormProps {
  onClose: () => void;
  onSave: (newAddress: any) => void;
}

const streetTypes = [
  "Alameda", "Avenida", "Beco", "Estrada", "Ladeira",
  "Rodovia", "Rua", "Travessa", "Trecho", "Via", "Viela"
];

const states = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO",
  "MA", "MT", "MS", "MG", "PA", "PB", "PE", "PI", "RJ",
  "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

const AddressForm: React.FC<AddressFormProps> = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    streetType: "",
    street: "",
    number: "",
    cep: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    isMainAddress: false, // Definido como null inicialmente
  });

  const [isWithoutNumber, setIsWithoutNumber] = useState(false);


  const capitalizeWords = (text: string) => {
    return text
      .toLowerCase()
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }; 

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

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeCheckBox = () => {
    setIsWithoutNumber(!isWithoutNumber);
    setFormData((prev) => ({
      ...prev,
      number: !isWithoutNumber ? "s/n" : "",
    }));
  };

  const handleMainAddressCheckBox = () => {
    setFormData((prev) => ({
      ...prev,
      isMainAddress: prev.isMainAddress ? false : true,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { streetType, ...formattedAddress } = {
      ...formData,
      street: `${formData.streetType} ${formData.street}`.trim(),
    };
    onSave(formattedAddress);
    onClose();
  };

  return (
    <div className="relative inset-0 z-20 overflow-visible flex justify-center items-center bg-black bg-opacity-50">
      <div className="fixed p-6 rounded-lg shadow-lg w-96 bg-pink-200 z-50">
        <h2 className="text-xl font-bold mb-4">Novo Endereço</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="flex gap-2">
            <select
              name="streetType"
              value={formData.streetType}
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
              value={formData.street}
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
              value={formData.number}
              onChange={handleChange}
              className={`border p-2 rounded-md ${isWithoutNumber ? 'opacity-100': ""}`}
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
            value={formData.cep}
            onChange={handleChange}
            className="border p-2 rounded-md"
          />
          <input
            type="text"
            name="complement"
            placeholder="Complemento (opcional)"
            value={formData.complement}
            onChange={handleChange}
            className="border p-2 rounded-md"
          />
          <input
            type="text"
            name="neighborhood"
            placeholder="Bairro"
            value={formData.neighborhood}
            onChange={handleChange}
            className="border p-2 rounded-md"
            required
          />
          <input
            type="text"
            name="city"
            placeholder="Cidade"
            value={formData.city}
            onChange={handleChange}
            className="border p-2 rounded-md"
            required
          />
          <select
            name="state"
            value={formData.state}
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
              checked={formData.isMainAddress === true}
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

export default AddressForm;
