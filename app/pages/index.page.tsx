import { Fragment, type ReactElement } from "react";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { FaAppStore } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { Link } from "react-router";
import { Button } from "~/components/ui";
import { projects } from "~/data/projects";
import type { LinkType, Project } from "~/models";

export const IndexPage = () => {
  return (
    <>
      <div className="w-dvw h-dvh flex flex-col px-4 md:px-32 pb-32 overflow-y-auto scrollbar-hidden">
        <div className="flex flex-col">
          <h1 className="text-primary capitalize font-semibold text-5xl md:text-6xl mt-[calc(50dvh-var(--text-5xl))] md:mt-[calc(50dvh-var(--text-6xl))]">
            beyram taglietti
          </h1>
          <h2 className="text-xl md:text-3xl capitalize font-semibold">
            frontend engineer
          </h2>

          <div className="flex flex-row gap-4 md:gap-6 mt-4">
            <Link to="/room" className="w-30 md:w-40 md:h-12">
              <Button className="w-full h-full text-sm md:text-lg hover:bg-white hover:text-primary border-2 border-primary">
                Visit my room
              </Button>
            </Link>
            <div className="flex flex-row gap-4 md:gap-6 items-center">
              <a href="https://github.com/BeyramTaglietti" target="_blank">
                <BsGithub className="cursor-pointer text-primary hover:rotate-16 transition-normal duration-300 size-6 md:size-8" />
              </a>
              <a
                href="https://www.linkedin.com/in/beyram-taglietti/"
                target="_blank"
              >
                <BsLinkedin className="cursor-pointer text-primary hover:rotate-16 transition-normal duration-300 size-6 md:size-8" />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-[25dvh]">
          <h3 className="text-3xl md:text-4xl font-semibold capitalize mb-2">
            my work
          </h3>
          <div className="flex flex-col gap-8 w-full">
            {[...projects].reverse().map((project, i) => (
              <Fragment key={i}>
                <ProjectCard project={project} />
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const ProjectCard = ({ project }: { project: Project }) => {
  const renderIcon = (type: LinkType): ReactElement => {
    let Icon = FiGithub;
    switch (type) {
      case "AppStore":
        Icon = FaAppStore;
        break;
      case "PlayStore":
        Icon = IoLogoGooglePlaystore;
        break;
    }

    return <Icon className="size-4" />;
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-4 items-center mt-2 hover:bg-muted p-2 rounded-3xl duration-500 transition-colors">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="size-20 object-cover rounded-2xl border"
          />
          <div className="flex flex-col">
            <h4 className="text-xl font-semibold capitalize">
              {project.title}
            </h4>
            <span className="text-xs text-muted-foreground">
              {project.description}
            </span>
            <div className="flex flex-row gap-2 mt-2">
              {project.links.map(({ url, type }) => (
                <Link
                  key={url}
                  to={url}
                  className="text-muted-foreground hover:text-black transition-colors"
                >
                  {renderIcon(type)}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <hr className="border-muted-foreground/10" />
      </div>
    </>
  );
};
