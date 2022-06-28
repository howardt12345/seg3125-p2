import { CartAPI, ICartItem } from "@api/commerce";
import { IPhotoData } from "@lib/photo-data";
import { Size } from "@lib/product-consts";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { Breadcrumbs } from "./breadcrumb";
import { NavbarComponent } from "./Navbar";
import { StarRating } from "./starRating";

export default function Product({ photo }: { photo: IPhotoData }) {
  const router = useRouter();
  const { asPath, locale } = router;
  const { q, sort } = router.query;

  return (
    <div>
      <NavbarComponent />
      <Container fluid="xxl">
        <Breadcrumbs
          category={photo.category}
          photo={{ name: photo.name, path: photo.id }}
        />
        <Container className="pt-lg-5">
          <Row className="justify-content-md-center">
            <Col lg="4">
              <Image
                className="img-fluid"
                src={photo.src + "/400/500"}
                alt={photo.name}
                width={400}
                height={500}
              />
            </Col>
            <Col lg="4">
              <h5 className="fw-normal">{photo.photographer}</h5>
              <h1 className="display-3 fw-normal">{photo.name}</h1>
              <Row>
                <Col>
                  <h5 className="fw-normal">{"$" + photo.price}</h5>
                </Col>
                <Col className="text-end">
                  <StarRating rating={photo.rating} />
                </Col>
              </Row>
              <ProductForm id={photo.id} />
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );
}

const ProductForm = ({ id }: { id: string }) => {
  const { t } = useTranslation("product");

  const [size, setSize] = useState<Size>();
  const [quantity, setQuantity] = useState(1);

  const [validated, setValidated] = useState(false);

  const submit = (event: any) => {
    event.preventDefault();
    
    const form = event.currentTarget;
    if (form.checkValidity() === false || !size) {
      event.stopPropagation();
    } else {
      setValidated(true);
      addToCart();
    }

    setValidated(true);
  };

  const addToCart = () => {
    const item = {
      id: id,
      size: size,
      quantity: quantity,
    } as ICartItem;
    CartAPI.getInstance().addToCart(item);
  };

  return (
    <div>
      <Form noValidate validated={validated} onSubmit={submit}>
        <Form.Group controlId="form">
          <Form.Select
            aria-label={t("select-print-size")}
            value={size}
            onChange={(e) => setSize(Size[e.target.value as keyof typeof Size])}
            required
          >
            <option value="">{t("select-print-size")}</option>
            {Object.keys(Size).map((size) => {
              return (
                <option key={size} value={size}>
                  {t(`sizes.${size}`)}
                </option>
              );
            })}
          </Form.Select>
        </Form.Group>

        <InputGroup>
          <Button onClick={() => setQuantity(quantity - 1)}>Subtract</Button>
          <Form.Control
            type="number"
            aria-label={t("quantity")}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min={1}
            required
          />
          <Button onClick={() => setQuantity(quantity + 1)}>Add</Button>
        </InputGroup>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};
