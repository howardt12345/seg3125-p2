import { Cart } from "@api/cart";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  Button,
  Card,
  Col,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";

export const CartInfo = (props: {
  cart: Cart;
  confirm?: boolean;
  submit?: any;
}) => {
  const router = useRouter();
  const { locale } = router;
  const { t } = useTranslation("cart");

  const { cart, confirm, submit } = props;
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setSubtotal(cart.getSubtotal());
    setTax(cart.getTax());
    setTotal(cart.getTotal());
  }, [cart, props]);

  const CheckoutLink = () => (
    <Link href="/checkout">
      <a
        className={`btn btn-outline-primary btn-block ${
          cart.isEmpty() ? "disabled" : ""
        }`}
      >
        {t("cart:continue_to_checkout")}
      </a>
    </Link>
  );

  return (
    <Card>
      <Card.Body className="text-center">
        <h3 className="card-title">{t("order_summary")}</h3>
        <div className="px-2 my-4">
          <Row>
            <Col className="text-start">
              <strong>{t("cart:subtotal")}</strong>
            </Col>
            <Col className="text-end">
              {subtotal.toLocaleString(locale, {
                style: "currency",
                currency: "CAD",
              })}
            </Col>
          </Row>
          <Row className="pt-2">
            <Col className="text-start">
              <strong>{t("cart:shipping")}</strong>
            </Col>
            <Col className="text-end">{t("free")}</Col>
          </Row>
          <Row className="pt-2">
            <Col className="text-start">
              <strong>{t("cart:tax")}</strong>
            </Col>
            <Col className="text-end">
              {tax.toLocaleString(locale, {
                style: "currency",
                currency: "CAD",
              })}
            </Col>
          </Row>
          <Row className="border-top pt-2 mt-2">
            <Col className="text-start">
              <strong>{t("cart:total")}</strong>
            </Col>
            <Col className="text-end">
              {total.toLocaleString(locale, {
                style: "currency",
                currency: "CAD",
              })}
            </Col>
          </Row>
        </div>
        {!confirm &&
          (cart.isEmpty() ? (
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id="tooltip-top">
                  {t("cart:checkout_error")}
                </Tooltip>
              }
            >
              <span>
                <CheckoutLink />
              </span>
            </OverlayTrigger>
          ) : (
            <CheckoutLink />
          ))}
        {confirm && (
          <Button
            variant="outline-primary"
            className="btn-block"
            form="submit-form"
            type="submit"
          >
            {t("cart:confirm_order")}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};
