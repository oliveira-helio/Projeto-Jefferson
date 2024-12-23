import { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { Product } from "@/utils/interfaces";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

interface CarrosselProps {
  products: Product[];
}

const Carrossel: React.FC<CarrosselProps> = ({ products }) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(() => {
    const windowWidth = window.innerWidth;
    if (windowWidth >= 1024) return 4;
    if (windowWidth >= 768) return 3;
    return 2;
  });

  // Total de páginas
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Função para calcular os itens visíveis
  const visibleProducts = products.slice(
    pageIndex * itemsPerPage,
    (pageIndex + 1) * itemsPerPage
  );

  // Atualizar o número de itens por página ao redimensionar a tela
  useEffect(() => {
    const calculateItemsPerPage = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth >= 1024) return 4;
      if (windowWidth >= 768) return 3;
      return 2;
    };

    const handleResize = () => setItemsPerPage(calculateItemsPerPage());
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Navegação automática (intervalo de 5 segundos para girar os itens)
  useEffect(() => {
    const interval = setInterval(() => {
      setPageIndex((prevIndex) => (prevIndex + 1) % totalPages); // Vai para o próximo bloco de itens
    }, 5000); // Intervalo de 5 segundos

    return () => clearInterval(interval); // Limpa o intervalo quando o componente for desmontado
  }, [totalPages]);

  // Função para ir para a próxima página (com interação do usuário)
  const handleNext = () => {
    setPageIndex((prevIndex) => (prevIndex + 1) % totalPages);
  };

  // Função para voltar para a página anterior (com interação do usuário)
  const handlePrev = () => {
    setPageIndex((prevIndex) => (prevIndex - 1 + totalPages) % totalPages);
  };

  return (
    <div className="relative flex items-center justify-between ">
      {/* Botão para voltar */}
      <button
        onClick={handlePrev}
        className="absolute -left-5 z-30 p-2 bg-pink-400 bg-opacity-35 text-white rounded-full shadow-md transform -translate-y-1/2 top-1/2 aspect-square"
        aria-label="Mostrar produtos anteriores"
      >
        <ArrowBackIosRoundedIcon className="text-[3rem]" />
      </button>

      {/* Produtos visíveis */}
      <div
        className="relative flex transition-transform duration-500 ease-in-out w-full overflow-hidden"
        // TODO : Adicionar um efeito de transição para a animação de rotação
      >
        {visibleProducts.map((product) => (
          <div
            key={product.product_id}
            className="flex-shrink-0 py-6"
            style={{
              flexBasis: `${100 / itemsPerPage}%`,
            }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Botão para avançar */}
      <button
        onClick={handleNext}
        className="absolute -right-5 z-30 p-2 bg-pink-400 bg-opacity-35 text-white rounded-full shadow-md transform -translate-y-1/2 top-1/2 aspect-square"
        aria-label="Mostrar próximos produtos"
      >
        <ArrowForwardIosRoundedIcon className="text-[3rem]" />
      </button>
    </div>
  );
};

export default Carrossel;
