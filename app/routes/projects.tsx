import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Card from "~/components/Card";
import {
  AppStoreButton,
  PlayStoreButton,
  WebsiteButton,
} from "~/components/StoreButtons";
import projects from "~/data/projects.json";

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
  return json(projects);
};

const Projects = () => {
  const projects = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col gap-4 items-center">
      {projects.map(({ title, description, link, backgroundPath }, index) => (
        <Card key={index}>
          <div className="flex flex-col lg:flex-row gap-4 flex-1">
            <div className="w-full lg:w-2/5 rounded-xl overflow-hidden">
              <img
                src={"assets/images/" + backgroundPath}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full lg:w-3/5 flex flex-col gap-4">
              <div>
                <h1 className="font-bold text-4xl">{title}</h1>
              </div>
              <div>{description}</div>
              <div className="flex flex-col lg:flex-row gap-4">
                {link.ios && <AppStoreButton url={link.ios} />}
                {link.android && <PlayStoreButton url={link.android} />}
                {link.web && <WebsiteButton url={link.web} />}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Projects;
