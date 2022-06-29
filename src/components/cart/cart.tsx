import { CartContext } from "@api/cart";
import { NavbarComponent } from "@components/Navbar";
import { IPhotoTile } from "@lib/photo-data";
import { useContext } from "react";
import { Col, Container, Navbar, Row } from "react-bootstrap";
import { CartTile } from "./cartTile";

export default function Cart({ photos }: { photos: IPhotoTile[] }) {
  const { state } = useContext(CartContext);

  return (
    <div>
      <NavbarComponent />
      <Container fluid="lg">
        <h1 className="display-2 mt-5 pb-3 border-bottom">Cart</h1>
        <Row>
          <Col md={7}>
            {state.cart.getItems().map((item) => (
              <CartTile
                key={item.id + item.size}
                item={item}
                photo={photos.find((photo) => photo.id === item.id)}
              />
            ))}
          </Col>
        </Row>
        <p>Total: {state.cart.getTotal()}</p>
      </Container>
    </div>
  );
}
