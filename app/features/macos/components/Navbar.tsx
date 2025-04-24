import { useContext } from "react";
import { FaApple } from "react-icons/fa";
import { IoIosBatteryFull, IoIosSearch, IoIosWifi } from "react-icons/io";
import { RiTelegramFill } from "react-icons/ri";
import { MacosContext } from "../context";

type NavbarProps = {
  options: Array<string>;
};
export const Navbar = ({ options }: NavbarProps) => {
  const macosContext = useContext(MacosContext);

  const currentTime = new Date();

  return (
    <>
      <div className="w-full h-full bg-white/70 backdrop-blur-2xl flex flex-row items-center px-4 z-20 gap-6 text-sm">
        <FaApple />

        <span className="font-bold">
          {macosContext.activeApp ? macosContext.activeApp : "Finder"}
        </span>

        {options.map((option, i) => (
          <span key={i}>{option}</span>
        ))}

        <div className="flex-1 flex flex-row justify-end items-center gap-4 text-nowrap">
          <RiTelegramFill />
          <IoIosBatteryFull />
          <IoIosWifi />
          <IoIosSearch />
          <span>
            {currentTime.toString().split(":")[0]}:
            {currentTime.toString().split(":")[1]}
          </span>
        </div>
      </div>
    </>
  );
};
