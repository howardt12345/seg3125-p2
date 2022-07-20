import { useTranslation } from "next-i18next";
import { Breadcrumbs } from "@components/breadcrumb";

export const ShopHeader = ({ category }: { category: string }) => {
  const { t } = useTranslation("shop");

  return (
    <div className="shop-header">
      <Breadcrumbs category={category} />
      <h1 className="display-3">{t(`categories.${category}`)}</h1>
    </div>
  );
};
