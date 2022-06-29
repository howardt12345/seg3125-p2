import Product from "@components/product/product";
import { getPhotoData, getPhotoIds } from "@lib/photo-data";
import { GetStaticPaths, GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getStaticProps = async ({
  params,
  locale,
}: {
  params: any;
  locale: any;
}) => {
  const photo = await getPhotoData(params?.photo as string);
  return {
    props: {
      photo,
      ...(await serverSideTranslations(locale, ["common", "shop", "product"])),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getPhotoIds();
  return {
    paths,
    fallback: false,
  };
};

export default Product;
