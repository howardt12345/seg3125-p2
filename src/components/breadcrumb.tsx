import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { Navbar, Nav } from "react-bootstrap";

export const Breadcrumbs = ({
  category = "",
  photo,
}: {
  category?: string;
  photo?: {
    name: string;
    path: string;
  };
}) => {
  const { t } = useTranslation("shop");

  return (
    <Navbar>
      <Nav as="ul">
        <Nav.Item as="li">
          <Link aria-current="page" href="/shop">
            <a className="text-decoration-none text-muted nav-link">
              {t("categories.all")}
            </a>
          </Link>
        </Nav.Item>
        {category && category !== "all" && (
          <>
            <Nav.Item as="li" className="d-flex align-items-center">
              <FontAwesomeIcon
                icon={faAngleRight}
                aria-hidden="true"
                className="text-muted"
                size="xs"
              ></FontAwesomeIcon>
            </Nav.Item>
            <Nav.Item as="li">
              <Link aria-current="page" href={`/shop/${category}`}>
                <a className="text-decoration-none text-muted nav-link">
                  {t(`categories.${category}`)}
                </a>
              </Link>
            </Nav.Item>
          </>
        )}
        {photo && (
          <>
            <Nav.Item as="li" className="d-flex align-items-center">
              <FontAwesomeIcon
                icon={faAngleRight}
                aria-hidden="true"
                className="text-muted"
                size="xs"
              ></FontAwesomeIcon>
            </Nav.Item>
            <Nav.Item as="li">
              <Link aria-current="page" href={`/product/${photo.path}`}>
                <a className="text-decoration-none text-muted nav-link">
                  {photo.name}
                </a>
              </Link>
            </Nav.Item>
          </>
        )}
      </Nav>
    </Navbar>
  );
};
