import { CartContext } from "@api/cart";
import Link from "next/link";
import { useContext } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";

export const NavbarComponent = () => {
  const { state } = useContext(CartContext);

  return (
    <Navbar variant="light" bg="light">
      <Container fluid>
        <Navbar.Brand href="/">IdealPrints</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Link aria-current="page" href="/shop">
              <a className="text-decoration-none nav-link">Shop</a>
            </Link>
            <Link aria-current="page" href="/cart">
              <a className="text-decoration-none nav-link">{`Cart: ${state?.cart.getItemCount()}`}</a>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
