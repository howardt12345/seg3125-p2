import type { GetStaticPaths, GetStaticProps } from "next";
import { getPhotoTileData } from "@lib/photo-data";
import Shop from "@components/shop/shop";
import { categories } from "@lib/shop-consts";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getStaticProps = async ({
  params,
  locale,
}: {
  params: any;
  locale: string;
}) => {
  const photos = getPhotoTileData(params?.category as string);
  return {
    props: {
      photos,
      category: params?.category as string,
      ...(await serverSideTranslations(locale, ["common", "shop", "product"])),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = categories.map((category) => {
    return { params: { category } };
  });
  return {
    paths,
    fallback: true,
  };
};

export default Shop;
