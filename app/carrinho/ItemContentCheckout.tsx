import { CartProductType } from "@/utils/types";
import { formatCurrency } from "@/utils/utilitaryFunctions";
import Link from "next/link";
import { useCart } from "../../Hooks/useCart";

interface ItemContentProps {
  item: CartProductType;
  itemkey?: number;
}

const ItemContentCheckout: React.FC<ItemContentProps> = ({ item, itemkey }) => {
  const {
    handleRemoveProductFromCart,
    handleProductQtyIncreaseUnit,
    handleProductQtyDecrease,
  } = useCart();

  return (
    <div
      key={itemkey}
      className="relative max-md:flex max-md:flex-col md:grid md:grid-cols-6  my-2 p-2 border-solid border-[1.2px] border-pink-400 bg-pink-100 rounded-xl w-full"
    >
      <Link href={`/product/${item.productId}`} className=" col-span-3">
        <div className="p-1 md:grid md:grid-cols-3 flex flex-row w-full">
          <img
            src={item.image}
            alt="Foto do produto"
            className="rounded-xl w-full aspect-square max-md:w-28 md:h-full md:w-full object-cover"
          />
          <div className="flex flex-col justify-start md:col-span-2 items-center w-full py-2">
            <div className="px-4 w-full text-lg font-medium">{item.name}</div>
            <div className="px-4 w-full text-base font-medium">
              {item.color}
            </div>
            <div className="px-4 w-full text-base font-medium">
              {item.brand}
            </div>
          </div>
        </div>
      </Link>

      <div className="p-2 flex flex-col justify-center text-center gap-2">
        <span className="text-base font-medium justify-center items-center self-center">PREÇO</span>
          <span className="text-base font-medium">
            {formatCurrency(item.price)}
          </span>
      </div>

      <div className="p-2 flex flex-col justify-center text-center gap-2">
        <span className="text-base font-medium justify-center items-center self-center">QUANTIDADE</span>
        <span className="text-base font-medium">
            { item.quantity }
          </span>
      </div>

      <div className="p-2 flex flex-col justify-center text-center gap-2">
        <span className="text-base font-medium justify-center items-center self-center">TOTAL</span>
          <span className="text-base font-medium">
            {formatCurrency(item.price * item.quantity)}
          </span>
      </div>
    </div>
  );
};

export default ItemContentCheckout;