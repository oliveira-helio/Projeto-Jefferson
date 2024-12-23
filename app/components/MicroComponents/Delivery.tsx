import React, { useState, useEffect } from "react";
import axios from "axios";

interface DeliveryProps {
  cep: string;
  handleCepChange: (cep: string) => void;
  handleDeliverySelection: (
    deliveryType: string,
    deliveryFee: number,
    deliveryTime: string
  ) => void;
  productWeight: number;
  productLength: number;
  productHeight: number;
  productWidth: number;
}

const Delivery: React.FC<DeliveryProps> = ({
  cep,
  handleCepChange,
  handleDeliverySelection,
  productWeight,
  productLength,
  productHeight,
  productWidth,
}) => {
  const [freteOptions, setFreteOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchFreteOptions = async (cep: string) => {
    if (!cep || cep.length < 8) return; // Verifica se o CEP é válido

    setLoading(true);

    try {
      const response = await axios.post("API_ENDPOINT_DO_MELHOR_ENVIO", {
        origem: "74255060", // Substitua com o CEP de origem
        destino: cep,
        peso: productWeight,
        comprimento: productLength,
        altura: productHeight,
        largura: productWidth,
      });

      if (response.data) {
        setFreteOptions(response.data); // Processar os dados de resposta
      }
    } catch (error) {
      console.error("Erro ao buscar opções de frete:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (cep) {
      fetchFreteOptions(cep);
    }
  }, [cep]);

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
          fetchFreteOptions(cep);
        }}
      >
        <label>
          CEP:
          <input
            type="text"
            value={cep}
            onChange={(e) => handleCepChange(e.target.value)}
            maxLength={8}
            placeholder="Digite seu CEP"
          />
        </label>
        <button type="submit">Buscar frete</button>
        <button type="button" onClick={openCorreiosPopup}>
          Não sei meu CEP
        </button>
      </form>

      {loading && <p>Carregando opções de frete...</p>}

      {freteOptions.length > 0 && (
        <div>
          <h3>Opções de frete:</h3>
          <ul>
            {freteOptions.map((option, index) => (
              <li key={index}>
                <label>
                  <input
                    type="radio"
                    name="frete"
                    onChange={() =>
                      handleDeliverySelection(
                        option.service,
                        option.price,
                        option.delivery_time
                      )
                    }
                  />
                  Tipo: {option.service} - Prazo: {option.delivery_time} dias -
                  Valor: R${option.price}
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
