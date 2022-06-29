import { CartContext, ICartItem, Cart } from "@api/cart";
import { NavbarComponent } from "@components/Navbar";
import { IPhotoTile } from "@lib/photo-data";
import { useContext, useEffect, useState } from "react";
import { Card, Col, Container, Navbar, Row } from "react-bootstrap";
import { CartInfo } from "./cartInfo";
import { CartTile } from "./cartTile";

export default function CartComponent({ photos }: { photos: IPhotoTile[] }) {
  const [cart, setCart] = useState<Cart>(new Cart());
  const { state } = useContext(CartContext);

  useEffect(() => {
    setCart(state.cart);
  }, [state.cart]);

  return (
    <div>
      <NavbarComponent />
      <Container fluid="lg">
        <h1 className="display-2 mt-5 pb-3 border-bottom">Cart</h1>
        <Row>
          <Col md={7} className="pt-3">
            {!cart.isEmpty() ? (
              cart
                ?.getItems()
                .map((item) => (
                  <CartTile
                    key={item.id + item.size}
                    item={item}
                    photo={photos.find((photo) => photo.id === item.id)}
                  />
                ))
            ) : (
              <div>cart is empty</div>
            )}
          </Col>
          <Col md={5} className="pt-3">
            <CartInfo cart={cart} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
