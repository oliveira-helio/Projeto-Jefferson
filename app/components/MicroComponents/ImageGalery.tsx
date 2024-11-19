import React from "react";
import Carousel from "./Carroussel";

interface Image {
  product_id: number;
  color: string;
  color_code: string;
  image_url: string;
  bar_code: number;
}

interface ImageGalleryProps {
  images: Image[];
  productName: string;
  selectedImageIndex: number;
  onItemSelect: (index: number) => void; // Nova prop
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  productName,
  selectedImageIndex,
  onItemSelect,
}) => {
  return (
    <div className="flex flex-col w-full">
      {/* Container para a galeria e a imagem principal */}
      <div className="grid max-md:grid-flow-row max-md:grid-rows-4 md:grid-cols-4 md:grid-flow-col gap-2 w-full">
        {/* Galeria de imagens */}
        <div className="max-md:row-span-1 md:col-span-1">
          <Carousel
            images={images}
            productName={productName}
            selectedImageIndex={selectedImageIndex}
            onItemSelect={onItemSelect} // Passando a função para o Carousel
          />
        </div>

        {/* Imagem principal */}
        <div className="max-md:row-span-3 md:col-span-3">
          <div
            id="Main__Image"
            className="relative w-full h-full md:aspect-[3/4]"
          >
            <img
              src={
                images[selectedImageIndex]?.image_url ||
                "/assets/placeholder.jpg"
              }
              alt={`Imagem principal de ${productName}`}
              className="object-cover h-full"
            />
          </div>
        </div>
      </div>

      {/* Indicador separado */}
      <div className="flex justify-center mt-4 gap-1">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`w-2 h-2 rounded-full ${
              idx === selectedImageIndex ? "bg-pink-500" : "bg-gray-300"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
