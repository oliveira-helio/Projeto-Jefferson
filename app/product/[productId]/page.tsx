"use client";
import { useParams } from "next/navigation";
import Container from "@/components/Container";
import ProductDetails from "@/components/ProductDetails/ProductDetails";

const Product = () => {
  const params = useParams();
  const productId = params.productId;

  return (
    <div className="p-8">
      <Container>
        <ProductDetails productId={productId} />
      </Container>
    </div>
  );
};
export default Product;
