import { NavLink } from "@remix-run/react";
import { ComponentProps } from "react";

import { AiFillHome } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { IoCodeSlash } from "react-icons/io5";
import { cn } from "~/utils";

type SidebarRoute = {
  label: string;
  link: ComponentProps<typeof NavLink>["to"];
  icon: React.FC;
};
const routes: Array<SidebarRoute> = [
  { label: "Home", link: "/", icon: AiFillHome },
  { label: "About Me", link: "/aboutme", icon: FaUser },
  { label: "Personal Projects", link: "/projects", icon: IoCodeSlash },
];

export const Sidebar = () => {
  return (
    <div className="bg-sidebar items-center w-full h-full">
      <nav className="p-3 flex md:flex-col gap-3 justify-evenly md:justify-start h-full items-center md:items-start">
        {routes.map((route) => (
          <NavLink
            key={route.link.toString()}
            prefetch="intent"
            to={route.link}
            className={({ isActive }) =>
              cn(
                "flex flex-col md:flex-row gap-1 md:gap-5 items-center cursor-pointer w-full hover:bg-secondary rounded-lg p-2 md:pl-4 text-xl md:text-sm justify-center md:justify-start h-11 transition-colors duration-500",
                isActive && "bg-primary"
              )
            }
            viewTransition
          >
            <route.icon />
            <span className="hidden md:block">{route.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};
