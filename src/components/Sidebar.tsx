'use client';
import React from 'react';
import { AiFillHome } from 'react-icons/ai';
import { MdDesktopMac } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import { IoIosText } from 'react-icons/io';
import Link from 'next/link';

import { usePathname } from 'next/navigation';

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-row h-[100dvh] w-full">
      <div className="h-full w-[250px] bg-[#171717] fixed">
        <ul className="p-3 flex flex-col gap-3">
          <li>
            <Link
              href={'/'}
              className={`flex flex-row gap-5 items-center cursor-pointer ${
                pathname === '/' && 'bg-[#404040]'
              } hover:bg-[#515151] rounded-lg p-2 pl-4`}
            >
              <AiFillHome />
              Home
            </Link>
          </li>
          <li>
            <Link
              href={'/aboutme'}
              className={`flex flex-row gap-5 items-center cursor-pointer ${
                pathname === '/aboutme' && 'bg-[#404040]'
              } hover:bg-[#515151] rounded-lg p-2 pl-4`}
            >
              <FaUser />
              About Me
            </Link>
          </li>
          <li>
            <Link
              href={'/projects'}
              className={`flex flex-row gap-5 items-center cursor-pointer ${
                pathname === '/projects' && 'bg-[#404040]'
              } hover:bg-[#515151] rounded-lg p-2 pl-4`}
            >
              <MdDesktopMac />
              Projects
            </Link>
          </li>
          <li>
            <Link
              href={'/posts'}
              className={`flex flex-row gap-5 items-center cursor-pointer ${
                pathname === '/posts' && 'bg-[#404040]'
              } hover:bg-[#515151] rounded-lg p-2 pl-4`}
            >
              <IoIosText />
              Posts
            </Link>
          </li>
        </ul>
      </div>

      <div className="h-full w-full ml-[250px] p-5">{children}</div>
    </div>
  );
};

export default Sidebar;
