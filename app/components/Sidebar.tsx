import { NavLink, Outlet } from "@remix-run/react";

import { AiFillHome } from "react-icons/ai";
import { MdDesktopMac } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { IoIosText } from "react-icons/io";

const routes = [
  { label: "Home", link: "/", icon: <AiFillHome /> },
  { label: "About Me", link: "/aboutme", icon: <FaUser /> },
  { label: "Personal Projects", link: "/projects", icon: <MdDesktopMac /> },
  { label: "Posts", link: "/posts", icon: <IoIosText /> },
];

const Sidebar = () => {
  return (
    <div className="flex h-[100dvh] w-full">
      <div className="h-[80px] w-full md:h-full md:w-[250px] bg-sidebar fixed bottom-0 items-center">
        <ul className="p-3 flex md:flex-col gap-3 justify-evenly md:justify-start h-full items-center md:items-start">
          {routes.map((route) => (
            <li key={route.link} className="w-full">
              <NavLink
                prefetch="render"
                to={route.link}
                className={({ isActive }) =>
                  `flex flex-row gap-5 items-center cursor-pointer ${
                    isActive && "bg-primary"
                  } hover:bg-secondary rounded-lg p-2 md:pl-4 text-xl md:text-sm justify-center md:justify-start`
                }
                unstable_viewTransition
              >
                {route.icon}
                <span className="hidden md:block">{route.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="h-full w-full pb-[100px] md:pb-5 md:ml-[250px] p-2 pt-4 overflow-scroll lg:px-14">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
