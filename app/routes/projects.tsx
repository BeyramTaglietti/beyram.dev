import { Link, useLoaderData } from "@remix-run/react";
import { client } from "~/contentful/config.server";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction<typeof loader> = () => {
  return [
    { title: "Personal Projects" },
    {
      name: "description",
      content:
        "A list of my personal projects which I've been working on in my free time",
    },
  ];
};

export const loader = async () => {
  const response = await client.getEntries({
    content_type: "project",
  });

  return response.items;
};

const Projects = () => {
  const projects = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col gap-4">
      {projects.map((project: any, index: number) => (
        <Link
          to={project.fields.link}
          target="_blank"
          className="flex justify-center flex-col gap-4 bg-primary p-3 rounded-xl"
          key={project.fields.link}
        >
          <div className="flex flex-col-reverse lg:flex-row gap-4 h-full">
            <div className="flex-1 overflow-hidden rounded-xl ">
              <img
                src={`https:${project.fields.background.fields.file.url}`}
                alt={project.fields.title}
                height={300}
                width={600}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 2xl:flex-2 flex flex-col gap-4 mt-2">
              <h1 className="text-4xl w-full font-bold">
                {project.fields.title}
              </h1>
              <div className="text-justify">
                {documentToReactComponents(project.fields.description)}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Projects;
