import { format } from "date-fns";
import { Fragment, type ReactElement } from "react";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { FaAppStore, FaGlobeAmericas } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "~/components/ui";
import { experience, projects } from "~/data";
import type { LinkType, Project } from "~/models";

export const IndexPage = () => {
  return (
    <>
      <div className="w-dvw h-dvh flex flex-col px-4 md:px-32 pb-32 overflow-y-auto scrollbar-hidden">
        <div className="flex flex-col">
          <h1 className="py-2 capitalize font-semibold text-5xl md:text-6xl mt-[calc(50dvh-var(--text-5xl))] md:mt-[calc(50dvh-var(--text-6xl))] bg-radial from-orange-300 to-primary-gradient bg-clip-text text-transparent">
            beyram taglietti
          </h1>
          <h2 className="text-xl md:text-3xl capitalize font-semibold">
            frontend engineer
          </h2>

          <div className="flex flex-row gap-4 md:gap-6 mt-4">
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

        <div className="flex flex-col gap-40 mt-[25dvh]">
          <div>
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
          <div className="px-3">
            <h3 className="text-3xl md:text-4xl font-semibold capitalize mb-6">
              My experience
            </h3>
            <Stepper defaultValue={3} orientation="vertical">
              {experience.map((xp, idx) => (
                <StepperItem
                  key={xp.company}
                  step={idx + 1}
                  className="relative items-start not-last:flex-1"
                >
                  <StepperTrigger
                    onClick={() => {}}
                    className="items-start rounded pb-12 last:pb-0"
                  >
                    <StepperIndicator asChild></StepperIndicator>
                    <div className="space-y-0.5 px-2 text-left">
                      <StepperTitle className="text-xl -mt-0.5">
                        {xp.company}
                      </StepperTitle>
                      <StepperDescription className="flex flex-col gap-1">
                        <span className="font-semibold">{xp.position}</span>
                        <span>
                          {`${format(new Date(xp.startDate), "MMMM yyyy")} - ${
                            xp.endDate
                              ? format(new Date(xp.endDate), "MMMM yyyy")
                              : "Present"
                          }`}
                        </span>
                      </StepperDescription>
                    </div>
                  </StepperTrigger>
                  {idx < experience.length - 1 && (
                    <StepperSeparator className="absolute inset-y-0 top-[calc(1.5rem+0.125rem)] left-3 -order-1 m-0 -translate-x-1/2 group-data-[orientation=horizontal]/stepper:w-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=horizontal]/stepper:flex-none group-data-[orientation=vertical]/stepper:h-[calc(100%-1.5rem-0.25rem)]" />
                  )}
                </StepperItem>
              ))}
            </Stepper>
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
      case "Website":
        Icon = FaGlobeAmericas;
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
                <a
                  key={url}
                  href={url}
                  className="text-muted-foreground hover:text-black transition-colors"
                  target="_blank"
                >
                  {renderIcon(type)}
                </a>
              ))}
            </div>
          </div>
        </div>
        <hr className="border-muted-foreground/10" />
      </div>
    </>
  );
};
