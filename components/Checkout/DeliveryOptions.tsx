import { CartProductType, DeliveryInfoType } from "@/utils/types";
import { formatCurrency } from "@/utils/utilitaryFunctions";
import Link from "next/link";
import { useAddress } from "@/Hooks/useAddress";
import Image from "next/image";

interface ItemContentProps {
  delivery: DeliveryInfoType;
  index?: number;
  selected: boolean;
  onSelect: () => void;
}



const DeliveryContentCheckout: React.FC<ItemContentProps> = ({
  delivery,
  index,
  selected,
  onSelect
}) => {
  return (
    <div className="flex justify-center items-center w-full border-solid border-[1.2px] border-pink-400 bg-pink-50 rounded-xl my-2 p-2 ">

      <input
        type="radio"
        id={`address-${delivery.name}`}
        name="deliveryOption"
        value={delivery.name}
        checked={selected}
        onChange={onSelect}
        className="p-2 self-center"
      />
      <label
        htmlFor={`address-${delivery.name}`}
        className="cursor-pointer w-full px-2"
      >
        <div
          key={index}
          className="max-md:flex max-md:flex-col md:grid md:grid-cols-5  w-full"
        >
          <div className="p-2 flex flex-row w-full col-span-2">
            <Image
              src={delivery.company.picture}
              alt="Foto da logo da transportadora"
              className="rounded-xl w-full object-fill aspect-auto"
              width={364}
              height={77} 
            />
          </div>

          <div className="p-2 flex flex-col justify-center text-center gap-2">
            <span className="text-base font-medium justify-center items-center self-center">Prazo de entrega</span>
            <span className="text-base font-medium">
              {delivery.delivery_time}  dias úteis
            </span>
          </div>

          <div className="p-2 flex flex-col justify-center text-center gap-2">
            <span className="text-base font-medium justify-center items-center self-center">tipo de entrega</span>
            <span className="text-base font-medium">
              {delivery.name}
            </span>
          </div>

          <div className="p-2 flex flex-col justify-center text-center gap-2">
            <span className="text-base font-medium justify-center items-center self-center">valor do frete</span>
            <span className="text-base font-medium">
              {formatCurrency(Number(delivery.custom_price))}
            </span>
          </div>
        </div>
      </label>
    </div>
  );
};

export default DeliveryContentCheckout;