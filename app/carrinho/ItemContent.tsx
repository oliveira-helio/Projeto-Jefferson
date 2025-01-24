import { CartProductType } from "@/utils/types";
import { formatCurrency } from "@/utils/utilitaryFunctions";
import { Delete } from "@mui/icons-material";
import Link from "next/link";
import QuantitySelector from "../../components/MicroComponents/QuantitySelector";
import { useCart } from "../../Hooks/useCart";

interface ItemContentProps {
  item: CartProductType;
  itemkey?: number;
}

const ItemContent: React.FC<ItemContentProps> = ({ item,itemkey }) => {
  const {
    handleRemoveProductFromCart,
    handleProductQtyIncreaseUnit,
    handleProductQtyDecrease,
  } = useCart();

  return (
    <div
      key={itemkey}
      className="relative max-md:flex max-md:flex-col md:grid md:grid-cols-6 m-4 p-2 border-solid border-[1.2px] border-pink-400 bg-pink-100 rounded-xl"
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

      <div className="p-2 flex justify-between md:justify-center items-center">
        <div className=" md:hidden ">
          <span className="text-lg font-medium">PREÇO</span>
        </div>
        <div>
          <span className="text-base font-medium">
            {formatCurrency(item.price)}
          </span>
        </div>
      </div>

      <div className="p-2 flex justify-between md:justify-center items-center">
        <div className="md:hidden">
          <span className="text-lg font-medium ">QUANTIDADE</span>
        </div>
        <div>
          <QuantitySelector
            cartCounter={true}
            cartProduct={item}
            handleQtyIncrease={() => {
              handleProductQtyIncreaseUnit(item);
            }}
            handleQtyDecrease={() => {
              handleProductQtyDecrease(item);
            }}
          />
        </div>
      </div>

      <div className="p-2 flex justify-between md:justify-center items-center">
        <div className="md:hidden">
          <span className="text-lg font-medium ">TOTAL</span>
        </div>
        <div>
          <span className="text-base font-medium">
            {formatCurrency(item.price * item.quantity)}
          </span>
        </div>
      </div>

      <div className="absolute right-6 max-md:top-6 sm:right-6 md:right-2 md:bottom-3 lg:right-6 xl:right-10 2xl:right-12 ">
        <button
          className="flex flex-col md:flex-row-reverse w-full items-center underline font-medium"
          onClick={() => {
            handleRemoveProductFromCart(item);
          }}
        >
          <Delete className="text-[1.5rem] text-red-800" />
          <p className="text-xs font-medium ">REMOVER</p>
        </button>
      </div>
    </div>
  );
};

export default ItemContent;
