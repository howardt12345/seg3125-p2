import { Cart, TAX } from "@api/cart";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";

export const CartInfo = (props: {
  cart: Cart;
  confirm?: boolean;
  submit?: any;
}) => {
  const { cart, confirm, submit } = props;
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setSubtotal(cart.getSubtotal());
    setTax(cart.getTax());
    setTotal(cart.getTotal());
  }, [cart, props]);

  return (
    <Card>
      <Card.Body className="text-center">
        <h3 className="card-title">Order Summary</h3>
        <div className="px-2 my-4">
          <Row>
            <Col className="text-start">
              <strong>Subtotal:</strong>
            </Col>
            <Col className="text-end">
              {subtotal.toLocaleString("en-US", {
                style: "currency",
                currency: "CAD",
              })}
            </Col>
          </Row>
          <Row className="pt-2">
            <Col className="text-start">
              <strong>Shipping:</strong>
            </Col>
            <Col className="text-end">Free</Col>
          </Row>
          <Row className="pt-2">
            <Col className="text-start">
              <strong>{`Tax (${TAX.toLocaleString("en", {
                style: "percent",
              })}):`}</strong>
            </Col>
            <Col className="text-end">
              {tax.toLocaleString("en-US", {
                style: "currency",
                currency: "CAD",
              })}
            </Col>
          </Row>
          <Row className="border-top pt-2 mt-2">
            <Col className="text-start">
              <strong>Total:</strong>
            </Col>
            <Col className="text-end">
              {total.toLocaleString("en-US", {
                style: "currency",
                currency: "CAD",
              })}
            </Col>
          </Row>
        </div>
        {!confirm && (
          <Link href="/checkout">
            <a className="btn btn-outline-primary btn-block">
              Continue to Checkout
            </a>
          </Link>
        )}
        {confirm && (
          <Button
            variant="outline-primary"
            className="btn-block"
            form="submit-form"
            type="submit"
          >
            Confirm Order
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};
