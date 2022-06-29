import { StarRating } from "@components/starRating";
import { IPhotoTile } from "@lib/photo-data";
import Link from "next/link";
import { Card, Col, Row } from "react-bootstrap";

export const PhotoTile = ({ photo }: { photo: IPhotoTile }) => {
  return (
    <Card>
      <Link href={`/product/${photo.id}`}>
        <a className="text-decoration-none text-reset">
          <Card.Img variant="top" src={photo.src + "/200/200"} />
          <Card.Body>
            <Row>
              <Col className="pe-0">
                <Card.Title>{photo.name}</Card.Title>
                <Card.Text>{photo.photographer}</Card.Text>
              </Col>
              <Col className="text-end ps-0">
                <Card.Title>
                  {photo.price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "CAD",
                  })}
                </Card.Title>
                <StarRating rating={photo.rating} />
              </Col>
            </Row>
          </Card.Body>
        </a>
      </Link>
    </Card>
  );
};
