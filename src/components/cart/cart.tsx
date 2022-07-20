import { CartContext, Cart } from "@api/cart";
import { NavbarComponent } from "@components/Navbar";
import { IPhotoTile } from "@lib/photo-data";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { Card, Col, Container, Navbar, Row } from "react-bootstrap";
import { CartInfo } from "./cartInfo";
import { CartTile } from "./cartTile";

export default function CartComponent({ photos }: { photos: IPhotoTile[] }) {
  const { t } = useTranslation(["common", "cart", "shop"]);
  const [cart, setCart] = useState<Cart>(new Cart());
  const { state } = useContext(CartContext);

  useEffect(() => {
    setCart(state.cart);
  }, [state.cart]);

  return (
    <div>
      <NavbarComponent />
      <Container fluid="lg">
        <h1 className="display-3 mt-5 pb-3 border-bottom">{t("cart")}</h1>
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
              <Row className="text-center">
                <span>{t("cart:cart_empty")}</span>
                <Col className="mt-4">
                  <Link href="/shop">
                    <a className="btn btn-outline-primary">{t("shop:shop")}</a>
                  </Link>
                </Col>
              </Row>
            )}
          </Col>
          <Col md={5} className="pt-3">
            <CartInfo cart={state.cart} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
