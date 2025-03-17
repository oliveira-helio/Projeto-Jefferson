"use client";
import { useState, useEffect } from "react";
import { Product } from "@/utils/interfaces";
import ProductCard from "../ProductCard/ProductCard";
import apiAdress from '@/utils/api'
import Carrossel from "../MicroComponents/Carrossel";

export default function TopSellers() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch(`${apiAdress}/topsellers`);
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      } finally {
        setLoading(false); // Define loading como false após o carregamento
      }
    };

    loadProducts(); // Chama a função ao carregar o componente
  }, [setProducts, setLoading]);

  if (loading) {
    return <div>Carregando produtos...</div>; // Exibe um estado de carregamento
  }

  return (
    <div>
      <div className="relative flex flex-col py-5 justify-center items-center ">
        <div>
          <h1 className="self-center text-gray-900 font-bold text-3xl md:text-4xl z-10 w-fit">
            MAIS VENDIDOS
            <div className="max-md:w-[16rem] w-[19rem] h-4 bg-pink-600 opacity-40 top-10 absolute left-1/2 transform -translate-x-1/2"></div>
          </h1>
        </div>
      </div>

      <Carrossel products={products}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-center justify-between">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.product_id} product={product} />
            ))
          ) : (
            <div>Nenhum produto encontrado.</div>
          )}
        </div>
      </Carrossel>
    </div>
  );
}
