import { CartProductType } from "@/utils/types";
import { formatCurrency } from "@/utils/utilitaryFunctions";
import Image from "next/image";
import { Suspense } from "react";

interface ItemContentProps {
  item: CartProductType;
  itemkey?: number;
}

const ItemContentCheckout: React.FC<ItemContentProps> = ({ item, itemkey }) => {
  return (
    // <Suspense fallback={<div>Carregando no ItemContentCheckout...</div>}>
    <div
      key={itemkey}
      className="max-md:flex max-md:flex-col md:grid md:grid-cols-6 my-2 p-2 border-solid border-[1.2px] border-pink-300 bg-pink-100 rounded-xl w-full"
    >
      <div  className="col-span-3">
        <div className="p-1 md:grid md:grid-cols-3 flex flex-row w-full">
          <Image
            src={item.image}
            alt="Foto do produto"
            className="rounded-xl aspect-square max-md:w-[100px] md:w-[120px]  object-cover"
            width={120}
            height={120}
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
      </div>

      <div className="p-2 flex md:flex-col justify-between md:justify-center text-center md:gap-2">
        <span className="text-base font-medium justify-center items-center self-center">PREÇO</span>
          <span className="text-base font-medium">
            {formatCurrency(item.price)}
          </span>
      </div>

      <div className="p-2 flex md:flex-col justify-between md:justify-center text-center md:gap-2">
        <span className="text-base font-medium justify-center items-center self-center">QUANTIDADE</span>
        <span className="text-base font-medium">
            { item.quantity }
          </span>
      </div>

      <div className="p-2 flex md:flex-col justify-between md:justify-center text-center md:gap-2">
        <span className="text-base font-medium justify-center items-center self-center">TOTAL</span>
          <span className="text-base font-medium">
            {formatCurrency(item.price * item.quantity)}
          </span>
      </div>
    </div>
    // </Suspense>
  );
};

export default ItemContentCheckout;