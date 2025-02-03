"use client";
import { useContext, useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { ProductContext } from "@/Contexts/ProductsContext";
import ProductForm from "@/components/ProductForm/ProductForm"; 

export default function CreateProduct() {
  const { productRegister } = useContext(ProductContext);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<{ image_url: string; is_generic: boolean }[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      details: "",
      brand: "",
      color: "",
      color_code: "",
      category: "",
      sub_category: "",
      product_type: "",
      price: null,
      is_recommended: false,
      is_new_product: true,
      bar_code: "",
      stock: null,
      height: null,
      width: null,
      length: null,
      weight: null,
      images: []
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      await productRegister({ ...data, images });
      console.log('data',data);
      
      toast.success("Produto cadastrado com sucesso!", {
        id: "product-toast-1",
      });
    } catch (error) {
      toast.error("Erro ao cadastrar o produto.");
      console.error("Erro ao cadastrar o produto.", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 w-full">
      <h1 className="text-2xl font-bold mb-4 self-center m-2">
        Cadastrar Produto
      </h1>
      <ProductForm
        isLoading={isLoading}
        register={register}
        errors={errors}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        buttonLabel="Cadastrar"
        initialImages={images}
        setImages={setImages}
      />
    </div>
  );
}