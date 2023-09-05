import Image from 'next/image';

import { Metadata } from 'next';
import { client } from '@/contentful/config';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Personal Projects',
  description:
    "A list of my personal projects which I've been working on in my free time",
};

const getProjects = async () => {
  const response = await client.getEntries({
    content_type: 'project',
  });

  return response.items;
};

const Projects = async () => {
  const projects: any = await getProjects();

  return (
    <div className="flex flex-col gap-4">
      {projects.map((project: any, index: number) => (
        <Link
          href={project.fields.link}
          target="_blank"
          className="flex justify-center flex-col gap-4 bg-[#333333] p-3 rounded-xl"
          key={project.fields.link}
        >
          <div className="flex flex-col-reverse lg:flex-row gap-4">
            <div className="flex-1">
              <Image
                src={`https:${project.fields.background.fields.file.url}`}
                alt={project.fields.title}
                height={300}
                width={600}
                className="border border-gray-700 rounded-xl w-full h-[350px] object-cover"
              />
            </div>
            <div className="flex-1 flex flex-col gap-4 mt-2">
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
