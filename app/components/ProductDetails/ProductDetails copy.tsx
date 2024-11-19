"use client";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Product, ProductDetailsProps } from "@/utils/interfaces";
import apiAdress from "@/utils/api";
import ZipCodeForm from "../MicroComponents/ZipCodeForm";
import { CartProductType, SelectedColorType } from "@/utils/types";
import ColorSelector from "../MicroComponents/ColorSelector";
import QuantitySelector from "../MicroComponents/QuantitySelector";
import Button from "../MicroComponents/ButtomAddToCart";
import ImageGallery from "../MicroComponents/ImageGalery";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#e65ba5",
  },
  "& .MuiRating-iconHover": {
    color: "#f91d7c",
  },
});

const ProductDetails: React.FC<ProductDetailsProps> = () => {
  const productId = useParams().productId as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [mainImageUrl, setMainImageUrl] = useState<string>(
    "/assets/numeros/1.jpg"
  );
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    productId: 0, // product.product_id,
    name: "", // product.name,
    brand: "", // product.brand,
    color: "", // SelectedColor.color,
    colorCode: "", // SelectedColor.colorCode,
    subCategory: "", // product.sub_category,
    productType: "", // product.product_type,
    price: 0, // product.price,
    barCode: 0, // SelectedColor.barCode,
    image: "", // SelectedColor.imageUrl,
    quantity: 0,
  });
  console.log("cartProduct inicial", cartProduct);

  const [zipCode, setZipCode] = useState<string>("");
  const [SelectedColor, setSelectedColor] = useState<SelectedColorType | null>(
    null
  );
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  const handleQtyIncrease = useCallback(() => {
    if (cartProduct.quantity === 99) return;
    setCartProduct((prev) => ({
      ...prev,
      quantity: prev.quantity + 1,
    }));
  }, [cartProduct]);

  const handleQtyDecrease = useCallback(() => {
    if (cartProduct.quantity === 1) return;
    setCartProduct((prev) => ({
      ...prev,
      quantity: prev.quantity - 1,
    }));
  }, [cartProduct]);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await fetch(`${apiAdress}/product/${productId}`);
        if (!response.ok) throw new Error("Erro ao carregar o produto.");
        const data = await response.json();

        if (data && data.product) {
          setProduct(data.product as Product);
        } else {
          throw new Error("Produto não encontrado.");
        }

        const genericImage = data.product.images.find(
          (image: { is_generic: boolean }) => image.is_generic
        );

        setMainImageUrl(
          genericImage ? genericImage.image_url : "/assets.numeros/1.jpg"
        );

        const selectedProduct = data.product.images.find(
          (img: { product_id: number; is_generic: boolean }) =>
            img.product_id === Number(productId) && !img.is_generic
        );

        if (selectedProduct) {
          setSelectedColor({
            productId: selectedProduct.product_id,
            color: selectedProduct.color,
            colorCode: selectedProduct.color_code,
            imageUrl: selectedProduct.image_url,
            barCode: selectedProduct.bar_code,
          });
        }
      } catch (error) {
        console.error("Erro ao carregar produto:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  // console.log("productaqui", product);

  useEffect(() => {
    if (SelectedColor && product) {
      setCartProduct((prev) => {
        const newCartProduct = {
          productId: SelectedColor.productId,
          name: product.name,
          brand: product.brand,
          color: SelectedColor.color,
          colorCode: SelectedColor.colorCode,
          subCategory: product.sub_category,
          productType: product.product_type,
          price: product.price,
          barCode: SelectedColor.barCode,
          image: SelectedColor.imageUrl,
          quantity: prev.quantity || 1,
        };

        if (JSON.stringify(prev) !== JSON.stringify(newCartProduct)) {
          return newCartProduct;
        }
        return prev;
      });
    }
  }, [product, SelectedColor]);

  useEffect(() => {
    console.log(cartProduct);
  }, [cartProduct]);

  const handleZipChange = (newZipCode: string) => {
    setZipCode(newZipCode);
    // TODO  Buscar dados de frete
  };

  const handleColorSelect = (color: SelectedColorType) => {
    setSelectedColor(color);
    setMainImageUrl(color.imageUrl);

    // Localizar o índice da imagem correspondente à cor selecionada
    const selectedIndex = product?.images.findIndex(
      (img) => img.color_code === color.colorCode
    );

    if (selectedIndex !== undefined && selectedIndex >= 0) {
      handleItemSelect(selectedIndex); // Atualiza imagem principal e índice selecionado
    }
  };

  const handleItemSelect = (index: number) => {
    const image = product?.images[index];
    if (image) {
      setMainImageUrl(image.image_url);
      setSelectedColor({
        productId: image.product_id,
        color: image.color,
        colorCode: image.color_code,
        imageUrl: image.image_url,
        barCode: image.bar_code,
      });
      setSelectedImageIndex(index);
    }
  };

  if (loading) {
    return <div>Carregando produto...</div>; // Exibe um estado de carregamento
  }

  if (!product) {
    return <div>Produto não encontrado</div>; // Caso o produto não seja encontrado
  }

  const uniqueColors = Array.from(
    new Set(product.images.map((img) => img.color_code))
  )
    .map((colorCode) =>
      product.images.find((img) => img.color_code === colorCode)
    )
    .filter((image) => image !== undefined) as Array<{
    product_id: number;
    color: string;
    color_code: string;
    image_url: string;
    bar_code: number;
  }>;

  return (
    <>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {/* IMAGES SECTION */}
          <div className="flex flex-row w-full gap-2">
            {/* IMAGE GALERY */}
            <ImageGallery
              images={product.images}
              productName={product.name}
              selectedImageIndex={selectedImageIndex}
              onItemSelect={handleItemSelect}
            />
          </div>

          {/* PRODUCT DATA SECTION */}
          <div className="flex flex-col gap-3 w-full">
            {/* NAME */}
            <div className=" text-2xl text-pink-700 font-semibold ">
              {product.name} aki só para ocupar mais espaço
            </div>

            {/* DESCRIPTION */}
            <div className=" ">
              {product.description} Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Animi ab molestias rem unde facere voluptates,
              porro amet veniam recusandae nulla error dolore provident ad
              dolores illo perferendis voluptatum.
            </div>

            {/* RATTINGS */}
            <div id="Rattings">
              <StyledRating
                value={product.ratting}
                readOnly
                precision={0.5}
                icon={<FavoriteIcon fontSize="medium" />}
                emptyIcon={<FavoriteBorderIcon fontSize="medium" />}
                size="large"
                className="text-4xl"
                onFocus={() => alert(`avaliações: ${product.ratting}`)} // TODO  Ligar o onfocus
              />
            </div>

            {/* COLOR SECTION // TODO : criar cores - redondo BackgroundColor */}
            <div id="Color__Selector">
              <ColorSelector
                colors={uniqueColors}
                selectedColor={SelectedColor}
                onColorSelect={handleColorSelect}
              />
            </div>

            {/* PRICE */}
            <div className=" ">
              <p>
                R${" "}
                <span className="text-lg text-slate-900 font-medium">
                  {formatCurrency(product.price)}
                </span>
              </p>
              <p>
                ou em até{" "}
                <span className="text-lg text-slate-900 font-medium">3</span>x
                de RS{" "}
                <span className="text-lg text-slate-900 font-medium">
                  {formatCurrency(product.price / 3)}
                </span>
              </p>
            </div>

            {/* QUANTIDADE */}
            <div>
              <QuantitySelector
                cartProduct={cartProduct}
                handleQtyIncrease={handleQtyIncrease}
                handleQtyDecrease={handleQtyDecrease}
              />
            </div>

            {/* BOTÃO SACOLA */}
            <div>
              <Button
                label="ADICIONAR À SACOLA"
                onClick={() => {}}
                className="flex-grow-[0.12] p-2"
                // TODO : implementar o botão de sacola após criar o carrinho
              />
            </div>

            {/* CEP CONSULTOR */}
            <div>
              <ZipCodeForm onZipChange={handleZipChange} />
              <a
                href="https://buscacepinter.correios.com.br/app/endereco/index.php?t"
                className="text-sm text-slate-600"
                target="_blank"
                rel="noopener"
              >
                Não sei meu CEP
              </a>
            </div>

            {/* FRETE VALUE // TODO FRETE VALUE */}
            <div></div>
          </div>
        </div>
      </section>

      <hr className="w-full my-2 bg-pink-400 h-px border-0" />

      {/* DETAILS SECTION */}
      <section>
        <div>
          <h1 className="text-2xl font font-semibold text-pink-700 my-2">
            DESCRIÇÃO
          </h1>
          {/* DESCRIPTION FULL */}
          <p className="text-sm text-slate-700 font-medium my-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
            adipisci nihil veritatis quo eos a labore magni odio quis laboriosam
            vel expedita, explicabo cumque! Ipsam eos explicabo rerum enim unde,
            sunt blanditiis eius placeat reprehenderit ad fugit repellendus
            labore culpa inventore corrupti vero tenetur excepturi suscipit
            accusantium praesentium quod voluptas. Similique ab ipsa,
            dignissimos non delectus quia, vitae magni dicta, quasi maxime quis.
            Minima quos minus sit cum eligendi quae iste accusantium, et
            deserunt vitae aliquam rerum eaque laboriosam fuga dolorum maiores
            eveniet atque ratione quidem architecto. Dignissimos vel deserunt,
            dolores officiis molestiae temporibus cumque voluptatibus est
            necessitatibus recusandae eveniet, delectus sapiente veniam.
            Possimus accusamus eveniet nobis laborum qui natus porro aperiam,
            aspernatur optio quasi, voluptatibus rem blanditiis voluptate
            adipisci, cumque quaerat dolorem magnam quas ipsam esse debitis
            provident vero officiis. Dolores vitae harum vero eligendi? Et
            ratione itaque eaque saepe voluptas ex incidunt laudantium magni,
            nisi labore amet architecto quibusdam quisquam. Incidunt magni cum
            animi beatae nihil ullam. Similique nostrum vitae aut. Quod
            accusantium, reprehenderit eius impedit provident aut pariatur
            maxime facere odit quis placeat magnam dolorem ad hic. Nemo aut,
            eaque sit provident, quibusdam magnam reiciendis exercitationem
            explicabo iure consectetur repudiandae tenetur fuga est sed!
          </p>
          {/* RATTINGS QT & RESUME(ADD LATER MAYBE) */}
          <p>Avaliaçoes: {product.ratting_qt}</p>
          {/* TODO  criar um novo banco de dados para armazenar os produtos vendidos, qtd vendida, data e ratings (ou um banco separado para ratings e so pode avaliar quem já comprou)*/}{" "}
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
