import { CartContext } from "@api/cart";
import { useContext } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";

export const NavbarComponent = () => {
  const { state } = useContext(CartContext);

  return (
    <Navbar variant="light" bg="light">
      <Container fluid>
        <Navbar.Brand href="#home">IdealPrints</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/shop">Shop</Nav.Link>
            <Nav.Link href="cart">{`Cart: ${state?.cart?.length}`}</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
