import contentful from "contentful";

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE ?? "",
  accessToken: process.env.CONTENTFUL_ACCESSTOKEN ?? "",
  host:
    process.env.NODE_ENV === "development"
      ? "preview.contentful.com"
      : undefined,
});

export const getContentfulData = async <T>({
  content_type,
  ...rest
}: {
  content_type: string;
  [key: string]: any;
}) => {
  const res = await client.getEntries({ content_type, ...rest });
  const data = res.items as any as { fields: T }[];

  return data;
};
