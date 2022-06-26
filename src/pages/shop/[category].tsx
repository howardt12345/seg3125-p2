import type {
  GetStaticPaths,
  GetStaticProps,
} from "next";
import { getPhotoTileData } from "@lib/photo-data";
import Shop from "@components/shop";
import { categories } from "@lib/photo-data";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const photos = getPhotoTileData(params?.category as string);
  return {
    props: {
      photos,
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
