import { CartContext } from "@api/cart";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { CartButton } from "./cart/cartButton";

export const NavbarComponent = () => {
  const { t } = useTranslation(["common", "shop"]);
  const { state } = useContext(CartContext);
  const router = useRouter();

  const handleLocaleChange = (event: { target: { value: any } }) => {
    const value = event.target.value;

    router.push(router.route, router.asPath, {
      locale: value,
    });
  };
  return (
    <Navbar variant="light" bg="light">
      <Container fluid>
        <Navbar.Brand>
          <Link href="/shop">
            <a className="text-decoration-none text-reset">IdealPrints</a>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Nav className="ms-auto pe-2 align-items-center">
          <select
            className="form-select me-3"
            onChange={handleLocaleChange}
            value={router.locale}
          >
            <option value="en">English</option>
            <option value="fr">Français</option>
          </select>
          <CartButton count={state?.cart.getItemCount()} />
        </Nav>
      </Container>
    </Navbar>
  );
};
