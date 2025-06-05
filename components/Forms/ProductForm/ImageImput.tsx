import apiAdress from '@/utils/variables/api';
import React, { useState } from "react";

interface ImageInputProps {
  onFileAdded: ( signedUrl: string, isGeneric: boolean, file?: File) => void;
  disabled?: boolean;
}

const ImageInput: React.FC<ImageInputProps> = ({ onFileAdded, disabled }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [isGeneric, setIsGeneric] = useState<boolean>(false);

  // Quando o usuário seleciona um arquivo
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (file) {
      setSelectedFile(file);
      onFileAdded( "",  isGeneric, file); // Passa isGeneric para onFileAdded
      // generateSignedUrl(file); // Gera o URL e chama onFileAdded
    }
  };

  // Alterna o estado do is_generic
  const handleIsGenericChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsGeneric(event.target.checked);
  };

  return (
    <div>
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleFileChange}
        disabled={disabled}
      />
      <label>
        <input 
          type="checkbox" 
          checked={isGeneric} 
          onChange={handleIsGenericChange}
          disabled={disabled}
        />
        É genérica?
      </label>
      {selectedFile && <p>Arquivo: {selectedFile.name}</p>}
    </div>
  );
};

export default ImageInput;
