import React, { useState } from "react";
import { FieldValues, UseFormRegister, FieldErrors } from "react-hook-form";
import Input from "@/components/Inputs/Input";
import Button from "@/components/MicroComponents/Button";

interface ImageInputProps {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  onAddImage: (image: { image_url: string; is_generic: boolean }) => void;
  disabled: boolean
}

const ImageInput: React.FC<ImageInputProps> = ({
  register,
  errors,
  onAddImage,
  disabled
}) => {
  const [imageUrl, setImageUrl] = useState("");
  const [isGeneric, setIsGeneric] = useState(false);

  const handleAddImage = () => {
    if (imageUrl) {
      onAddImage({ image_url: imageUrl, is_generic: isGeneric });
      setImageUrl("");
      setIsGeneric(false);
    }
  };

  return (
    <div className="m-2 w-full grid grid-cols-4 items-center">
      <div className="col-span-2">
        <span className="text-base font-medium text-zinc-700">
          URL da Imagem
        </span>
        <Input
          id="image_url"
          label=""
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          register={register}
          errors={errors}
          disabled={disabled}
          type="text"
          custom="w-full p-2 border-2 border-solid rounded-md outline-none"
        />
      </div>
      <div className="flex flex-col items-center h-full justify-between mt-2">
        <label
          htmlFor="is_generic"
          className="text-base font-medium text-zinc-700"
        >
          <span> Genérica</span>
        </label>
        <input
          type="checkbox"
          id="is_generic"
          checked={isGeneric}
          onChange={(e) => setIsGeneric(e.target.checked)}
          className="mr-2"
          disabled={disabled}
        />
      </div>
      <Button
        label="Adicionar"
        onClick={handleAddImage}
        custom={`w-fit h-fit rounded-md pink-400`}
        disabled={disabled}
      />
    </div>
  );
};

export default ImageInput;
