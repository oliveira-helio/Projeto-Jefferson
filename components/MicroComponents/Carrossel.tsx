import { ReactNode, useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { Product } from "@/utils/interfaces";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

interface CarrosselProps {
  products: Product[];
  children: ReactNode;
}

const Carrossel: React.FC<CarrosselProps> = ({ products }) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(() => {
    const windowWidth = window.innerWidth;
    if (windowWidth >= 1024) return 4;
    if (windowWidth >= 768) return 3;
    return 2;
  });

  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Atualizar o número de itens por página ao redimensionar a tela
  useEffect(() => {
    const calculateItemsPerPage = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth >= 1300) return 5;
      if (windowWidth >= 1024) return 4;
      if (windowWidth >= 768) return 3;
      return 2;
    };

    const handleResize = () => setItemsPerPage(calculateItemsPerPage());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Navegação automática (a cada 5 segundos)
  useEffect(() => {
    const interval = setInterval(() => {
      setPageIndex((prevIndex) => (prevIndex + 1) % totalPages);
    }, 5000);
    return () => clearInterval(interval);
  }, [totalPages]);

  const handleNext = () => {
    setPageIndex((prevIndex) => (prevIndex + 1) % totalPages);
  };

  const handlePrev = () => {
    setPageIndex((prevIndex) => (prevIndex - 1 + totalPages) % totalPages);
  };

  return (
    <div className="relative flex items-center justify-between px-4 w-full">
      {/* Botão para voltar */}
      <button
        onClick={handlePrev}
        className="absolute -left-4 max-md:ml-4 z-30 p-2 bg-pink-400 bg-opacity-35 text-white rounded-full shadow-md transform -translate-y-1/2 top-1/2 aspect-square"
        aria-label="Mostrar produtos anteriores"
      >
        <ArrowBackIosRoundedIcon className="text-[3rem]" />
      </button>

      {/* Container com overflow hidden */}
      <div className="overflow-hidden w-full">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          // A largura do container é: (número total de produtos * (100 / itemsPerPage))%
          style={{
            width: `100%`,
            transform: `translateX(-${pageIndex * 100}%)`,
          }}
        >
          {products.map((product) => (
            <div
              key={product.product_id}
              className="flex-shrink-0 py-6"
              style={{
                // Cada produto ocupa 100 / itemsPerPage % da área visível
                width: `${100 / itemsPerPage}%`,
              }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* Botão para avançar */}
      <button
        onClick={handleNext}
        className="absolute -right-4 max-md:mr-4 z-30 p-2 bg-pink-400 bg-opacity-35 text-white rounded-full shadow-md transform -translate-y-1/2 top-1/2 aspect-square"
        aria-label="Mostrar próximos produtos"
      >
        <ArrowForwardIosRoundedIcon className="text-[3rem]" />
      </button>
    </div>
  );
};

export default Carrossel;
