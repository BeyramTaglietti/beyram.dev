import type { MetaFunction } from "@remix-run/node";
import { NavLink, useLoaderData } from "@remix-run/react";
import dayjs from "dayjs";
import { BiSolidCalendarEvent, BiSolidTimeFive } from "react-icons/bi";
import Card from "~/components/Card";
import InfoPill from "~/components/InfoPill";
import { getContentfulData } from "~/contentful/config.server";
import type { PostModel } from "~/models/post.model";

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
  const response = await getContentfulData<PostModel>({
    content_type: "post",
  });

  return response;
};

const Posts = () => {
  const posts = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col gap-4 items-center">
      {posts.map(({ fields }) => (
        <Card key={fields.link}>
          <NavLink
            prefetch="viewport"
            unstable_viewTransition
            to={`${fields.link}`}
            className="flex flex-col lg:flex-row gap-4 flex-1"
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
                  <div
                    className="flex flex-row gap-2"
                    style={
                      isTransitioning
                        ? { viewTransitionName: "post-metrics" }
                        : undefined
                    }
                  >
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
        </Card>
      ))}
    </div>
  );
};

export default Posts;
