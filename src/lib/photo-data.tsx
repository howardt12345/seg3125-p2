import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export const photosDir = "/content/photos";

export const categories = [
  "abstract",
  "architecture",
  "black-and-white",
  "food",
  "landscapes",
  "macro",
  "nature",
  "night",
  "portraits",
  "product",
  "sport",
  "street",
  "wedding",
];

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

export enum Sorting {
  PRICE_ASC = "price_asc",
  PRICE_DESC = "price_desc",
  RATING = "rating_asc",
  NAME = "name_asc",
  PHOTOGRAPHER = "photographer_asc",
}

const getPhotoPath = () => `${process.cwd()}/public${photosDir}`;

export const getPhotoTileData = (category?: string, sorting?: Sorting) => {
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
        src: `${photosDir}/${slug}.jpg`,
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

  if (sorting) {
    switch (sorting) {
      case Sorting.PRICE_ASC:
        photos.sort((a, b) => a.price - b.price);
        break;
      case Sorting.PRICE_DESC:
        photos.sort((a, b) => b.price - a.price);
        break;
      case Sorting.RATING:
        photos.sort((a, b) => a.rating - b.rating);
        break;
      case Sorting.NAME:
        photos.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case Sorting.PHOTOGRAPHER:
        photos.sort((a, b) => a.photographer.localeCompare(b.photographer));
        break;
    }
  }

  return photos;
};

export const getPhotoIds = () => {
  const photoPath = getPhotoPath();

  return fs.readdirSync(photoPath).map((fileName) => {
    return {
      params: {
        photo: fileName.replace(/\.mdx$/, ""),
      },
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
    src: `${photosDir}/${id}.jpg`,
    price: data.price,
    rating: data.rating,
    available: data.available,
    description: contentHtml,
  };

  return photo;
};
