import React from "react";
import { SelectedColorType } from "@/utils/types";

interface ColorSelectorProps {
  colors: Array<{
    product_id: number;
    color: string;
    color_code: string;
    image_url: string;
    bar_code: number;
  }>;
  selectedColor: SelectedColorType | null;
  onColorSelect: (color: SelectedColorType) => void;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({
  colors,
  selectedColor,
  onColorSelect,
}) => {
  return (
    <div className="flex flex-row gap-2 items-center">
      {colors.map((image, idx) => (
        <div
          key={idx}
          className={`items-center cursor-pointer ${
            selectedColor?.colorCode === image.color_code
              ? "border-solid border-[#dd2dce] rounded-full border-2 items-center justify-center"
              : "none"
          }`}
        >
          <div
            style={{ backgroundColor: image.color_code }}
            className="rounded-full w-6 h-6 hover:scale-[1.10] m-[2px]"
            onClick={() => {
              onColorSelect({
                productId: image.product_id,
                color: image.color,
                colorCode: image.color_code,
                imageUrl: image.image_url,
                barCode: image.bar_code,
              });
            }}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default ColorSelector;
