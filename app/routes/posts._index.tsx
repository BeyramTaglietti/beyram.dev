import { MetaFunction } from "@remix-run/node";
import { json, NavLink, useLoaderData } from "@remix-run/react";
import dayjs from "dayjs";
import { BiSolidCalendarEvent, BiSolidTimeFive } from "react-icons/bi";
import Card from "~/components/Card";
import InfoPill from "~/components/InfoPill";
import { PostModel } from "~/models/post.model";

export const meta: MetaFunction = () => {
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
  const modules = import.meta.glob<{ frontmatter: PostModel }>("./*.mdx", {
    eager: true,
  });

  const posts = Object.entries(modules).map(([file, post]) => {
    const id = file.replace(/\.mdx$/, "");
    const slug = id.substring(id.lastIndexOf(".") + 1, id.length);

    return {
      slug,
      frontmatter: post.frontmatter,
    };
  });

  return json({
    posts: posts.sort((a, b) =>
      a.frontmatter.date > b.frontmatter.date ? -1 : 1
    ),
  });
};
const Posts = () => {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col gap-4 items-center not-prose">
      {posts.map(
        ({
          frontmatter: {
            title,
            date,
            readingTime,
            shortDescription,
            backgroundUrl,
          },
          slug,
        }) => (
          <Card key={slug}>
            <NavLink
              prefetch="viewport"
              unstable_viewTransition
              to={slug}
              className="flex flex-col lg:flex-row gap-4 flex-1"
            >
              {({ isTransitioning }) => (
                <>
                  <div className="w-full lg:w-3/5 flex flex-col justify-between gap-4">
                    <div className="flex flex-col gap-4">
                      <h1 className="text-4xl w-full font-bold">{title}</h1>
                      <p>{shortDescription}</p>
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
                        text={`${readingTime} min read`}
                      />
                      <InfoPill
                        icon={<BiSolidCalendarEvent />}
                        text={dayjs(date).format("MMMM YYYY")}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-2/5 rounded-xl overflow-hidden">
                    <img
                      src={backgroundUrl}
                      alt={title}
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
        )
      )}
    </div>
  );
};

export default Posts;
