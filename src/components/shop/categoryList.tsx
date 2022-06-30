import { categories } from "@lib/shop-consts";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { ListGroup, ListGroupItem } from "react-bootstrap";

export const CategoryList = ({
  selected,
  disabled = [],
}: {
  selected: string;
  disabled?: string[];
}) => {
  const { t } = useTranslation("shop");

  return (
    <div className="category-list">
      <h3 className="mt-2 px-3 fw-normal">Categories</h3>
      <ListGroup variant="flush" as="ul">
        {categories &&
          categories.map((category) => (
            <CategoryItem
              key={category}
              category={category}
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
  selected,
  disabled,
}: {
  category: string;
  selected: string;
  disabled?: boolean;
}) => {
  const { t } = useTranslation("shop");

  return (
    <ListGroup.Item as="li" active={selected === category} disabled={disabled}>
      <Link href={`/shop/${category}`}>
        <a
          className={`text-decoration-none text-reset`}
        >
          {t(`categories.${category}`)}
        </a>
      </Link>
    </ListGroup.Item>
  );
};
