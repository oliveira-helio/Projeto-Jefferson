"use client";
import { useContext, useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { ProductContext } from "@/Contexts/ProductsContext";
import Input from "@/components/Inputs/Input";
import TextArea from "@/components/Inputs/TextArea";
import Button from "@/components/MicroComponents/Button";

export default function EditProduct() {
  const { productEdit, searchProduct } = useContext(ProductContext);
  const [isLoading, setIsLoading] = useState(false);
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
      if(data.product){

        console.log('product', data.product);
      }
      
      if (data) {
        // Populate form fields
        Object.keys(data.product).forEach((key) =>
          setValue(key as keyof FieldValues, data.product[key])
        );
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
      await productEdit(data);
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

      <div className="grid grid-flow-row grid-cols-4 gap-0">
        <div className="flex flex-col m-2">
          <span className="text-base font-medium text-zinc-700">Nome</span>
          <div>
            <Input
              id="name"
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
        </div>

        <div className="flex flex-col m-2">
          <span className="text-base font-medium text-zinc-700">Marca</span>
          <Input
            id="brand"
            label=""
            disabled={isLoading}
            register={register}
            errors={errors}
            type="text"
            custom="w-full p-2 border-2 border-solid rounded-md outline-none"
          />
          {errors.name?.type && (
            <span className="text-red-500 text-sm">campo obrigatório</span>
          )}
        </div>

        <div className="flex flex-col m-2">
          <span className="text-base font-medium text-zinc-700">Cor</span>
          <Input
            id="color"
            label=""
            disabled={isLoading}
            register={register}
            errors={errors}
            type="text"
            custom="w-full p-2 border-2 border-solid rounded-md outline-none"
          />
          {errors.name?.type && (
            <span className="text-red-500 text-sm">campo obrigatório</span>
          )}
        </div>

        <div className="flex flex-col m-2">
          <span className="text-base font-medium text-zinc-700">
            Código da cor
          </span>
          <Input
            id="color_code"
            label=""
            disabled={isLoading}
            register={register}
            errors={errors}
            type="text"
            custom="w-full p-2 border-2 border-solid rounded-md outline-none"
          />
          {errors.name?.type && (
            <span className="text-red-500 text-sm">campo obrigatório</span>
          )}
        </div>

        <div className="flex flex-col mx-2 col-span-2 my-1">
          <span className="text-base font-medium text-zinc-700">Descrição</span>
          <TextArea
            id="description"
            label=""
            disabled={isLoading}
            register={register}
            errors={errors}
            custom="w-full p-2 border-2 border-solid rounded-md outline-none min-h-[100px] resize-none"
          />
          {errors.name?.type && (
            <span className="text-red-500 text-sm">campo obrigatório</span>
          )}
        </div>

        <div className="flex flex-col mx-2 col-span-2 my-1">
          <span className="text-base font-medium text-zinc-700">Detalhes</span>
          <TextArea
            id="details"
            label=""
            disabled={isLoading}
            register={register}
            errors={errors}
            custom="w-full p-2 border-2 border-solid rounded-md outline-none min-h-[100px] resize-none"
          />
          {errors.name?.type && (
            <span className="text-red-500 text-sm">campo obrigatório</span>
          )}
        </div>

        <div className="flex flex-col m-2">
          <span className="text-base font-medium text-zinc-700">Categoria</span>
          <Input
            id="category"
            label=""
            disabled={isLoading}
            register={register}
            errors={errors}
            type="text"
            custom="w-full p-2 border-2 border-solid rounded-md outline-none"
          />
          {errors.name?.type && (
            <span className="text-red-500 text-sm">campo obrigatório</span>
          )}
        </div>

        <div className="flex flex-col m-2">
          <span className="text-base font-medium text-zinc-700">
            Subcategoria
          </span>
          <Input
            id="sub_category"
            label=""
            disabled={isLoading}
            register={register}
            errors={errors}
            type="text"
            custom="w-full p-2 border-2 border-solid rounded-md outline-none"
          />
          {errors.name?.type && (
            <span className="text-red-500 text-sm">campo obrigatório</span>
          )}
        </div>

        <div className="flex flex-col m-2">
          <span className="text-base font-medium text-zinc-700">
            Tipo de produto
          </span>
          <Input
            id="product_type"
            label=""
            disabled={isLoading}
            register={register}
            errors={errors}
            type="Text"
            custom="w-full p-2 border-2 border-solid rounded-md outline-none"
          />
          {errors.name?.type && (
            <span className="text-red-500 text-sm">campo obrigatório</span>
          )}
        </div>

        <div className="flex flex-col m-2">
          <span className="text-base font-medium text-zinc-700">Código de barras</span>
          <Input
            id="bar_code"
            label=""
            disabled={isLoading}
            register={register}
            errors={errors}
            type="number"
            min={0}
            custom="w-full p-2 border-2 border-solid rounded-md outline-none"
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              if (value < 0) {
                toast.error("O preço não pode ser negativa.");
              }
            }}
          />
          {errors.name?.type && (
            <span className="text-red-500 text-sm">campo obrigatório</span>
          )}
        </div>

        <div className="flex flex-col m-2">
          <span className="text-base font-medium text-zinc-700">Altura em cm</span>
          <Input
            id="height"
            label=""
            disabled={isLoading}
            register={register}
            errors={errors}
            type="number"
            min={0}
            custom="w-full p-2 border-2 border-solid rounded-md outline-none"
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              if (value < 0) {
                toast.error("A altura não pode ser negativa.");
              }
            }}
          />

          {errors.name?.type && (
            <span className="text-red-500 text-sm">campo obrigatório</span>
          )}
        </div>

        <div className="flex flex-col m-2">
          <span className="text-base font-medium text-zinc-700">Largura em cm</span>
          <Input
            id="width"
            label=""
            disabled={isLoading}
            register={register}
            errors={errors}
            type="number"
            min={0}
            custom="w-full p-2 border-2 border-solid rounded-md outline-none"
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              if (value < 0) {
                toast.error("A largura não pode ser negativa.");
              }
            }}
          />
          {errors.name?.type && (
            <span className="text-red-500 text-sm">campo obrigatório</span>
          )}
        </div>

        <div className="flex flex-col m-2">
          <span className="text-base font-medium text-zinc-700">Comprimento em cm</span>
          <Input
            id="length"
            label=""
            disabled={isLoading}
            register={register}
            errors={errors}
            type="number"
            min={0}
            custom="w-full p-2 border-2 border-solid rounded-md outline-none"
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              if (value < 0) {
                toast.error("o comprimento não pode ser negativa.");
              }
            }}
          />
          {errors.name?.type && (
            <span className="text-red-500 text-sm">campo obrigatório</span>
          )}
        </div>

        <div className="flex flex-col m-2">
          <span className="text-base font-medium text-zinc-700">Peso em Kg</span>
          <Input
            id="weight"
            label=""
            disabled={isLoading}
            register={register}
            errors={errors}
            type="number"
            min={0}
            custom="w-full p-2 border-2 border-solid rounded-md outline-none"
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              if (value < 0) {
                toast.error("O peso não pode ser negativa.");
              }
            }}
          />
          {errors.name?.type && (
            <span className="text-red-500 text-sm">campo obrigatório</span>
          )}
        </div>

        <div className="flex flex-col m-2">
          <span className="text-base font-medium text-zinc-700">Preço em R$</span>
          <Input
            id="price"
            label=""
            disabled={isLoading}
            register={register}
            errors={errors}
            type="number"
            min={0}
            custom="w-full p-2 border-2 border-solid rounded-md outline-none"
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              if (value < 0) {
                toast.error("O preço não pode ser negativa.");
              }
            }}
          />
          {errors.name?.type && (
            <span className="text-red-500 text-sm">campo obrigatório</span>
          )}
        </div>

        <div className="flex flex-col m-2">
          <span className="text-base font-medium text-zinc-700">
            Quantidade em estoque
          </span>
          <Input
            id="stock"
            label=""
            disabled={isLoading}
            register={register}
            errors={errors}
            type="number"
            min={0}
            custom="w-full p-2 border-2 border-solid rounded-md outline-none"
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              if (value < 0) {
                toast.error("O estoque não pode ser negativa.");
              }
            }}
          />
          {errors.name?.type && (
            <span className="text-red-500 text-sm">campo obrigatório</span>
          )}
        </div>

        <div className="flex flex-col m-2 ">
          <span className="text-base font-medium text-zinc-700">
            Recomendado
          </span>
          <div className="h-full flex justify-around">
            <Input
              id="is_recommended"
              label=""
              disabled={isLoading}
              register={register}
              errors={errors}
              type="checkbox"
              custom="w-[40%] mt-2 h-auto"
            />
          </div>
        </div>

        <div className="w-full flex items-center p-2 justify-center">
          <Button
            label={isLoading ? "Carregando" : "Alterar"}
            onClick={handleSubmit(onSubmit)}
            custom="text-xl h-fit w-[70%]"
          />
        </div>
      
      </div>
      {/* fim do meu form */}
    </div>
  );
}
