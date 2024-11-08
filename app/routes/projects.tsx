import { json, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  Card,
  StoreButtons,
} from "~/components";
import projects from "~/data/projects/projects.json";

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
  return json([...projects].reverse());
};

const Projects = () => {
  const projects = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col gap-4 items-center">
      <h1 className="text-4xl block md:hidden w-full font-bold py-3">
        Personal projects
      </h1>
      {projects.map(({ title, description, link, backgroundPath }, index) => (
        <Card key={index}>
          <div className="flex flex-col lg:flex-row gap-4 flex-1">
            <div className="w-full lg:w-2/5 rounded-xl overflow-hidden">
              <img
                src={"assets/images/" + backgroundPath}
                alt={title}
                className="w-full h-full aspect-video object-cover"
              />
            </div>
            <div className="w-full lg:w-3/5 flex flex-col gap-4 justify-between">
              <div className="flex flex-col gap-2">
                <div>
                  <h2 className="font-bold text-4xl">{title}</h2>
                </div>
                <div>{description}</div>
              </div>
              <div className="flex flex-col lg:flex-row gap-4">
                {link.ios && <StoreButtons.AppStoreButton url={link.ios} />}
                {link.android && <StoreButtons.PlayStoreButton url={link.android} />}
                {link.web && <StoreButtons.WebsiteButton url={link.web} />}
                {link.github && <StoreButtons.GithubRepoButton url={link.github} />}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Projects;
