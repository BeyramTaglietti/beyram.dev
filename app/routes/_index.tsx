import { Link } from "@remix-run/react";
import { AiFillGithub } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Beyram Taglietti" },
    {
      title: "description",
      content:
        "I'm Beyram Taglietti, a software engineer passionate about his job and on his way to learn as much as he can to become a better developer",
    },
  ];
};

export default function Index() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full gap-4">
      <h1 className="text-7xl xl:text-8xl text-center">Beyram Taglietti</h1>
      <h3
        className="text-3xl xl:text-4xl text-center"
        id="software_engineer_text"
      >
        Software Engineer
      </h3>
      <div className="text-3xl xl:text-4xl flex flex-row gap-8">
        <Link to="https://github.com/BeyramTaglietti" target="_blank">
          <AiFillGithub />
        </Link>
        <Link to="https://www.linkedin.com/in/beyram-taglietti" target="_blank">
          <FaLinkedinIn />
        </Link>
      </div>
    </div>
  );
}
