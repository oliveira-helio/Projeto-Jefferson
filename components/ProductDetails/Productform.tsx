"use client";

import { FieldErrors, UseFormRegister, SubmitHandler } from "react-hook-form";
import Input from "@/components/Inputs/Input";
import TextArea from "@/components/Inputs/TextArea";
import Button from "@/components/MicroComponents/Button";
import toast from "react-hot-toast";

interface ProductFormProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  isLoading: boolean;
  onSubmit: SubmitHandler<any>;
}

export default function ProductForm({
  register,
  errors,
  isLoading,
  onSubmit,
}: ProductFormProps) {
  return (
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
          custom="w-full p-2 border rounded"
        />
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
          custom="w-full p-2 border rounded"
        />
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
          custom="w-full p-2 border rounded"
        />
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
          required
          type="text"
          custom="w-full p-2 border rounded"
        />
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
          custom="w-full p-2 border rounded min-h-[100px] resize-none"
        />
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
          custom="w-full p-2 border rounded min-h-[100px] resize-none"
        />
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
          custom="w-full p-2 border rounded"
        />
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
          required
          type="text"
          custom="w-full p-2 border rounded"
        />
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
          required
          type="Text"
          custom="w-full p-2 border rounded"
        />
      </div>

      <div className="flex flex-col m-2">
        <span className="text-base font-medium text-zinc-700">
          Código de barras
        </span>
        <Input
          id="bar_code"
          label=""
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          type="text"
          custom="w-full p-2 border rounded"
        />
      </div>

      <div className="flex flex-col m-2">
        <span className="text-base font-medium text-zinc-700">Altura</span>
        <Input
          id="height"
          label=""
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          type="number"
          custom="w-full p-2 border rounded"
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            if (value < 0) {
              toast.error("A altura não pode ser negativa.");
            }
          }}
        />
      </div>

      <div className="flex flex-col m-2">
        <span className="text-base font-medium text-zinc-700">Largura</span>
        <Input
          id="width"
          label=""
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          type="number"
          custom="w-full p-2 border rounded"
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            if (value < 0) {
              toast.error("A largura não pode ser negativa.");
            }
          }}
        />
      </div>

      <div className="flex flex-col m-2">
        <span className="text-base font-medium text-zinc-700">Comprimento</span>
        <Input
          id="length"
          label=""
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          type="number"
          custom="w-full p-2 border rounded"
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            if (value < 0) {
              toast.error("O comprimento não pode ser negativo.");
            }
          }}
        />
      </div>

      <div className="flex flex-col m-2">
        <span className="text-base font-medium text-zinc-700">Peso</span>
        <Input
          id="weight"
          label=""
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          type="number"
          custom="w-full p-2 border rounded"
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            if (value < 0) {
              toast.error("O peso não pode ser negativo.");
            }
          }}
        />
      </div>

      <div className="flex flex-col m-2">
        <span className="text-base font-medium text-zinc-700">Preço</span>
        <Input
          id="price"
          label=""
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          type="number"
          custom="w-full p-2 border rounded"
        />
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
          required
          type="number"
          custom="w-full p-2 border rounded"
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            if (value < 0) {
              toast.error("O estoque não pode ser negativo.");
            }
          }}
        />
      </div>

      <div className="flex flex-col m-2 ">
        <span className="text-base font-medium text-zinc-700">Recomendado</span>
        <div className="h-full flex justify-around">
          <Input
            id="recomended"
            label=""
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            type="checkbox"
            custom="w-[40%] mt-2 h-auto"
          />
        </div>
      </div>

      <div className="col-span-4 flex justify-center mt-4">
        <Button
          label={isLoading ? "Carregando" : "Cadastrar"}
          onClick={onSubmit}
          custom="text-xl"
        />
      </div>
    </div>
  );
}
