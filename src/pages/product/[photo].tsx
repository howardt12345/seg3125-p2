import Product from "@components/product";
import { getPhotoData, getPhotoIds } from "@lib/photo-data";
import { GetStaticPaths, GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const photo = await getPhotoData(params?.photo as string);
  return {
    props: {
      photo,
    },
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getPhotoIds();
  return {
    paths,
    fallback: true,
  };
}

export default Product;