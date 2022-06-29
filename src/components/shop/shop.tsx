import { NavbarComponent } from "@components/Navbar";
import { IPhotoTile } from "@lib/photo-data";
import { useRouter } from "next/router";
import { Col, Container, Row } from "react-bootstrap";
import { CategoryList } from "./categoryList";
import { PhotoGrid } from "./photoGrid";
import { PhotoTile } from "./PhotoTile";
import { ShopHeader } from "./ShopHeader";

export default function Shop({
  photos,
  category,
}: {
  photos: IPhotoTile[];
  category: string;
}) {
  const router = useRouter();
  const { asPath, locale } = router;
  const { q, sort } = router.query;

  return (
    <>
      <NavbarComponent />
      <Container fluid="xxl" className="pe-0">
        <ShopHeader category={category} />
        <Row>
          <Col md={3} className="border-top">
            <CategoryList selected={category} />
          </Col>
          <Col className="ps-0 border-start">
            <PhotoGrid photos={photos} />
          </Col>
        </Row>
      </Container>
    </>
  );
}
