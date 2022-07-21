import { IPhotoTile } from "@lib/photo-data";
import { categories } from "@lib/shop-consts";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { Badge, ListGroup } from "react-bootstrap";

export const CategoryList = ({
  selected,
  photos,
  disabled = [],
}: {
  selected: string;
  photos: IPhotoTile[];
  disabled?: string[];
}) => {
  const { t } = useTranslation("shop");

  const showCount = false;

  return (
    <div className="category-list">
      <h3 className="mt-2 mb-3 px-3 fw-normal">{t("categories_title")}</h3>
      <ListGroup variant="flush" as="ul">
        <ListGroup.Item
          as="li"
          active={selected === "all"}
          disabled={disabled.includes("all")}
        >
          <Link href="/shop">
            <a className={`text-decoration-none text-reset fw-bold`}>
              <div className="d-flex justify-content-between text-center align-items-center">
                {t("categories.all")}
                {showCount && (
                  <Badge bg="light" text="dark">
                    {photos.length}
                  </Badge>
                )}
              </div>
            </a>
          </Link>
        </ListGroup.Item>
        {categories &&
          categories.map((category) => (
            <CategoryItem
              key={category}
              category={category}
              count={photos.filter((p) => p.category === category).length}
              showCount={showCount}
              disabled={disabled ? disabled.includes(category) : false}
              selected={selected}
            />
          ))}
      </ListGroup>
    </div>
  );
};

const CategoryItem = ({
  category,
  count,
  showCount,
  selected,
  disabled,
}: {
  category: string;
  count: number;
  showCount: boolean;
  selected: string;
  disabled?: boolean;
}) => {
  const { t } = useTranslation("shop");

  return (
    <ListGroup.Item as="li" active={selected === category} disabled={disabled}>
      <Link href={`/shop/${category}`}>
        <a className={`text-decoration-none text-reset`}>
          <div className="d-flex justify-content-between text-center align-items-center">
            {t(`categories.${category}`)}
            {showCount && (
              <Badge bg="light" text="dark">
                {count}
              </Badge>
            )}
          </div>
        </a>
      </Link>
    </ListGroup.Item>
  );
};
