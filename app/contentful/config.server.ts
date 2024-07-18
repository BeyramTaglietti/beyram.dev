import contentful from "contentful";

const settings = {
  space: process.env.CONTENTFUL_SPACE ?? "",
  accessToken: process.env.CONTENTFUL_ACCESSTOKEN ?? "",
  host:
    process.env.NODE_ENV === "development"
      ? "preview.contentful.com"
      : undefined,
};

const client = contentful.createClient(settings);

export const getContentfulData = async <T>({
  content_type,
  ...rest
}: {
  content_type: string;
  [key: string]: unknown;
}) => {
  const res = await client.getEntries({ content_type, ...rest });
  const data = res.items as unknown as { fields: T }[];

  return data;
};
