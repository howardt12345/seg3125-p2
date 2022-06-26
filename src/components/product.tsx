import { IPhotoData } from "@lib/photo-data";
import { useRouter } from "next/router";

export default function Product({ photo } : { photo: IPhotoData }) {
  const router = useRouter();
  const { asPath, locale } = router;
  const { q, sort } = router.query;

  console.log(photo);
  
  return (
    <div>
      <p>{asPath}</p>
    </div>
  );
}
