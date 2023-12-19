export type Project = {
  fields: Fields;
};

export type Fields = {
  background: { fields: { file: { url: string } } };
  link: string;
  title: string;
  description: string;
};
