import React, { useState } from "react";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import Image from "next/image";

interface Image {
  product_id: number;
  color: string;
  color_code: string;
  image_url: string;
  bar_code: number;
}

interface CarouselProps {
  images: Image[];
  productName: string;
  selectedImageIndex: number;
  onItemSelect: (index: number) => void;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  productName,
  selectedImageIndex,
  onItemSelect,
}) => {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = isMobile ? 1 : 3;

  const handleNext = () => {
    if (startIndex + visibleCount < images.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <div className="relative h-full w-full">
      {/* Galeria de Imagens */}
      <div
        className={`flex ${
          isMobile ? "flex-row overflow-x-auto w-full p-4" : "flex-col h-full"
        } gap-2`}
      >
        {images
          .slice(startIndex, startIndex + visibleCount)
          .map((image, idx) => (
            <div
              key={idx}
              onClick={() => onItemSelect(startIndex + idx)} // Chama a função para atualizar os estados
              className={`cursor-pointer rounded-md overflow-hidden p-1 ${
                selectedImageIndex === startIndex + idx
                  ? "border-solid border-pink-500 scale-105"
                  : "border-none"
              }`}
            >
              <Image
                src={image.image_url}
                alt={`Imagem ${startIndex + idx + 1} de ${productName}`}
                className="object-cover w-full h-full aspect-square"
              />
            </div>
          ))}
      </div>

      {/* Botões de Navegação (apenas para desktop) */}
      {!isMobile && (
        <div className="flex justify-center align-center">
          <button
            disabled={startIndex === 0}
            className={`absolute top-1  p-2  rounded-full transform -translate-y-1/2 w-10 h-10 items-centers  ${
              startIndex === 0
                ? "cursor-default opacity-95 bg-opacity-90 bg-pink-100 text-slate-500"
                : "cursor-pointer bg-pink-200 text-slate-800"
            }`}
            onClick={handlePrev}
          >
            <ExpandLessRoundedIcon className="text-2xl" />
          </button>
          <button
            className={`absolute  p-2  rounded-full transform -translate-y-1/2 w-10 h-10 items-centers ${
              startIndex + visibleCount >= images.length
                ? "cursor-default opacity-95 bg-opacity-90 bg-pink-100 text-slate-500"
                : "cursor-pointer bg-pink-200"
            }`}
            onClick={handleNext}
            disabled={startIndex + visibleCount >= images.length}
          >
            <ExpandMoreRoundedIcon className="text-2xl" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Carousel;
