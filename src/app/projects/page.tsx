import Image from 'next/image';

import { Metadata } from 'next';
import { client } from '@/contentful/config';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Personal Projects',
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
          <h1 className="text-4xl">{project.fields.title}</h1>
          <Link href={project.fields.link} target="_blank">
            <Image
              src={`https:${project.fields.background.fields.file.url}`}
              alt={project.fields.title}
              height={10}
              width={700}
              className="border border-gray-700 rounded-xl overflow-hidden"
            />
          </Link>
          <div className="lg:mr-40 mt-4">
            {documentToReactComponents(project.fields.description)}
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
