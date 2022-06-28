import { StarRating } from "@components/starRating";
import { IPhotoTile } from "@lib/photo-data";
import { Card, Col, Row } from "react-bootstrap";

export const PhotoTile = ({ photo }: { photo: IPhotoTile }) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={photo.src + "/200/200"} />
      <Card.Body>
        <Row>
          <Col>
            <Card.Title>{photo.name}</Card.Title>
            <Card.Text>{photo.photographer}</Card.Text>
          </Col>
          <Col className="text-end">
            <Card.Title>{"$" + photo.price}</Card.Title>
            <StarRating rating={photo.rating} />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
