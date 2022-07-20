import { ICartItem, CartContext } from "@api/cart";
import { useContext, useState } from "react";
import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import Image from "next/image";
import { IPhotoTile } from "@lib/photo-data";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const CartTile = ({
  item,
  photo,
}: {
  item: ICartItem;
  photo: IPhotoTile | undefined;
}) => {
  const router = useRouter();
  const { locale } = router;
  const { t } = useTranslation(["product", "cart"]);

  const { dispatch } = useContext(CartContext);
  const [quantity, setQuantity] = useState(item.quantity);

  const changeQuantity = (q: number) => {
    setQuantity(q);
    const newItem = {
      ...item,
      quantity: q,
    };
    dispatch({ type: "setQuantity", payload: newItem });
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Row>
          <Col xs={3} xl={2} className="d-flex align-items-center">
            <div className="d-flex align-items-center">
              <Image
                className="img-fluid"
                src={photo?.src + "/200/200"}
                alt={item.id}
                width={200}
                height={200}
              />
            </div>
          </Col>
          <Col className="d-flex flex-column">
            <div className="d-flex flex-row justify-content-between">
              <div>
                <Card.Title>
                  {photo?.name + " by " + photo?.photographer}
                </Card.Title>
                <p>{t(`sizes.${item.size}`)}</p>
              </div>
              <div>
                <Button
                  className="btn-block"
                  variant="danger"
                  onClick={() => dispatch({ type: "delete", payload: item })}
                >
                  <FontAwesomeIcon icon={faTrashCan} className="me-2" />
                  {t("cart:delete")}
                </Button>
              </div>
            </div>
            <div className="mt-auto mb-0">
              <Row>
                <Col xs={6}>
                  <InputGroup>
                    <Button
                      variant="outline-primary"
                      onClick={() => changeQuantity(quantity - 1)}
                      disabled={quantity === 1}
                    >
                      -
                    </Button>
                    <Form.Control
                      className="text-center"
                      type="number"
                      aria-label={t("quantity")}
                      value={quantity}
                      onChange={(e) => changeQuantity(Number(e.target.value))}
                      min={1}
                      required
                    />
                    <Button
                      variant="outline-primary"
                      onClick={() => changeQuantity(quantity + 1)}
                    >
                      +
                    </Button>
                  </InputGroup>
                </Col>
                <Col
                  xs={6}
                  className="d-flex align-content-center justify-content-end"
                >
                  <Card.Title>
                    {item.quantity +
                      "x " +
                      photo?.price.toLocaleString(locale, {
                        style: "currency",
                        currency: "CAD",
                      })}
                  </Card.Title>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
