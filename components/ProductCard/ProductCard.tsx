"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/utils/interfaces";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const parcelasValor = product.price;
  const parcelas = 1; //TODO : Pegar o valor de parcelas do produto
  const router = useRouter();
  const [mainImageUrl, setMainImageUrl] = useState<string>(
    "/assets/numeros/1.jpg"
  );
  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#e65ba5",
    },
    "& .MuiRating-iconHover": {
      color: "#f91d7c",
    },
  });

  useRouter();

  useEffect(() => {
    const mainImage = product.images.find((image) => image.is_generic);

    if (mainImage) setMainImageUrl(mainImage.image_url);
  }, [product.images]);

  return (
    <div className="m-2">
      <div
        className="col-span-1
      cursor-pointer
      border-[1.2px]
      border-pink-200
      bg-pink-100
      rounded-xl
      trasition
      hover:scale-105
      text-center
      text-sm w-full p-2
      border-solid"
      >
        <div id="productCard" className="">
          <div>
            <div
              className="m-2 items-start justify-start flex flex-col gap-2 text-slate-900"
              onClick={() => {
                router.push(`/product/${product.product_id}`);
              }}
            >
              <div className="relative w-full h-full overflow-hidden aspect-square">
                <Image
                  fill
                  src={mainImageUrl}
                  className="items-center justify-center object-cover w-full h-full rounded-2xl"
                  alt={product.name}
                  // placeholder="/assets/numeros/1.jpg" // TODO  corrigir placeholder
                  // TODO : criar cores - redondo BackgroundColor
                />
              </div>
              <div className="flex flex-row gap-2">
                {product.images
                  .filter(
                    (image, index, self) =>
                      index ===
                      self.findIndex(
                        (img) => img.color_code === image.color_code
                      )
                  )
                  .map((image, idx) => (
                    <div
                      key={idx}
                      style={{ backgroundColor: image.color_code }}
                      className="rounded-full w-6 h-6 items-center justify-center hover:scale-125 cursor-pointer my-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        const selectedImg = product.images.find(
                          (img) =>
                            img.color_code === image.color_code &&
                            !img.is_generic
                        );
                        setMainImageUrl(
                          selectedImg ? selectedImg.image_url : image.image_url
                        );
                      }}
                    >
                      <a href="#"></a>
                    </div>
                  ))}
              </div>
              <hr className="w-full font-medium text-lg text-pink-200 border-[0.5px] border-solid" />

              <div>
                <p className="text-start text-lg font-medium m-0 p-0">
                  {product.brand}
                </p>
              </div>

              <div className="min-h-14 m-0 p-0">
                <h2 className="text-start font-semibold text-lg ">
                  {product.name.toUpperCase()}
                </h2>
              </div>

              <div>
                <p className="">
                  R${" "}
                  <span className="text-black font-semibold">
                    {product.price}
                  </span>
                </p>
              </div>
              <div>
                <p>
                  (ou em até {parcelas}x de R${" "}
                  <span className="text-slate-950 font-medium">
                    {parcelasValor}
                  </span>
                  )
                </p>
              </div>
              <div className="w-auto h-auto">
                <StyledRating
                  value={product.ratting}
                  readOnly
                  precision={0.5}
                  icon={<FavoriteIcon fontSize="medium" />}
                  emptyIcon={<FavoriteBorderIcon fontSize="medium" />}
                  size="large"
                  className="text-4xl"
                />
              </div>
            </div>

            <div
              className=" m-2 items-start justify-start flex flex-col gap-3"
              onClick={(e) => {
                e.stopPropagation();
                console.log("adiciona ao carrinho"); // TODO : esta botão deve adicionar ao carrinho.
              }}
            >
              <div className="justify-center w-full bg-pinkSecondary hover:bg-black hover:text-pinkSecondary text-black rounded-3xl p-2 font-medium text-lg">
                <button> VER DETALHES DO PRODUTO</button> 
                 {/* TODO: se tiver mais de uma cor ver detalhes, senão adicionar ao carrinho -precisa criar o CartProductType- */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
