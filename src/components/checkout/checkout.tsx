import { Cart, CartContext, ICartItem } from "@api/cart";
import { CartInfo } from "@components/cart/cartInfo";
import { NavbarComponent } from "@components/Navbar";
import { IPhotoTile } from "@lib/photo-data";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import CreditCardInput from "react-credit-card-input";

import {
  Container,
  Row,
  Col,
  Form,
  Card,
  Modal,
  Button,
} from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";

export default function Checkout({ photos }: { photos: IPhotoTile[] }) {
  const [cart, setCart] = useState<Cart>(new Cart());
  const { state, dispatch } = useContext(CartContext);
  const router = useRouter();
  const { t } = useTranslation(["common", "checkout"]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const [cardName, setCardName] = useState("");

  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    setCart(state.cart);
  }, [state.cart]);

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      setValidated(true);
      handleOpen();
    }

    setValidated(true);
  };

  const handleOpen = () => setShow(true);

  const handleClose = () => {
    setShow(false);
    dispatch({ type: "clear", payload: {} as ICartItem });
    router.push("/shop");
  };

  return (
    <div>
      <NavbarComponent />
      <Container fluid="lg">
        <h1 className="display-5 mt-2 pb-3 border-bottom">{t("checkout:checkout")}</h1>
        <Row>
          <Col lg={8} className="pt-3">
            <h3 className="mb-2">{t("checkout:delivery_info")}</h3>
            <Form
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
              id="submit-form"
            >
              <Row className="mb-2">
                <Col md={6}>
                  <Form.Group controlId="formFirstName">
                    <Form.Label>{t("checkout:first_name")}</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={t("checkout:enter_first_name")}
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formLastName">
                    <Form.Label>{t("checkout:last_name")}</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={t("checkout:enter_last_name")}
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group controlId="formEmail" className="mb-2">
                <Form.Label>{t("checkout:email")}</Form.Label>
                <Form.Control
                  type="email"
                  placeholder={t("checkout:enter_email")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formPhone" className="mb-2">
                <Form.Label>{t("checkout:phone")}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t("checkout:enter_phone")}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formAddress" className="mb-2">
                <Form.Label>{t("checkout:address")}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t("checkout:enter_address")}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </Form.Group>
              <Row className="mb-2">
                <Col md={4}>
                  <Form.Group controlId="formCity">
                    <Form.Label>{t("checkout:city")}</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={t("checkout:enter_city")}
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="formProvince">
                    <Form.Label>{t("checkout:province_state")}</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={t("checkout:enter_province_state")}
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="formZip">
                    <Form.Label>{t("checkout:zip_postal")}</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={t("checkout:enter_zip_postal")}
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <h3 className="mb-2 mt-4 pt-4 border-top">{t("checkout:payment_info")}</h3>

              <Row className="mb-2">
                <Col md={6} xl={5}>
                  <Form.Group
                    controlId="creditCardInput"
                    className="mb-2 d-flex flex-column"
                  >
                    <Form.Label>{t("checkout:card_name")}</Form.Label>
                    <CreditCardInput
                      customTextLabels={{
                        invalidCardNumber: t("checkout:invalid_card_number"),
                        expiryError: {
                          invalidExpiryDate: t("checkout:invalid_expiration_date"),
                          monthOutOfRange: t("checkout:month_out_of_range"),
                          yearOutOfRange: t("checkout:year_out_of_range"),
                          dateOutOfRange: t("checkout:date_out_of_range"),
                        },
                        invalidCvc: t("checkout:invalid_cvv"),
                        cardNumberPlaceholder: t("checkout:card_number_placeholder"),
                        expiryPlaceholder: t("checkout:expiry_placeholder"),
                        cvcPlaceholder: t("checkout:cvv_placeholder"),
                      }}
                      fieldStyle={{
                        border: "1px solid #ced4da",
                      }}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6} xl={7}>
                  <Form.Group controlId="formCardName">
                    <Form.Label>{t("checkout:card_name")}</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={t("checkout:enter_card_name")}
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Col>
          <Col lg={4} className="pt-3">
            <CartPreview cart={cart} photos={photos} />
            <div className="mt-2">
              <CartInfo cart={cart} confirm={true} />
            </div>
          </Col>
        </Row>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t("checkout:thank_you_for_ordering")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{t("checkout:receipt_notice")}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-primary" onClick={handleClose}>
            {t("close")}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

const CartPreview = ({
  cart,
  photos,
}: {
  cart: Cart;
  photos: IPhotoTile[];
}) => {
  const { t } = useTranslation("checkout");

  return (
    <>
      <Row>
        <Col>
          <h5 className="mb-2">{t("checkout:your_order")}</h5>
        </Col>
        <Col className="text-end">
          <Link href="/cart">
            <a className="text-muted">{t("checkout:edit")}</a>
          </Link>
        </Col>
      </Row>
      <div
        style={{
          overflow: "auto",
          whiteSpace: "nowrap",
        }}
      >
        {cart.getUniqueItems().map((item) => {
          const photo = photos.find((photo) => photo.id === item.id);
          return (
            <Card key={item.id} className="d-inline-block p-2 me-2">
              <Image
                className="img-fluid"
                src={photo?.src + "/100/100"}
                alt={item.id}
                width={100}
                height={100}
              />
            </Card>
          );
        })}
      </div>
    </>
  );
};
