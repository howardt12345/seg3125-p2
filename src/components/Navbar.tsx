import { CartAPI } from "@api/commerce";
import { Container, Navbar, Nav } from "react-bootstrap";

export const NavbarComponent = () => {
  return (
    <Navbar variant="light" bg="light">
      <Container fluid>
        <Navbar.Brand href="#home">IdealPrints</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/shop">Shop</Nav.Link>
            <Nav.Link href="cart">{`Cart: ${CartAPI.getInstance().getCount()}`}</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
