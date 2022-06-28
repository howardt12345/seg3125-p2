import { IPhotoTile } from "@lib/photo-data";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { NavbarComponent } from "../Navbar";
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
      <ShopHeader category={category} />
      {photos &&
        photos.map((photo) => <PhotoTile key={photo.id} photo={photo} />)}
    </>
  );
}