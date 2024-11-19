"use client";
import { useState, useEffect } from "react";
import { Product } from "@/utils/interfaces";
import ProductCard from "../components/ProductCard/ProductCard";
import apiAdress from "@/utils/api";

export default function products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch(`${apiAdress}/products`);
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      } finally {
        setLoading(false); // Define loading como false após o carregamento
      }
    };

    loadProducts(); // Chama a função ao carregar o componente
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-4xl font-medium text-gray-700">
          Carregando produtos...
        </p>
      </div>
    ); // Exibe um estado de carregamento
  }

  return (
    <div>
      <div className="relative flex flex-col py-5 justify-center items-center ">
        <div>
          <h1 className="self-center text-gray-900 font-bold text-4xl z-10 w-fit">
            PRODUTOS
            <div className="w-[14rem] h-6 bg-pink-600 opacity-40 top-10 absolute left-1/2 transform -translate-x-1/2"></div>
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-center justify-between">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.product_id} product={product} />
          ))
        ) : (
          <div>Nenhum produto encontrado.</div>
        )}
      </div>
    </div>
  );
  // return <Carrossel products={loadedProducts} />;
}
