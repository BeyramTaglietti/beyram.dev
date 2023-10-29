import contentful from "contentful";

export const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE ?? "",
  accessToken: process.env.CONTENTFUL_ACCESSTOKEN ?? "",
});
