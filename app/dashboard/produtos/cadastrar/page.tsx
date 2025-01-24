"use client";
import { useContext, useEffect, useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { ProductContext } from "@/Contexts/ProductsContext";
import Input from "@/components/Inputs/Input";
import TextArea from "@/components/Inputs/TextArea";
import Button from "@/components/MicroComponents/Button";

export default function CreateProduct() {
  const { productRegister } = useContext(ProductContext);
  const [isLoading, setIsLoading] = useState(false);
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
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      await productRegister(data);
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


      <div className="grid grid-flow-row grid-cols-4 gap-0">

        <div className="flex flex-col m-2">
          <span className="text-base font-medium text-zinc-700">Nome</span>
          <Input
            id="name"
            label=""
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            type="input"
            custom="w-full p-2 border-2 border-solid rounded-md outline-none"
          />
          {errors.name?.type && <span className="text-red-500 text-sm">campo obrigatório</span>}
        </div>

        <div className="flex flex-col m-2">
          <span className="text-base font-medium text-zinc-700">Marca</span>
          <Input
            id="brand"
            label=""
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            type="text"
            custom="w-full p-2 border-2 border-solid rounded-md outline-none"
          />
          {errors.name?.type && <span className="text-red-500 text-sm">campo obrigatório</span>}
        </div>  

        <div className="flex flex-col m-2">
          <span className="text-base font-medium text-zinc-700">Cor</span>
          <Input
            id="color"
            label=""
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            type="text"
            custom="w-full p-2 border-2 border-solid rounded-md outline-none"
          />
          {errors.name?.type && <span className="text-red-500 text-sm">campo obrigatório</span>}
        </div>  

        <div className="flex flex-col m-2">
          <span className="text-base font-medium text-zinc-700">Código da cor</span>
          <Input
            id="color_code"
            label=""
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            type="text"
            custom="w-full p-2 border-2 border-solid rounded-md outline-none"
          />
          {errors.name?.type && <span className="text-red-500 text-sm">campo obrigatório</span>}
        </div>

        <div className="flex flex-col mx-2 col-span-2 my-1">
          <span className="text-base font-medium text-zinc-700">Descrição</span>
          <TextArea
            id="description"
            label=""
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            custom="w-full p-2 border-2 border-solid rounded-md outline-none min-h-[100px] resize-none"
          />
          {errors.name?.type && <span className="text-red-500 text-sm">campo obrigatório</span>}
        </div>

        <div className="flex flex-col mx-2 col-span-2 my-1">
          <span className="text-base font-medium text-zinc-700">Detalhes</span>
          <TextArea
            id="details"
            label=""
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            custom="w-full p-2 border-2 border-solid rounded-md outline-none min-h-[100px] resize-none"
          />
          {errors.name?.type && <span className="text-red-500 text-sm">campo obrigatório</span>}
        </div>

        <div className="flex flex-col m-2">
          <span className="text-base font-medium text-zinc-700">Categoria</span>
          <Input
            id="category"
            label=""
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            type="text"
            custom="w-full p-2 border-2 border-solid rounded-md outline-none"
          />
          {errors.name?.type && <span className="text-red-500 text-sm">campo obrigatório</span>}
        </div>  

        <div className="flex flex-col m-2">
          <span className="text-base font-medium text-zinc-700">Subcategoria</span>
          <Input
            id="sub_category"
            label=""
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            type="text"
            custom="w-full p-2 border-2 border-solid rounded-md outline-none"
          />
          {errors.name?.type && <span className="text-red-500 text-sm">campo obrigatório</span>}
        </div>  

        <div className="flex flex-col m-2">
          <span className="text-base font-medium text-zinc-700">Tipo de produto</span>
          <Input
            id="product_type"
            label=""
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            type="Text"
            custom="w-full p-2 border-2 border-solid rounded-md outline-none"
          />
          {errors.name?.type && <span className="text-red-500 text-sm">campo obrigatório</span>}
        </div>  

        <div className="flex flex-col m-2">
          <span className="text-base font-medium text-zinc-700">Código de barras</span>
          <Input
            id="bar_code"
            label=""
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            type="text"
            custom="w-full p-2 border-2 border-solid rounded-md outline-none"
          />
          {errors.name?.type && <span className="text-red-500 text-sm">campo obrigatório</span>}
        </div> 
      

        <div className="flex flex-col m-2">
          <span className="text-base font-medium text-zinc-700">Altura em cm</span>
          <Input
            id="height"
            label=""
            disabled={isLoading}
            register={register}
            errors={errors}
            required
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
          
          {errors.name?.type && <span className="text-red-500 text-sm">campo obrigatório</span>}
        </div> 

        <div className="flex flex-col m-2">
          <span className="text-base font-medium text-zinc-700">Largura em cm</span>
          <Input
            id="width"
            label=""
            disabled={isLoading}
            register={register}
            errors={errors}
            required
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
          {errors.name?.type && <span className="text-red-500 text-sm">campo obrigatório</span>}
        </div>

        <div className="flex flex-col m-2">
          <span className="text-base font-medium text-zinc-700">Comprimento em cm</span>
          <Input
            id="length"
            label=""
            disabled={isLoading}
            register={register}
            errors={errors}
            required
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
          {errors.name?.type && <span className="text-red-500 text-sm">campo obrigatório</span>}
        </div>

        <div className="flex flex-col m-2">
          <span className="text-base font-medium text-zinc-700">Peso em Kg</span>
          <Input
            id="weight"
            label=""
            disabled={isLoading}
            register={register}
            errors={errors}
            required
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
          {errors.name?.type && <span className="text-red-500 text-sm">campo obrigatório</span>}
        </div>

        <div className="flex flex-col m-2">
          <span className="text-base font-medium text-zinc-700">Preço em R$</span>
          <Input
            id="price"
            label=""
            disabled={isLoading}
            register={register}
            errors={errors}
            required
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
          {errors.name?.type && <span className="text-red-500 text-sm">campo obrigatório</span>}
        </div>

        <div className="flex flex-col m-2">
          <span className="text-base font-medium text-zinc-700">Quantidade em estoque</span>
          <Input
            id="stock"
            label=""
            disabled={isLoading}
            register={register}
            errors={errors}
            required
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
          {errors.name?.type && <span className="text-red-500 text-sm">campo obrigatório</span>}
        </div>

        <div className="flex flex-col m-2 ">
          <span className="text-base font-medium text-zinc-700">Recomendado</span>
          <div className="h-full flex justify-around">
            <Input
              id="is_recommended"
              label=""
              disabled={isLoading}
              register={register}
              errors={errors}
              type="checkbox"
              custom="w-[40%] mt-3 h-fit"
            />
          </div>
        </div>
      
        <div className="w-full flex items-center p-2 justify-center">
          <Button
            label={isLoading ? "Carregando" : "Cadastrar"}
            onClick={handleSubmit(onSubmit)}
            custom="text-xl h-fit w-[70%]"
          />
        </div>
      </div>
      

    </div>

  );
}