import { PostModel } from "~/models/post.model";

export const getPostSEO = (post: PostModel) => {
  return [
    { title: post.title },
    { name: "description", content: post.shortDescription },
    {
      name: "og:title",
      content: post.title,
    },
    {
      name: "og:description",
      content: post.shortDescription,
    },
    {
      name: "og:image",
      content: [`https:${post.backgroundUrl}`],
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: post.title,
    },
    {
      name: "twitter:description",
      content: post.shortDescription,
    },
    {
      name: "twitter:image",
      content: `https:${post.backgroundUrl}`,
    },
  ];
};
