import { useState } from "react";

interface ZipCodeFormProps {
  onZipChange: (zipCode: string) => void;
}

const ZipCodeForm: React.FC<ZipCodeFormProps> = ({ onZipChange }) => {
  const [zipCode, setZipCode] = useState<string>("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Impede o recarregamento da página
    onZipChange(zipCode);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={zipCode}
        onChange={(e) => setZipCode(e.target.value)}
        placeholder="Digite o seu CEP"
      />
      <button type="submit">OK</button>
    </form>
  );
};

export default ZipCodeForm;
