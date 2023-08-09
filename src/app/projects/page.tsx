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
    <>
      {projects.map((project: any, index: number) => (
        <div className="flex flex-col gap-4" key={index}>
          <div className="flex justify-center flex-col gap-4">
            <div className="flex flex-col-reverse lg:flex-row gap-4">
              <Link
                href={project.fields.link}
                target="_blank"
                className="flex-1"
              >
                <Image
                  src={`https:${project.fields.background.fields.file.url}`}
                  alt={project.fields.title}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="border border-gray-700 rounded-xl overflow-hidden w-full"
                />
              </Link>
              <div className='flex-1 flex flex-col gap-4 mt-2'>
                <h1 className="text-4xl w-full font-bold">
                  {project.fields.title}
                </h1>
                <div className="text-justify">
                  {documentToReactComponents(project.fields.description)}
                </div>
              </div>
            </div>
          </div>

          {index % 2 === 0 && (
            <hr className="h-px border-0 bg-gray-700 my-4"></hr>
          )}
        </div>
      ))}
    </>
  );
};

export default Projects;
