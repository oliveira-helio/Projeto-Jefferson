"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import apiAdress from "@/utils/api";
import { Product } from "@/utils/interfaces";

const ProductDetail = () => {
  const { product_id } = useParams();
  console.log("productid2", product_id);
  const [product, setProduct] = useState<Product>();
  const router = useRouter();

  useEffect(() => {
    if (!product_id) return;
    const loadProduct = async () => {
      try {
        const response = await fetch(`${apiAdress}/product/${product_id}`);
        if (!response.ok) {
          throw new Error("Erro ao buscar o produto");
        }
        const data = await response.json();
        console.log("aqui ", data);
        setProduct(data.product);
      } catch (error) {
        console.error("Erro ao carregar o produto:", error);
      }
    };

    loadProduct();
  }, [product_id]);

  return (
    <div>
      <p>teste</p>
    </div>
  );
};

export default ProductDetail;
