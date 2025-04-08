import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import apiAdress from '@/utils/api';
import Image from "next/image";
import SearchSharpIcon from '@mui/icons-material/SearchSharp';

interface DeliveryProps {
  cep: string;
  handleCepChange: (cep: string) => void;
  handleDeliverySelection: (
    deliveryType: string,
    deliveryFee: number,
    deliveryTime: string
  ) => void;
  productId: string  | number;
  productWeight: number;
  productLength: number;
  productHeight: number;
  productWidth: number;
  productPrice: number;

}

const Delivery: React.FC<DeliveryProps> = ({
  cep,
  handleCepChange,
  handleDeliverySelection,
  productWeight,
  productLength,
  productHeight,
  productWidth,
  productId,
  productPrice
}) => {
  const [deliveryOptions, setDeliveryOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchDeliveryOptions = useCallback(async (cep: string) => {
    if (!cep || cep.length < 8) return; // Verifica se o CEP é válido

    setLoading(true);

    try {
      const response = await axios.post(`${apiAdress}/calculate-unitary-shipping`, {
        id: productId,
        destiny: cep,
        weight: productWeight,
        length: productLength,
        height: productHeight,
        width: productWidth,
        price: productPrice,
      },
      { withCredentials: true });

      const data = JSON.stringify(response.data.products);

      console.log('response.data', response.data);
      
      if (response.data) {
        setDeliveryOptions(response.data); // Processar os dados de resposta
      }
    } catch (error) {
      console.error("Erro ao buscar opções de frete:", error);
    } finally {
      setLoading(false);
    }
  }, [productId, productWeight, productLength, productHeight, productWidth, productPrice]); // Dependências


  useEffect(() => {
    if (cep) {
      fetchDeliveryOptions(cep);
    }
  }, [cep, fetchDeliveryOptions]);

  const openCorreiosPopup = () => {
    window.open(
      "https://buscacepinter.correios.com.br/app/endereco/index.php?t",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchDeliveryOptions(cep);
        }}
      >
        <div className="flex flex-col w-fit">
          <div className="flex gap-2 my-1">
            <span className="text-lg font-medium">Calcule o frete: </span>
            <button type="button" onClick={openCorreiosPopup} className="text-xs">Não sei meu CEP</button>
          </div>
          <div className="flex flex-row">
            <label >
              <input
                type="text"
                value={cep}
                onChange={(e) => handleCepChange(e.target.value)}
                maxLength={8}
                placeholder="  Digite seu CEP"
                className="border border-solid rounded-l-md border-pink-400"
              />
            </label>
            <button type="submit" className="border-solic border-px border-pink-400">
              <SearchSharpIcon/>
            </button>
          </div>
        </div>
          
      </form>
      <button type="button" onClick={openCorreiosPopup}/>


      {loading && <p>Carregando opções de frete...</p>}

      {deliveryOptions.length > 0 && (
        <div>
          <h3 className="text-lg font-medium my-2">Opções de frete:</h3>
          <ul className="flex flex-col gap-4">
            {deliveryOptions.map((option, index) => (
              !option.name || !option.price || !option.delivery_time  || (option.company.id !== 1 && option.company.id !== 2) ?
                null
              :
                <li key={index}>
                  <label>
                    <div className="w-full relative flex flex-row gap-4 justify-around">
                      <div className=" w-full relative flex flex-row justify-start items-center gap-2 justify-items-start">
                        <div className="w-1/4">
                          <Image
                            src={option.company.picture}
                            width={500}
                            height={500}
                            alt="Picture of the delivery company"
                            className="contain"
                          />
                        </div>
                      <p className="text-lg font-medium"><span className="text-lg font-semibold">Tipo:</span> {option.name} - <span className="text-lg font-semibold">Prazo:</span> {option.delivery_time} dias - <span className="text-lg font-semibold">Valor:</span> R${option.price}</p>
                    </div>
                  </div>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Delivery;
