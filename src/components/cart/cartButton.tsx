import Link from "next/link";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "next-i18next";

export const CartButton = ({ count }: { count: number }) => {
  const { t } = useTranslation("shop");
  return (
    <div className="cart-button position-relative">
      <Link href="/cart">
        <a className="text-decoration-none text-reset d-flex flex-row">
          <span>{t("cart")}</span>
          <div className="ms-1">
            <FontAwesomeIcon icon={faCartShopping} />
            {count > 0 && (
              <span className="position-absolute top-25 start-100 translate-middle badge rounded-pill bg-primary">
                {count}
                <span className="visually-hidden">unread messages</span>
              </span>
            )}
          </div>
        </a>
      </Link>
    </div>
  );
};
