import { categories } from "@lib/shop-consts";
import { useTranslation } from "next-i18next";
import Link from "next/link";

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
      <ul className="list-unstyled">
        <li>
          <Link href="/shop">
            <a
              className={`text-decoration-none text-reset ${
                selected === "all" ? "text-primary" : ""
              }`}
            >
              {t("categories.all")}
            </a>
          </Link>
        </li>
        {categories &&
          categories.map((category) => (
            <CategoryItem
              key={category}
              category={category}
              disabled={disabled ? disabled.includes(category) : false}
              selected={selected}
            />
          ))}
      </ul>
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
    <li>
      <Link href={`/shop/${category}`}>
        <a
          className={`text-decoration-none ${
            selected === category
              ? "text-reset text-decoration-underline"
              : "text-muted"
          }`}
          style={{
            opacity: disabled ? 0.5 : 1,
          }}
        >
          {t(`categories.${category}`)}
        </a>
      </Link>
    </li>
  );
};
