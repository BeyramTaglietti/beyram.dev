import type { MetaFunction } from "@remix-run/react";
import { NavLink, useLoaderData } from "@remix-run/react";
import dayjs from "dayjs";
import { type ReactNode } from "react";
import { BiSolidCalendarEvent, BiSolidTimeFive } from "react-icons/bi";
import { client } from "~/contentful/config.server";
import type { Post } from "~/models/post.model";

export const meta: MetaFunction<typeof loader> = ({ data: post }) => {
  return [
    { title: "Blog posts" },
    {
      name: "description",
      content:
        "A little blog page where I talk about my experience and adventures in the amazing dev world",
    },
  ];
};

export const loader = async () => {
  const response = await client.getEntries({
    content_type: "post",
  });

  return response.items;
};

const InfoPill = ({ icon, text }: { icon: ReactNode; text: string }) => {
  return (
    <div className="flex gap-2 items-center py-1 px-3 rounded-lg bg-secondary">
      <span>{icon}</span>
      <span>{text}</span>
    </div>
  );
};

const Posts = () => {
  const posts = useLoaderData<Post[]>();

  return (
    <div className="flex flex-col gap-4 items-center">
      {posts.map(({ fields }) => (
        <NavLink
          key={fields.link}
          prefetch="viewport"
          unstable_viewTransition
          to={`${fields.link}`}
          className="min-h-[300px] max-w-[1000px] flex flex-col lg:flex-row gap-4 bg-primary rounded-xl p-3"
        >
          {({ isTransitioning }) => (
            <>
              <div className="w-full lg:w-3/5 flex flex-col justify-between gap-4">
                <div className="flex flex-col gap-4">
                  <h1
                    className="text-4xl w-full font-bold"
                    style={
                      isTransitioning
                        ? { viewTransitionName: "post-title" }
                        : undefined
                    }
                  >
                    {fields.title}
                  </h1>
                  <p>{fields.shortDescription}</p>
                </div>
                <div className="flex flex-row gap-2">
                  <InfoPill
                    icon={<BiSolidTimeFive />}
                    text={`${fields.readingTime} min read`}
                  />
                  <InfoPill
                    icon={<BiSolidCalendarEvent />}
                    text={dayjs(fields.date).format("MMMM YYYY")}
                  />
                </div>
              </div>
              <div className="w-full lg:w-2/5 rounded-xl overflow-hidden">
                <img
                  src={`https:${fields.background.fields.file.url}`}
                  alt={fields.title}
                  className="w-full h-full object-cover"
                  style={
                    isTransitioning
                      ? { viewTransitionName: "post-image" }
                      : undefined
                  }
                />
              </div>
            </>
          )}
        </NavLink>
      ))}
    </div>
  );
};

export default Posts;
