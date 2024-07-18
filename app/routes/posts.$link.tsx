import { useLoaderData } from "@remix-run/react";
import { getContentfulData } from "~/contentful/config.server";

import {
  documentToReactComponents,
  Options,
} from "@contentful/rich-text-react-renderer";
import contentTypes from "@contentful/rich-text-types";
import { type LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import dayjs from "dayjs";
import { ReactNode } from "react";
import { BiSolidCalendarEvent, BiSolidTimeFive } from "react-icons/bi";
import InfoPill from "~/components/InfoPill";
import type { PostModel } from "~/models/post.model";

export const meta: MetaFunction<typeof loader> = ({ data: post }) => {
  return [
    { title: post?.fields.title },
    { name: "description", content: post?.fields.shortDescription },
    {
      name: "og:title",
      content: post?.fields.title,
    },
    {
      name: "og:description",
      content: post?.fields.shortDescription,
    },
    {
      name: "og:image",
      content: [`https:${post?.fields.background.fields.file.url}`],
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: post?.fields.title,
    },
    {
      name: "twitter:description",
      content: post?.fields.shortDescription,
    },
    {
      name: "twitter:image",
      content: `https:${post?.fields.background.fields.file.url}`,
    },
  ];
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const response = await getContentfulData<PostModel>({
    content_type: "post",
    "fields.link": params.link,
  });

  return response[0];
};

const Post = () => {
  const post = useLoaderData<typeof loader>();

  return (
    <div className="flex justify-center items-center flex-col pb-6">
      <div className="flex flex-col">
        <div className="flex flex-col gap-4 bg-primary rounded-xl p-4">
          <h1
            className="text-4xl w-full font-bold"
            style={{ viewTransitionName: "post-title" }}
          >
            {post.fields.title as string}
          </h1>
          <div
            className="flex flex-row gap-2"
            style={{ viewTransitionName: "post-metrics" }}
          >
            <InfoPill
              icon={<BiSolidTimeFive />}
              text={`${post.fields.readingTime} min read`}
            />
            <InfoPill
              icon={<BiSolidCalendarEvent />}
              text={dayjs(post.fields.date).format("MMMM YYYY")}
            />
          </div>
        </div>

        <div className="mt-4 text-justify flex flex-col gap-6">
          <div className="flex justify-center">
            <img
              src={`https:${post.fields.background.fields.file.url}`}
              alt={post.fields.title as string}
              className="w-full"
              style={{ viewTransitionName: "post-image" }}
            />
          </div>
          {documentToReactComponents(post.fields.postContent, renderOptions)}
        </div>
      </div>
    </div>
  );
};

export default Post;

const renderOptions: Options = {
  renderNode: {
    [contentTypes.BLOCKS.EMBEDDED_ASSET]: (node) => {
      return (
        <div className="flex justify-center py-4">
          <img
            src={`https:${node.data.target.fields.file.url}`}
            height={node.data.target.fields.file.details.image.height}
            width={node.data.target.fields.file.details.image.width}
            className="w-full"
            alt="blog"
            loading="lazy"
          />
        </div>
      );
    },
    [contentTypes.INLINES.HYPERLINK]: (node, children) => (
      <a
        className="font-bold text-blue-400 underline"
        target="_blank"
        rel="noreferrer"
        href={node.data.uri}
      >
        {children}
      </a>
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [contentTypes.BLOCKS.HEADING_2]: (node: any) => {
      return (
        <h2 className="text-3xl font-bold text-orange-400 text-left text-wrap">
          {node.content[0].value}
        </h2>
      );
    },
    [contentTypes.BLOCKS.UL_LIST]: (node) => {
      return (
        <ul className="list-disc list-inside">
          {node.content.map(({ content }: any) => (
            <li key={content[0].content[0].value} className="text-lg">
              <span className="font-bold text-orange-400">
                {content[0].content[0].value}
              </span>
              {content[0].content[1].value}
            </li>
          ))}
        </ul>
      );
    },
  },
  renderMark: {
    [contentTypes.MARKS.BOLD]: (text: ReactNode) => (
      <span className="font-bold text-orange-400">{text}</span>
    ),
    [contentTypes.MARKS.CODE]: (text: ReactNode) => (
      <code className="bg-primary font-mono text-sm py-3 px-4 rounded-md">
        {text}
      </code>
    ),
  },
};
