import { getPhotoTileData } from "@lib/photo-data";
import Shop from "@components/shop/shop";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getStaticProps = async ({ locale }: { locale: string }) => {
  const photos = getPhotoTileData();
  return {
    props: {
      photos,
      category: "all",
      ...(await serverSideTranslations(locale, ["common", "shop"])),
    },
  };
};

export default Shop;
