import { IPhotoData } from "@lib/photo-data";
import Image from "next/image";
import { useRouter } from "next/router";
import { Col, Container, Row } from "react-bootstrap";
import { Breadcrumbs } from "../breadcrumb";
import { NavbarComponent } from "../Navbar";
import { StarRating } from "../starRating";
import { ProductForm } from "./productForm";
import { ReviewForm } from "./reviewForm";
import Zoom from "react-medium-image-zoom";

import "react-medium-image-zoom/dist/styles.css";

export default function Product({ photo }: { photo: IPhotoData }) {
  const router = useRouter();
  const { locale } = router;
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
              <Zoom>
                <Image
                  className="img-fluid"
                  src={photo.src + "/800/1000"}
                  alt={photo.name}
                  width={400}
                  height={500}
                />
              </Zoom>
            </Col>
            <Col lg="4">
              <h5 className="fw-normal">{photo.photographer}</h5>
              <h1 className="display-3 fw-normal">{photo.name}</h1>
              <Row>
                <Col>
                  <h5 className="fw-normal">
                    {photo.price.toLocaleString(locale, {
                      style: "currency",
                      currency: "CAD",
                    })}
                  </h5>
                </Col>
                <Col className="text-end">
                  <StarRating rating={photo.rating} />
                </Col>
              </Row>
              <ProductForm id={photo.id} itemPrice={photo.price} />
              <div dangerouslySetInnerHTML={{ __html: photo.description }} />
            </Col>
          </Row>
          <Row className="mt-5">
            <Col md={{ span: 8, offset: 2 }}>
              <ReviewForm />
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );
}
