import { NavLink, useLoaderData } from "@remix-run/react";
import dayjs from "dayjs";
import { BiSolidCalendarEvent, BiSolidTimeFive } from "react-icons/bi";
import { client } from "~/contentful/config.server";
import type { MetaFunction } from "@remix-run/react";

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

const Posts = () => {
  const posts = useLoaderData<typeof loader>();

  return (
    <>
      {posts.map((post: any) => (
        <NavLink
          prefetch="viewport"
          unstable_viewTransition
          to={`/posts/${post.fields.link}`}
          key={post.fields.link}
          className="flex justify-center flex-col gap-4 bg-primary p-3 rounded-xl focus:outline-none"
        >
          {({ isTransitioning }) => (
            <div className="flex flex-col gap-4">
              <div className="flex justify-center items-center flex-col gap-4">
                <div className="flex flex-col lg:flex-row gap-6 h-72">
                  <div className="flex-1 2xl:flex-2 flex flex-col mt-2 justify-between gap-4">
                    <div className="flex flex-col justify-between h-full">
                      <h1
                        className="text-4xl w-full font-bold"
                        style={
                          isTransitioning
                            ? { viewTransitionName: "post-title" }
                            : undefined
                        }
                      >
                        {post.fields.title}
                      </h1>
                      <p>{post.fields.shortDescription}</p>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex gap-2 items-center py-1 px-3 rounded-lg w-max bg-secondary">
                        <span>
                          <BiSolidTimeFive />
                        </span>
                        <span>{post.fields.readingTime} min read</span>
                      </div>
                      <div className="flex gap-2 items-center py-1 px-3 rounded-lg w-max bg-secondary">
                        <span>
                          <BiSolidCalendarEvent />
                        </span>
                        <span>
                          {dayjs(post.fields.date).format("MMMM YYYY")}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 overflow-hidden rounded-xl">
                    <img
                      src={`https:${post.fields.background.fields.file.url}`}
                      alt={post.fields.title}
                      height={300}
                      width={600}
                      className="w-full h-full object-cover"
                      style={
                        isTransitioning
                          ? { viewTransitionName: "post-image" }
                          : undefined
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </NavLink>
      ))}
    </>
  );
};

export default Posts;
