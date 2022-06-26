import type { GetStaticProps } from "next";
import { getPhotoTileData } from "@lib/photo-data";
import Shop from "@components/shop";

export const getStaticProps: GetStaticProps = async () => {
  const photos = getPhotoTileData();
  return {
    props: {
      photos,
    },
  };
};

export default Shop;
