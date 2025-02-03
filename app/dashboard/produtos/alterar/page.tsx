"use client";
import { useContext, useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { ProductContext } from "@/Contexts/ProductsContext";
import Input from "@/components/Inputs/Input";
import Button from "@/components/MicroComponents/Button";
import ProductForm from "@/components/ProductForm/ProductForm";

export default function EditProduct() {
  const { productEdit, searchProduct } = useContext(ProductContext);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<{ image_url: string; is_generic: boolean }[]>([]);
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
    const { bar_code } = getValues();
    try {
      const data = await searchProduct({ bar_code });
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
      await productEdit({ ...data, images });
      toast.success("Produto alterado com sucesso!", {
        id: "product-toast-1",
      });
    } catch (error) {
      toast.error("Erro ao alterar o produto.");
      console.error("Erro ao alterar o produto.", error);
    } finally {
      setIsLoading(false);
    }
  };

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
              id="bar_code"
              label=""
              disabled={isLoading}
              register={register}
              errors={errors}
              type="input"
              custom="w-full p-2 border-2 border-solid rounded-md outline-none"
            />
            {errors.name?.type && (
              <span className="text-red-500 text-sm">campo obrigatório</span>
            )}
          </div>
          <Button
            label="Buscar"
            onClick={handleSearchProduct}
            custom="p-2 bg-blue-500 text-white rounded-md "
          />
        </div>
      </div>

      <h1 className="text-2xl font-bold mb-2 self-center m-2 mt-8">
        Alterar Produto
      </h1>
      
      <ProductForm
        isLoading={isLoading}
        register={register}
        errors={errors}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        buttonLabel="Atualizar"
        initialImages={images}
        setImages={setImages}
      />

    </div>
  );
}