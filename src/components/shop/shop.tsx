import { CartAPI } from "@api/commerce";
import { IPhotoTile } from "@lib/photo-data";
import { useRouter } from "next/router";
import { Container } from "react-bootstrap";
import { NavbarComponent } from "../Navbar";
import { CategoryList } from "./categoryList";
import { PhotoTile } from "./PhotoTile";
import { ShopHeader } from "./ShopHeader";

export default function Shop({
  photos,
  category,
}: {
  photos: IPhotoTile[];
  category: string;
}) {
  const router = useRouter();
  const { asPath, locale } = router;
  const { q, sort } = router.query;

  return (
    <>
      <NavbarComponent />
      <Container fluid="xxl">
        <ShopHeader category={category} />
        <CategoryList selected={category} />
        {photos &&
          photos.map((photo) => <PhotoTile key={photo.id} photo={photo} />)}
      </Container>
    </>
  );
}
