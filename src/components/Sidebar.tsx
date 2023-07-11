'use client';
import React from 'react';
import { AiFillHome } from 'react-icons/ai';
import { MdDesktopMac } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import { IoIosText } from 'react-icons/io';
import Link from 'next/link';

import { usePathname } from 'next/navigation';

const routes = [
  { label: 'Home', link: '/', icon: <AiFillHome /> },
  { label: 'About Me', link: '/aboutme', icon: <FaUser /> },
  { label: 'Projects', link: '/projects', icon: <MdDesktopMac /> },
  { label: 'Posts', link: '/posts', icon: <IoIosText /> },
];

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="flex h-[100dvh] w-full">
      <div className="h-[80px] w-full md:h-full md:w-[250px] bg-[#171717] fixed bottom-0 items-center">
        <ul className="p-3 flex md:flex-col gap-3 justify-evenly md:justify-start h-full items-center md:items-start">
          {routes.map((route, index) => (
            <li key={index} className="w-full">
              <Link
                href={route.link}
                className={`flex flex-row gap-5 items-center cursor-pointer ${
                  pathname === route.link && 'bg-[#404040]'
                } hover:bg-[#515151] rounded-lg p-2 md:pl-4 text-xl md:text-sm justify-center md:justify-start`}
              >
                {route.icon}
                <span className="hidden md:block">{route.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="h-full w-full pb-[100px] md:pb-5 md:ml-[250px] p-5 overflow-scroll">
        {children}
      </div>
    </div>
  );
};

export default Sidebar;
