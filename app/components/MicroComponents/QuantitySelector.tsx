"use client";
import { CartProductType } from "@/utils/types";

interface quantyitySelectorProps {
  cartCounter?: boolean;
  cartProduct: CartProductType;
  handleQtyIncrease: (cartProduct: CartProductType) => void;
  handleQtyDecrease: (cartProduct: CartProductType) => void;
}

const buttonStyle = "border-solid border-[1.2px] border-pink-400 px-2 rounded";

const QuantitySelector: React.FC<quantyitySelectorProps> = ({
  cartCounter,
  cartProduct,
  handleQtyIncrease,
  handleQtyDecrease,
}) => {
  return (
    <div className="flex gap-8 items-center">
      {cartCounter ? null : <div className="font-semibold">Quantidade</div>}
      <div className="flex gap-4 items-center text-base">
        <button className={buttonStyle} onClick={handleQtyDecrease}>
          -
        </button>
        <div>{cartProduct.quantity}</div>
        <button className={buttonStyle} onClick={handleQtyIncrease}>
          +
        </button>
      </div>
    </div>
  );
};

export default QuantitySelector;
