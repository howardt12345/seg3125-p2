import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { Sorting } from "./shop-consts";

export const photosDir = "/content/photos";

export interface IPhotoTile {
  id: string;
  name: string;
  photographer: string;
  src: string;
  category: string;
  price: number;
  rating: number;
}

export interface IPhotoData {
  id: string;
  name: string;
  photographer: string;
  category: string;
  src: string;
  price: number;
  rating: number;
  available: boolean;
  description: string;
}

const getPhotoPath = () => `${process.cwd()}/public${photosDir}`;

export const getPhotoTileData = (category?: string, ids?: string[]) => {
  const photoPath = getPhotoPath();

  let photos = fs
    .readdirSync(photoPath)
    .map((path) => path.replace(/\.mdx?$/, ""))
    .map((slug) => {
      const filePath = `${photoPath}/${slug}.mdx`;
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContents);

      const photo: IPhotoTile = {
        id: slug,
        name: data.name,
        photographer: data.photographer,
        category: data.category,
        src: data.src,
        price: data.price,
        rating: data.rating,
      };

      return photo;
    });

  if (category) {
    photos = photos.filter(
      (photo) => photo.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (ids) {
    photos = photos.filter((photo) => ids.includes(photo.id));
  }

  return photos;
};

export const getPhotoIds = (locale: string) => {
  const photoPath = getPhotoPath();

  return fs.readdirSync(photoPath).map((fileName) => {
    return {
      params: {
        photo: fileName.replace(/\.mdx$/, ""),
      },
      locale: locale,
    };
  });
};

export const getPhotoData = async (id: string) => {
  const photoPath = getPhotoPath();
  const filePath = `${photoPath}/${id}.mdx`;
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  const photo: IPhotoData = {
    id: id,
    name: data.name,
    photographer: data.photographer,
    category: data.category,
    src: data.src,
    price: data.price,
    rating: data.rating,
    available: data.available,
    description: contentHtml,
  };

  return photo;
};
