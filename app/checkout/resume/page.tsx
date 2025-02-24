'use client';
import { useAddress } from "@/Hooks/useAddress";
import { useRouter } from "next/navigation";
import { useCart } from "@/Hooks/useCart";
import ItemContentCheckout from "@/app/carrinho/ItemContentCheckout";
import AddressCheckoutCard from "@/components/AdressCard/AddressCheckout";


const resume = () => {
  const { selectedDelivery } = useAddress();
  const { selectedProducts } = useCart();
  const router = useRouter();

  return (
  <div className="p-4 flex w-full justify-center">
    <div className="flex flex-col items-center justify-around w-full max-w-[1024px]">
      <span className="text-2xl font-bold flex justify-center my-2">RESUMO DO PEDIDO</span>
      {/* <hr className="border-solid border-[1px] border-pink-400 my-4" /> */}

      <div className=" border-solid border-1 border-pink-200 p-4 rounded-3xl bg-pink-50 flex flex-col w-full">
        <AddressCheckoutCard/>
        <div className="flex justify-start p-2 items-center">
          <span className="text-xl font-semibold ">Itens selecionados:</span>
        </div>
        <div className="p-2">
          {selectedProducts.map((item, index) => (
            <div key={item.productId} className="flex flex-col">
              <div className="flex-col items-center">
                <ItemContentCheckout item={item} />
                {index != selectedProducts.length -1 ? 
                <hr className=" border-solid border-0 border-t-[1px] w-full border-pink-300 " />
                : null}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-row gap-4 w-full justify-around items-center">
        <button
          onClick={() => router.push(`/checkout/payment`)}
          className="bg-pink-500 text-white py-2 px-4 mt-4 rounded-lg w-fit"
        >
          PROSSEGUIR PARA PAGAMENTO
        </button>
      </div>
    </div>
  </div>
  )
};

export default resume;