import { Cart, CartContext, ICartItem } from "@api/cart";
import { CartInfo } from "@components/cart/cartInfo";
import { NavbarComponent } from "@components/Navbar";
import { IPhotoTile } from "@lib/photo-data";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";

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
  const { t } = useTranslation("checkout");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  const [show, setShow] = useState(false);

  useEffect(() => {
    setCart(state.cart);
  }, [state.cart]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log({
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      province,
      postalCode,
      cardNumber,
      cardName,
      cardExpiry,
      cardCvv,
    });

    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    dispatch({ type: "clear", payload: {} as ICartItem });
    router.push("/shop");
  };

  return (
    <div>
      <NavbarComponent />
      <Container fluid="lg">
        <h1 className="display-5 mt-2 pb-3 border-bottom">{t("checkout")}</h1>
        <Row>
          <Col lg={8} className="pt-3">
            <h3 className="mb-2">{t("delivery_info")}</h3>
            <Form noValidate onSubmit={handleSubmit} id="submit-form">
              <Row className="mb-2">
                <Col md={6}>
                  <Form.Group controlId="formFirstName">
                    <Form.Label>{t("first_name")}</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={t('enter_first_name')}
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formLastName">
                    <Form.Label>{t('last_name')}</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={t('enter_last_name')}
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group controlId="formEmail" className="mb-2">
                <Form.Label>{t('email')}</Form.Label>
                <Form.Control
                  type="email"
                  placeholder={t('enter_email')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formPhone" className="mb-2">
                <Form.Label>{t('phone')}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t('enter_phone')}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formAddress" className="mb-2">
                <Form.Label>{t('address')}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t('enter_address')}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Form.Group>
              <Row className="mb-2">
                <Col md={4}>
                  <Form.Group controlId="formCity">
                    <Form.Label>{t('city')}</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={t('enter_city')}
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="formProvince">
                    <Form.Label>{t('province_state')}</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={t('enter_province_state')}
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="formZip">
                    <Form.Label>{t('zip_postal')}</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={t('enter_zip_postal')}
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <h3 className="mb-2 mt-4 pt-4 border-top">{t('payment_info')}</h3>
              <Form.Group controlId="formCardNumber" className="mb-2">
                <Form.Label>{t('card_number')}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t('enter_card_number')}
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
              </Form.Group>
              <Row className="mb-2">
                <Col md={6}>
                  <Form.Group controlId="formCardName">
                    <Form.Label>{t('card_name')}</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={t('enter_card_name')}
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group controlId="formCardExpiration" className="mb-2">
                    <Form.Label>{t('expiration_date')}</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group controlId="formCardCvv" className="mb-2">
                    <Form.Label>{t('cvv')}</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={t('enter_cvv')}
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
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
          <Modal.Title>Thank you for ordering!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Your receipt has been sent to your email. You can check the link
            attached to the email to check your delivery progress.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-primary" onClick={handleClose}>
            Close
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
          <h5 className="mb-2">{t('your_order')}</h5>
        </Col>
        <Col className="text-end">
          <Link href="/cart">
            <a className="text-muted">{t('edit')}</a>
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
