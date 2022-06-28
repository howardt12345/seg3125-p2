import { useTranslation } from "next-i18next";

export const ShopHeader = ({ category }: { category: string }) => {
  const { t } = useTranslation("shop");

  return <h1>{t(`categories.${category}`)}</h1>;
};
