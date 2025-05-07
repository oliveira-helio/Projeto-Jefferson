"use client";
import { CartProductType } from "@/types/ProductTypes";

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
  const onIncreaseClick = () => {
    handleQtyIncrease(cartProduct);
  };

  const onDecreaseClick = () => {
    handleQtyDecrease(cartProduct);
  };
  return (
    <div className="flex gap-8 items-center">
      {cartCounter ? null : <div className="font-semibold">Quantidade</div>}
      <div className="flex gap-4 items-center text-base">
        <button className={buttonStyle} onClick={onDecreaseClick}>
          -
        </button>
        <div>{cartProduct.quantity}</div>
        <button className={buttonStyle} onClick={onIncreaseClick}>
          +
        </button>
      </div>
    </div>
  );
};

export default QuantitySelector;
