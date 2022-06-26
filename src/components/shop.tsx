import { IPhotoTile } from "@lib/photo-data";
import { useRouter } from "next/router";

export default function Shop({ photos } : { photos: IPhotoTile[] }) {
  const router = useRouter();
  const { asPath, locale } = router;
  const { q, sort } = router.query;
  
  return (
    <div>
      <p>{asPath}</p>
    </div>
  );
}
