import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import type { MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import Card from "~/components/Card";
import { getContentfulData } from "~/contentful/config.server";
import type { Project } from "~/models/project.model";

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
  const response = await getContentfulData<Project>({
    content_type: "project",
  });
  return response;
};

const Projects = () => {
  const projects = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col gap-4 items-center">
      {projects.map(({ fields }) => (
        <Card key={fields.link}>
          <Link
            to={fields.link}
            className="flex flex-col lg:flex-row gap-4 flex-1"
            target="_blank"
          >
            <div className="w-full lg:w-2/5 rounded-xl overflow-hidden">
              <img
                src={`https:${fields.background.fields.file.url}`}
                alt={fields.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full lg:w-3/5 flex flex-col gap-4">
              <div>
                <h1 className="font-bold text-4xl">{fields.title}</h1>
              </div>
              <div>{documentToReactComponents(fields.description as any)}</div>
            </div>
          </Link>
        </Card>
      ))}
    </div>
  );
};

export default Projects;
