import Custom404 from "@components/404";
import { getPhotoTileData } from "@lib/photo-data";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getStaticProps = async ({ locale }: { locale: string }) => {
  const photos = getPhotoTileData();
  return {
    props: {
      photos,
      category: "all",
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
export default Custom404;