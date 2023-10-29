import { useLoaderData } from "@remix-run/react";
import { client } from "~/contentful/config.server";

import contentTypes from "@contentful/rich-text-types";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export const meta: MetaFunction<typeof loader> = ({ data: post }) => {
  return [
    { title: post?.fields.title },
    { name: "description", content: post?.fields.shortDescription },
    {
      name: "og:image",
      content: [`https:${(post as any).fields.background.fields.file.url}`],
    },
  ];
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const response = await client.getEntries({
    content_type: "post",
    "fields.link": params.link,
  });

  return response.items[0];
};

const Post = () => {
  const post = useLoaderData<typeof loader>();

  return (
    <>
      <div className="flex justify-center items-center flex-col py-4 lg:py-12">
        <div className="w-[90%] lg:w-[80%] xl:w-[60%]">
          <h1
            className="text-4xl w-full font-bold"
            style={{ viewTransitionName: "post-title" }}
          >
            {post.fields.title as string}
          </h1>

          <div className="mt-4 text-justify flex flex-col gap-6">
            <img
              src={`https:${(post.fields.background as any).fields.file.url}`}
              alt={post.fields.title as string}
              height={300}
              width={600}
              className="w-full h-full object-cover"
              style={{ viewTransitionName: "post-image" }}
            />
            {documentToReactComponents(
              post.fields.postContent as any,
              renderOptions as any
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;

const renderOptions = {
  renderNode: {
    "embedded-asset-block": (node: any) => {
      return (
        <div className="flex justify-center py-4">
          <img
            src={`https:${node.data.target.fields.file.url}`}
            height={node.data.target.fields.file.details.image.height}
            width={node.data.target.fields.file.details.image.width}
            alt="blog"
          />
        </div>
      );
    },
    [contentTypes.INLINES.HYPERLINK]: (
      { data }: { data: any },
      children: string
    ) => (
      <a
        className="font-bold text-blue-600"
        target="_blank"
        rel="noreferrer"
        href={data.uri}
      >
        {children}
      </a>
    ),
  },
  renderMark: {
    [contentTypes.MARKS.BOLD]: (text: string) => (
      <span className="font-bold text-orange-400">{text}</span>
    ),
  },
};
