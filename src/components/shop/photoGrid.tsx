import { IPhotoTile } from "@lib/photo-data";
import { Sorting } from "@lib/shop-consts";
import { useEffect, useState } from "react";
import { Row, Col, Navbar, Nav, Dropdown } from "react-bootstrap";
import { PhotoTile } from "./PhotoTile";
import { useTranslation } from "next-i18next";

export const PhotoGrid = ({ photos }: { photos: IPhotoTile[] }) => {
  const { t } = useTranslation("shop");

  const [sorting, setSorting] = useState<Sorting>(Sorting.name_asc);
  const [sortedPhotos, setSortedPhotos] = useState<IPhotoTile[]>(photos);

  useEffect(() => {
    setSortedPhotos(photos);
  }, [photos]);

  const handleSortingChange = (sort: Sorting) => {
    setSorting(sort);
    switch (sort) {
      case Sorting.price_asc:
        setSortedPhotos(photos.sort((a, b) => a.price - b.price));
        break;
      case Sorting.price_desc:
        setSortedPhotos(photos.sort((a, b) => b.price - a.price));
        break;
      case Sorting.rating_asc:
        setSortedPhotos(photos.sort((a, b) => a.rating - b.rating));
        break;
      case Sorting.rating_desc:
        setSortedPhotos(photos.sort((a, b) => b.rating - a.rating));
        break;
      case Sorting.name_asc:
        setSortedPhotos(photos.sort((a, b) => a.name.localeCompare(b.name)));
        break;
      case Sorting.name_desc:
        setSortedPhotos(photos.sort((a, b) => b.name.localeCompare(a.name)));
        break;
      case Sorting.photographer_asc:
        setSortedPhotos(
          photos.sort((a, b) => a.photographer.localeCompare(b.photographer))
        );
        break;
      case Sorting.photographer_desc:
        setSortedPhotos(
          photos.sort((a, b) => b.photographer.localeCompare(a.photographer))
        );
        break;
      default:
        setSortedPhotos(photos);
    }
  };

  return (
    <>
      <Navbar bg="light" className="border-top border-bottom px-3">
        <Navbar.Text>
          {`${photos.length} photo${photos.length !== 1 ? "s" : ""}`}
        </Navbar.Text>
        <Nav className="ms-auto">
          <Nav.Item>
            <Dropdown align="end">
              <Dropdown.Toggle variant="outline-secondary" id="sort-dropdown">
                Sort
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {Object.keys(Sorting).map((key) => (
                  <Dropdown.Item
                    key={key}
                    onClick={() =>
                      handleSortingChange(Sorting[key as keyof typeof Sorting])
                    }
                    active={sorting === Sorting[key as keyof typeof Sorting]}
                  >
                    {t(`sorting.${key}`)}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Nav.Item>
        </Nav>
      </Navbar>
      <Row className="px-4 py-3">
        {sortedPhotos &&
          sortedPhotos.map((photo) => (
            <Col sm={6} lg={4} xxl={3} key={photo.id} className="p-1">
              <PhotoTile key={photo.id} photo={photo} />
            </Col>
          ))}
      </Row>
    </>
  );
};
