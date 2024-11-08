import { NavLink } from "@remix-run/react";

import { AiFillHome } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { IoCodeSlash } from "react-icons/io5";

const routes = [
  { label: "Home", link: "/", icon: <AiFillHome /> },
  { label: "About Me", link: "/aboutme", icon: <FaUser /> },
  { label: "Personal Projects", link: "/projects", icon: <IoCodeSlash /> },
];

const Sidebar = () => {
  return (
    <div className="bg-sidebar items-center w-full h-full">
      <nav className="p-3 flex md:flex-col gap-3 justify-evenly md:justify-start h-full items-center md:items-start">
        {routes.map((route) => (
          <NavLink
            key={route.link}
            prefetch="render"
            to={route.link}
            className={({ isActive }) =>
              `flex flex-row gap-5 items-center cursor-pointer w-full hover:bg-secondary rounded-lg p-2 md:pl-4 text-xl md:text-sm justify-center md:justify-start h-11 ${
                isActive && "bg-primary"
              }`
            }
            unstable_viewTransition
          >
            {route.icon}
            <span className="hidden md:block">{route.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
