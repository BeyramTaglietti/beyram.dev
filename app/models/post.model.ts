export type Post = {
  fields: Fields;
};

export type Fields = {
  background: { fields: { file: { url: string } } };
  link: string;
  title: string;
  shortDescription: string;
  readingTime: number;
  date: Date;
};
