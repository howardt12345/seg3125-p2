import { CartContext, ICartItem } from "@api/cart";
import { IPhotoData } from "@lib/photo-data";
import { Size } from "@lib/product-consts";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { Breadcrumbs } from "../breadcrumb";
import { NavbarComponent } from "../Navbar";
import { StarRating } from "../starRating";
import { ProductForm } from "./productForm";

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
              <div
                dangerouslySetInnerHTML={{ __html: photo.description }}
              />
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );
}
