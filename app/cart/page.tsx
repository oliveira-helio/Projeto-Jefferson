import { Suspense } from "react";
import Container from "../../components/Container";
import CartClient from "./CartClient";

const Cart = () => {
  return (
    <div>
      <Container>
        <Suspense fallback={<div>Carregando...</div>}>
        <CartClient />
        </Suspense>
      </Container>
    </div>
  );
};

export default Cart;
