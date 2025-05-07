import {
  FieldValues,
  UseFormRegister,
  FieldErrors,
  SubmitHandler,
} from "react-hook-form";
import Input from "@/components/Inputs/Input";
import TextArea from "@/components/Inputs/TextArea";
import Button from "@/components/MicroComponents/Default/Button";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import ImageInput from "./ImageImput";
import Link from "next/link";
import dynamic from "next/dynamic"; // Importação dinâmica para evitar problemas no SSR
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

interface ProductFormProps {
  isLoading: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  handleSubmit: (
    callback: SubmitHandler<FieldValues>
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  onSubmit: SubmitHandler<FieldValues>;
  buttonLabel: string;
  initialImages?: { image_url: string; is_generic: boolean }[];
  setImages: React.Dispatch<React.SetStateAction<{ image_url: string; is_generic: boolean }[]>>;
  disabledFields?: string[]
}

const ProductForm: React.FC<ProductFormProps> = ({
  isLoading,
  register,
  errors,
  handleSubmit,
  onSubmit,
  buttonLabel,
  initialImages = [],
  setImages, 
  disabledFields = [],
}) => {
  const [images, setLocalImages] = useState<{ file?: File; image_url: string; is_generic: boolean }[]>(initialImages);
  const [loadingImage, setLoadingImage] = useState(false); // Para mostrar o estado de carregamento
  const [details, setDetails] = useState(""); // Estado local para os detalhes
  // Adiciona a imagem à lista
  const handleAddImage = (signedUrl: string, isGeneric: boolean, file: File | undefined) => {
    const newImage = { image_url: signedUrl, is_generic: isGeneric, file };
    setLocalImages(prevImages => [...prevImages, newImage]);
  };

  // Remove a imagem da lista
  const handleRemoveImage = (index: number) => {
    setLocalImages(images.filter((_, i) => i !== index));
    // TODO: Remover a imagem do servidor 
  };

  useEffect(() => {
    setLocalImages(initialImages);
  }, [initialImages]);

  useEffect(() => {
    setImages(images);
    console.log('images no productForm', images);
  }, [images, setImages]);

  useEffect(() => {
    console.log('images no productForm', images);
  }, [images]);

  return (
    <div className="grid grid-flow-row grid-cols-4 gap-0">
      <div className="flex flex-col m-2">
        <span className="text-base font-medium text-zinc-700">Nome</span>
        <Input
          id="name"
          label=""
          disabled={isLoading || !!disabledFields.find((field: string) => field === "name")}
          register={register}
          errors={errors}
          required
          type="input"
          custom="w-full p-2 border-2 border-solid rounded-md outline-none"
        />
        {errors.name?.type && (
          <span className="text-red-500 text-sm">campo obrigatório</span>
        )}
      </div>

      <div className="flex flex-col m-2">
        <span className="text-base font-medium text-zinc-700">Marca</span>
        <Input
          id="brand"
          label=""
          disabled={isLoading || !!disabledFields.find((field: string) => field === "brand")}
          register={register}
          errors={errors}
          required
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
          disabled={isLoading || !!disabledFields.find((field: string) => field === "color")}
          register={register}
          errors={errors}
          type="text"
          custom="w-full p-2 border-2 border-solid rounded-md outline-none"
        />
        {/* {errors.name?.type && (
          <span className="text-red-500 text-sm">campo obrigatório</span>
        )} */}
      </div>

      <div className="flex flex-col m-2">
        <span className="text-base font-medium text-zinc-700">
          Código da cor
        </span>
        <Input
          id="color_code"
          label=""
          disabled={isLoading || !!disabledFields.find((field: string) => field === "color_code")}
          register={register}
          errors={errors}
         
          type="text"
          custom="w-full p-2 border-2 border-solid rounded-md outline-none"
        />
        {/* {errors.name?.type && (
          <span className="text-red-500 text-sm">campo obrigatório</span>
        )} */}
      </div>

      <div className="flex flex-col mx-2 col-span-2 ">
        <span className="text-base font-medium text-zinc-700">Descrição</span>
        <TextArea
          id="description"
          label=""
          disabled={isLoading || !!disabledFields.find((field: string) => field === "description")}
          register={register}
          errors={errors}
          required
          custom="w-full p-2 outline-none h-[200px] resize-none"
        />
        {errors.name?.type && (
          <span className="text-red-500 text-sm">campo obrigatório</span>
        )}
      </div> 

      <div className="flex flex-col mx-2 col-span-2 ">
        <span className="text-base font-medium text-zinc-700">Detalhes</span>
        <div className={`bg-white w-full outline-none h-[200px] ${(isLoading || disabledFields.includes("details")) ? "cursor-not-allowed opacity-25" : "cursor-auto"}`}>
        <ReactQuill
          readOnly={isLoading || !!disabledFields.find((field: string) => field === "details")}
          value={details}
          onChange={setDetails} // Atualiza o estado local
          modules={{
            toolbar: [
              [{ header: [1, 2, 3, false] }], // Títulos
              ["bold", "italic"], // Negrito e Itálico
              [{ list: "ordered" }, { list: "bullet" }], // Listas numeradas e com bolinhas
            ],
          }}
          className={`h-[159px] ql-editor.overflow-y-auto rounded-md`} // Ajuste de estilos
        />
        </div>
      </div> 

      {/* <div className="flex flex-col mx-2 col-span-2 my-1">
        <span className="text-base font-medium text-zinc-700">Detalhes</span>
        <div className="border-2 border-solid rounded-md p-2 min-h-[100px]">
          <EditorContent editor={editor} />
        </div>
        {errors.details?.type && <span className="text-red-500 text-sm">campo obrigatório</span>}
      </div> */}

      <div className="flex flex-col m-2">
        <span className="text-base font-medium text-zinc-700">Categoria</span>
        <Input
          id="category"
          label=""
          disabled={isLoading || !!disabledFields.find((field: string) => field === "category")}
          register={register}
          errors={errors}
          type="text"
          custom="w-full p-2 border-2 border-solid rounded-md outline-none"
        />
        {/* {errors.name?.type && (
          <span className="text-red-500 text-sm">campo obrigatório</span>
        )} */}
      </div>

      <div className="flex flex-col m-2">
        <span className="text-base font-medium text-zinc-700">
          Subcategoria
        </span>
        <Input
          id="sub_category"
          label=""
          disabled={isLoading || !!disabledFields.find((field: string) => field === "sub_category")}
          register={register}
          errors={errors}
          type="text"
          custom="w-full p-2 border-2 border-solid rounded-md outline-none"
        />
        {/* {errors.name?.type && (
          <span className="text-red-500 text-sm">campo obrigatório</span>
        )} */}
      </div>

      <div className="flex flex-col m-2">
        <span className="text-base font-medium text-zinc-700">
          Tipo de produto
        </span>
        <Input
          id="product_type"
          label=""
          disabled={isLoading || !!disabledFields.find((field: string) => field === "product_type")}
          register={register}
          errors={errors}
          type="Text"
          custom="w-full p-2 border-2 border-solid rounded-md outline-none"
        />
        {/* {errors.name?.type && (
          <span className="text-red-500 text-sm">campo obrigatório</span>
        )} */}
      </div>

      <div className="flex flex-col m-2">
        <span className="text-base font-medium text-zinc-700">
          Código de barras
        </span>
        <Input
          id="bar_code"
          label=""
          disabled={isLoading || !!disabledFields.find((field: string) => field === "bar_code")}
          register={register}
          errors={errors}
          required
          type="text"
          custom="w-full p-2 border-2 border-solid rounded-md outline-none"
        />
        {errors.name?.type && (
          <span className="text-red-500 text-sm">campo obrigatório</span>
        )}
      </div>

      <div className="flex flex-col m-2">
        <span className="text-base font-medium text-zinc-700">
          Altura em cm
        </span>
        <Input
          id="height"
          label=""
          disabled={isLoading || !!disabledFields.find((field: string) => field === "height")}
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
        {errors.name?.type && (
          <span className="text-red-500 text-sm">campo obrigatório</span>
        )}
      </div>

      <div className="flex flex-col m-2">
        <span className="text-base font-medium text-zinc-700">
          Largura em cm
        </span>
        <Input
          id="width"
          label=""
          disabled={isLoading || !!disabledFields.find((field: string) => field === "width")}
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
        {errors.name?.type && (
          <span className="text-red-500 text-sm">campo obrigatório</span>
        )}
      </div>

      <div className="flex flex-col m-2">
        <span className="text-base font-medium text-zinc-700">
          Comprimento em cm
        </span>
        <Input
          id="length"
          label=""
          disabled={isLoading || !!disabledFields.find((field: string) => field === "length")}
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
        {errors.name?.type && (
          <span className="text-red-500 text-sm">campo obrigatório</span>
        )}
      </div>

      <div className="flex flex-col m-2">
        <span className="text-base font-medium text-zinc-700">Peso em Kg</span>
        <Input
          id="weight"
          label=""
          disabled={isLoading || !!disabledFields.find((field: string) => field === "weight")}
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
        {errors.name?.type && (
          <span className="text-red-500 text-sm">campo obrigatório</span>
        )}
      </div>

      <div className="flex flex-col m-2">
        <span className="text-base font-medium text-zinc-700">Preço em R$</span>
        <Input
          id="price"
          label=""
          disabled={isLoading || !!disabledFields.find((field: string) => field === "price")}
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
          disabled={isLoading || !!disabledFields.find((field: string) => field === "stock")}
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
        {errors.name?.type && (
          <span className="text-red-500 text-sm">campo obrigatório</span>
        )}
      </div>

      <div className="flex flex-col m-2 ">
        <span className="text-base font-medium text-zinc-700">Recomendado</span>
        <div className="h-full flex justify-around">
          <Input
            id="is_recommended"
            label=""
            disabled={isLoading || !!disabledFields.find((field: string) => field === "is_recommended")}
            register={register}
            errors={errors}
            type="checkbox"
            custom="w-[40%] mt-3 h-fit"
          />
        </div>
      </div>

      {/* Imagens */}
      <span className="text-base font-medium text-zinc-700 col-span-4 m-2">Imagens</span>
      <div className="grid grid-cols-4 col-span-4">
        <div className="col-span-2">
          <ImageInput 
            onFileAdded={handleAddImage}
            disabled={isLoading || !!disabledFields.find((field: string) => field === "images")}
          />
        </div>

        <div className="mt-2 col-span-2 bg-pink-200 rounded">
          {images.map((image, index) => (
            <div key={index} className="items-center justify-between p-2 border-b grid grid-cols-5 gap-1">
              <span className="flex col-span-3 overflow-hidden text-nowrap text-end">
                {image.file?.name || (image.image_url && <Link href={image.image_url} target="_blank" rel="noopener noreferrer">
                  {image.image_url}
                </Link>)}
              </span>
              <span className="flex justify-center">{image.is_generic ? "Genérica" : "Específica"}</span>
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                disabled={isLoading || !!disabledFields.find((field: string) => field === "remove_button")}
                className={`text-red-500 hover:text-red-700 ${!!disabledFields.find((field: string) => field === "remove_button") ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
              >
                Remover
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="items-center col-span-4 flex justify-center mt-8">
        <Button
          label={isLoading ? "Carregando" : buttonLabel}
          onClick={handleSubmit((data) => {
            onSubmit({ ...data, details, images })
          })}
          custom="text-xl h-fit"
          disabled={isLoading || !!disabledFields.find((field: string) => field === "remove_button")}
        />
      </div>
    </div>
  );
};

export default ProductForm;