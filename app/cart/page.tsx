import { Suspense } from "react";
import Container from "../../components/Container";
import CartClient from "../../components/Cart/CartClient";

const Cart = () => {
  return (
    <div>
      <Container>
        {/* <Suspense fallback={<div>Carregando no Cart Page...</div>}> */}
        <CartClient />
        {/* </Suspense> */}
      </Container>
    </div>
  );
};

export default Cart;
