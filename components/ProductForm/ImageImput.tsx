import apiAdress from '@/utils/api';
import React, { useState } from "react";

interface ImageInputProps {
  onFileAdded: ( signedUrl: string, isGeneric: boolean, file?: File) => void;
}

const ImageInput: React.FC<ImageInputProps> = ({ onFileAdded }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [isGeneric, setIsGeneric] = useState<boolean>(false);

  // Função para gerar o URL pré-assinado
  // const generateSignedUrl = async (file: File) => {
  //   try {
  //     const response = await fetch(`${apiAdress}/generate-presigned-url`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ fileName: file.name, fileType: file.type }),
  //     });

  //     if (!response.ok) throw new Error("Erro ao gerar URL pré-assinado");

  //     const data = await response.json();
  //     setSignedUrl(data.url);
  //     onFileAdded(file, "",  isGeneric); // Passa isGeneric para onFileAdded
  //   } catch (error) {
  //     console.error("Erro ao gerar URL:", error);
  //   }
  // };

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
      <input type="file" accept="image/*" onChange={handleFileChange}/>
      <label>
        <input type="checkbox" checked={isGeneric} onChange={handleIsGenericChange} />
        É genérica?
      </label>
      {selectedFile && <p>Arquivo: {selectedFile.name}</p>}
    </div>
  );
};

export default ImageInput;
