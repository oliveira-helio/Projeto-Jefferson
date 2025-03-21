"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { MdCheckCircle } from "react-icons/md";
import { Product, ProductDetailsProps } from "@/utils/interfaces";
import apiAdress from '@/utils/api';
import { CartProductType, SelectedColorType } from "@/utils/types";
import ColorSelector from "../MicroComponents/ColorSelector";
import QuantitySelector from "../MicroComponents/QuantitySelector";
import Button from "../MicroComponents/Button";
import ImageGallery from "../MicroComponents/ImageGalery";
import StyledRattingHeart from "../MicroComponents/StyledRattingHeart";
import { useCart } from "@/Hooks/useCart";
import { formatCurrency } from "@/utils/utilitaryFunctions";
import Delivery from "../MicroComponents/Delivery";
import axios from "axios";
import { useAddress } from "@/Hooks/useAddress";
import toast from "react-hot-toast";

const ProductDetails: React.FC<ProductDetailsProps> = () => {
  const { handleAddProductToCart, cart } = useCart();
  const productId = useParams()!.productId as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const { selectedAddress } = useAddress();
  const [zipCode, setZipCode] = useState<string>(selectedAddress?.cep || "");
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    productId: Number(productId),
    name: "",
    brand: "",
    color: "",
    colorCode: "",
    subCategory: "",
    productType: "",
    price: 0,
    barCode: 0,
    image: "",
    quantity: 0,
    deliveryFee: 0,
    deliveryCep: selectedAddress?.cep,
    deliveryType: null,
    deliveryTime: null,
  });
  const [selectedColor, setSelectedColor] = useState<SelectedColorType | null>(
    null
  );

  const handleColorSelect = (color: SelectedColorType) => {
    setSelectedColor(color);
    const selectedIndex = product?.images.findIndex(
      // Find the index of the image corresponding to the selected color
      (img) => img.color_code === color.colorCode
    );
    if (selectedIndex !== undefined && selectedIndex !== -1) {
      handleItemSelect(selectedIndex); // Updates the main image and selected index
    }
  };

  const handleAddToCartClick = () => {
    cartProduct.deliveryType
      ? handleAddProductToCart(cartProduct)
      : toast.error("Selecione uma modalidade de entrega");
  };

  const handleItemSelect = (index: number) => {
    const image = product?.images[index];
    if (image) {
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

  const handleQtyIncrease = () => {
    setCartProduct((prev) => ({
      ...prev,
      quantity: Math.min(prev.quantity + 1, 99),
    }));
  };

  const handleQtyDecrease = () => {
    setCartProduct((prev) => ({
      ...prev,
      quantity: Math.max(prev.quantity - 1, 1),
    }));
  };

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await axios.get(`${apiAdress}/product`, {
          params: { productId }, // Usa o productId diretamente
        });
        if (response.status !== 200)
          throw new Error("Erro ao carregar o produto.");
        const data = response.data;
        if (data && data.product) {
          setProduct(data.product as Product);
        } else {
          throw new Error("Produto não encontrado.");
        }
        const selectedProduct = data.product.images.find(
          (img: { product_id: number }) => img.product_id === Number(productId)
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

  useEffect(() => {
    if (selectedColor && product) {
      setCartProduct((prev) => {
        const newCartProduct = {
          productId: selectedColor.productId,
          name: product.name,
          brand: product.brand,
          color: selectedColor.color,
          colorCode: selectedColor.colorCode,
          subCategory: product.sub_category,
          productType: product.product_type,
          price: product.price,
          barCode: selectedColor.barCode,
          image: selectedColor.imageUrl,
          quantity: prev.quantity || 1,
          deliveryFee: 0,
          deliveryCep: "",
          deliveryType: "",
          deliveryTime: "",
        };
        if (
          prev.productId !== selectedColor.productId ||
          prev.colorCode !== selectedColor.colorCode ||
          prev.quantity !== prev.quantity
        ) {
          return newCartProduct;
        }
        return prev;
      });
    }
  }, [product, selectedColor]);

  useEffect(() => {
    if (product && product.images.length > 0) {
      const currentProduct = product.images.find(
        (img) => img.product_id === Number(productId)
      );
  
      if (currentProduct) {
        setSelectedColor({
          productId: currentProduct.product_id,
          color: currentProduct.color,
          colorCode: currentProduct.color_code,
          imageUrl: currentProduct.image_url,
          barCode: currentProduct.bar_code,
        });
        setSelectedImageIndex(product.images.indexOf(currentProduct));
      }
    }
  }, [product, productId]);
  

  useEffect(() => {
    console.log("produto atual", cartProduct);
  }, [cartProduct]);

  useEffect(() => {
    console.log("Carrinho", cart);
  }, [cart]);

  useEffect(() => {
    if (selectedAddress?.cep) {
      setZipCode(selectedAddress.cep);
    }
  }, [selectedAddress]);

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

  const sortedImages = [...product.images].sort((a, b) => {
    return a.is_generic === b.is_generic ? 0 : a.is_generic ? -1 : 1;
  });

  return (
    <>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {/* IMAGES SECTION */}
          <div className="flex flex-row w-full gap-2">
            {/* IMAGE GALERY */}
            <ImageGallery
              images={sortedImages}
              productName={product.name}
              selectedImageIndex={selectedImageIndex}
              onItemSelect={handleItemSelect}
            />
          </div>

          {/* PRODUCT DATA SECTION */}
          <div className="flex flex-col gap-3 w-full">
            <div className=" text-2xl text-pink-700 font-semibold ">
              {product.name} {product.brand} {cartProduct.color || product.color}
            </div>
            <div className=" ">
               {product.description} {/* TODO remover o Loren ipsun */} Lorem ipsum dolor sit amet consectetur 
              adipisicing elit. Animi ab molestias rem unde facere voluptates,
              porro amet veniam recusandae nulla error dolore provident ad
              dolores illo perferendis voluptatum.
            </div>
            <StyledRattingHeart product={product} />
            <div id="Color__Selector">
              <ColorSelector
                colors={uniqueColors}
                selectedColor={selectedColor}
                onColorSelect={handleColorSelect}
              />
            </div>
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
            <div>
              <QuantitySelector
                cartProduct={cartProduct}
                handleQtyIncrease={handleQtyIncrease}
                handleQtyDecrease={handleQtyDecrease}
              />
            </div>
            <>
              {cart?.some(
                (item) =>
                  item.productId === cartProduct.productId &&
                  item.colorCode === cartProduct.colorCode
              ) ? (
                <p className="text-slate-600 flex items-center">
                  <MdCheckCircle className="text-teal-500" size={18} />
                  <span> Produto adicionado ao carrinho</span>
                </p>
              ) : (
                ""
              )}
            </>
            <div>
              <Button
                label="ADICIONAR À SACOLA"
                onClick={handleAddToCartClick}
                custom="flex-grow-[0.12] p-2"
              />
            </div>

            {/* CEP CONSULTOR */}
            <Delivery
              cep={zipCode}
              handleCepChange={(cep) => setZipCode(cep)}
              handleDeliverySelection={(
                deliveryType,
                deliveryFee,
                deliveryTime
              ) =>
                setCartProduct((prev) => ({
                  ...prev,
                  deliveryType,
                  deliveryFee,
                  deliveryCep: zipCode,
                  deliveryTime,
                }))
              }
              productWeight={product.weight}
              productLength={product.length}
              productHeight={product.height}
              productWidth={product.width}
              productId={product.product_id}
              productPrice={product.price}
            />
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
            {product.details}
            {/* TODO remover o Loren ipsun */}
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
          <p>Avaliaçoes: {product.ratting_qt}</p>{/* TODO  criar um novo banco de dados para armazenar os produtos vendidos, qtd vendida, data e ratings (ou um banco separado para ratings e so pode avaliar quem já comprou)*/}{" "}
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
