type ImageFile = {
  url: string;
  fileName: string;
};

type ImageFields = {
  file: ImageFile;
};

export type Image = {
  fields: ImageFields;
};
