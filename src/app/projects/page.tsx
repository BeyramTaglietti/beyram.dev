import Image from 'next/image';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Projects',
};

const projects = [
  {
    name: 'Øpia',
    imageUrl: 'https://texts.com/ogcover.png',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    name: 'Norse Venture',
    imageUrl: 'https://texts.com/ogcover.png',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
];

const Projects = () => {
  return (
    <>
      {projects.map((project, index) => (
        <div className="flex flex-col gap-4" key={index}>
          <h1 className="text-4xl">{project.name}</h1>
          <Image
            src={project.imageUrl}
            alt={project.name}
            height={250}
            width={800}
          />
          <p>{project.description}</p>
          {index % 2 === 0 && (
            <hr className="h-px border-0 bg-gray-700 my-4"></hr>
          )}
        </div>
      ))}
    </>
  );
};

export default Projects;
