import { CartContext, ICartItem } from "@api/cart";
import { StarRating } from "@components/starRating";
import { IPhotoTile } from "@lib/photo-data";
import { Size } from "@lib/product-consts";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useContext } from "react";
import { Card, Col, Dropdown, DropdownButton, Row } from "react-bootstrap";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";

export const PhotoTile = ({ photo }: { photo: IPhotoTile }) => {
  const { dispatch } = useContext(CartContext);
  const { t } = useTranslation("product");
  const router = useRouter();
  const { asPath, locale } = router;

  const quickAdd = (size: Size) => {
    const item = {
      id: photo.id,
      size,
      quantity: 1,
      itemPrice: photo.price,
    } as ICartItem;

    dispatch({ type: "add", payload: item });
  };

  return (
    <Card>
      <Card.Body>
        <Link href={`/product/${photo.id}`}>
          <a className="text-decoration-none text-reset">
            <Card.Img variant="top" src={photo.src + "/200/200"} />
            <Row className="border-bottom pb-2 mt-2">
              <Col className="pe-0">
                <Card.Title>{photo.name}</Card.Title>
                <Card.Text>{photo.photographer}</Card.Text>
              </Col>
              <Col className="text-end ps-0">
                <Card.Title>
                  {photo.price.toLocaleString(locale, {
                    style: "currency",
                    currency: "CAD",
                  })}
                </Card.Title>
                <StarRating rating={photo.rating} />
              </Col>
            </Row>
          </a>
        </Link>
        <div className="mt-3 d-flex justify-content-end">
          <Dropdown align="end">
            <Dropdown.Toggle variant="outline-primary" id="quick-add-dropdown">
              <FontAwesomeIcon icon={faCartPlus} className="me-2" />
              {t("quick_add")}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {Object.keys(Size).map((size) => {
                return (
                  <Dropdown.Item
                    key={size}
                    value={size}
                    onClick={() => quickAdd(Size[size as keyof typeof Size])}
                  >
                    {t(`sizes.${size}`)}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Card.Body>
    </Card>
  );
};
