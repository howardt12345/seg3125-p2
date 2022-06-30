import Checkout from "@components/checkout/checkout";
import { getPhotoTileData } from "@lib/photo-data";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getStaticProps = async ({ locale }: { locale: string }) => {
  const photos = getPhotoTileData();
  return {
    props: {
      photos,
      category: "all",
      ...(await serverSideTranslations(locale, ["common", "checkout"])),
    },
  };
};

export default Checkout;
