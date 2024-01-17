import type { Image } from "./image.model";

export type PostModel = {
  background: Image;
  link: string;
  title: string;
  shortDescription: string;
  readingTime: number;
  date: Date;
  postContent: any;
};
