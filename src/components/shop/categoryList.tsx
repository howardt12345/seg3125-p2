import { categories } from "@lib/categories";
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
        {categories && categories.map((category) => (
          <li key={category}>
            <Link href={`/shop/${category}`}>
              <a
                className={`text-decoration-none text-reset ${
                  selected === category ? "text-primary" : ""
                }`}
              >
                {t(`categories.${category}`)}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
