"use client";
import { useContext, useEffect, useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { ProductContext } from "@/Contexts/ProductsContext";
import Input from "@/components/Inputs/Input";
import Button from "@/components/MicroComponents/Button";
import ProductForm from "@/components/ProductForm/ProductForm";

export default function EditProduct() {
  const { productDelete, searchProduct } = useContext(ProductContext);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<{ image_url: string; is_generic: boolean }[]>([]);
  const [searchParam, setSearchParam] = useState('');
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      brand: "",
      color: "",
      color_code: "",
      description: "",
      details: "",
      category: "",
      sub_category: "",
      product_type: "",
      bar_code: "",
      height: "",
      width: "",
      length: "",
      weight: "",
      price: "",
      stock: "",
      is_recommended: false,
    },
  });

  const handleSearchProduct = async () => {
    const bar_code = { bar_code: searchParam }
    try {
      const data = await searchProduct(bar_code);
      if (data.product) {
        console.log('product', data.product);
      }

      if (data) {
        // Populate form fields
        Object.keys(data.product).forEach((key) =>
          setValue(key as keyof FieldValues, data.product[key])
        );
        // Filter and set images
        const filteredImages = data.product.images.filter((image: { product_id: number }) => image.product_id === data.product.product_id);
        setImages(filteredImages || []);
      } else {
        toast.error("Produto não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao buscar o produto:", error);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      await productDelete({ ...data, images });
      toast.success("Produto removido com sucesso!", {
        id: "product-toast-1",
      });
    } catch (error) {
      toast.error("Erro ao remover o produto.");
      console.error("Erro ao remover o produto.", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log('dados alterados:', getValues('bar_code'));
  }
  ,[ getValues('bar_code')]);

  useEffect(() => {
    console.log('dados searchParam:', searchParam);
  }
  ,[searchParam]);

  return (
    <div className="p-6 w-full">
      <h1 className="text-2xl font-bold mb-4 self-center m-2">
        Buscar Produto
      </h1>

      <div className="flex flex-col mx-2">
        <span className="text-base font-medium text-zinc-700">
          Código de barras
        </span>
        <div className="grid grid-flow-col grid-cols-7 items-center">
          <div className="col-span-2">
            <Input
              id="searchParam"
              label=""
              disabled={isLoading}
              register={register}
              errors={errors}
              type="input"
              custom="w-full p-2 border-2 border-solid rounded-md outline-none"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setSearchParam(event.target.value) // Atualiza o estado com o valor completo
              }
            />
            {errors.name?.type && (
              <span className="text-red-500 text-sm">campo obrigatório</span>
            )}
          </div>
          <Button
            label="Buscar"
            onClick={handleSearchProduct}
            custom="p-2 bg-blue-500 text-white rounded-md "
            disabled={searchParam === '' || searchParam === null }
          />
        </div>
      </div>

      <h1 className="text-2xl font-bold mb-2 self-center m-2 mt-8">
        Produto a ser removido
      </h1>
      
      <ProductForm
        isLoading={isLoading}
        register={register}
        errors={errors}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        buttonLabel="Remover"
        initialImages={images}
        setImages={setImages}
        disabledFields={[
          "name",
          "brand",
          "color",
          "color_code",
          "description",
          "details",
          "category",
          "sub_category",
          "product_type",
          "bar_code",
          "height",
          "width",
          "length",
          "weight",
          "price",
          "stock",
          "is_recommended",
          "images",
          "remove_button"
        ]}
      />

    </div>
  );
}