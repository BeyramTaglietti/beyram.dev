import { Link } from "@remix-run/react";
import { FaGithub, FaSafari } from "react-icons/fa";
import { IoLogoApple, IoLogoGooglePlaystore } from "react-icons/io5";

type StoreButtonProps = {
  url: string;
};

const AppStoreButton = ({ url }: StoreButtonProps) => {
  return (
    <Link
      to={url}
      target="_blank"
      rel="noreferrer"
      className="bg-secondary text-white px-4 py-2 rounded-md flex flex-row items-center gap-4 w-full"
    >
      <IoLogoApple className="text-3xl" />
      <span>Download on the App Store</span>
    </Link>
  );
};

const PlayStoreButton = ({ url }: StoreButtonProps) => {
  return (
    <Link
      to={url}
      target="_blank"
      rel="noreferrer"
      className="bg-secondary text-white px-4 py-2 rounded-md flex flex-row items-center gap-4 w-full"
    >
      <IoLogoGooglePlaystore className="text-3xl" />
      <span>Download on the Play Store</span>
    </Link>
  );
};

const WebsiteButton = ({ url }: StoreButtonProps) => {
  return (
    <Link
      to={url}
      target="_blank"
      rel="noreferrer"
      className="bg-secondary text-white px-4 py-2 rounded-md flex flex-row items-center gap-4 w-full"
    >
      <FaSafari className="text-3xl" />
      <span>Visit Website</span>
    </Link>
  );
};

const GithubRepoButton = ({ url }: StoreButtonProps) => {
  return (
    <Link
      to={url}
      target="_blank"
      rel="noreferrer"
      className="bg-secondary text-white px-4 py-2 rounded-md flex flex-row items-center gap-4 w-full"
    >
      <FaGithub className="text-3xl" />
      <span>View source code</span>
    </Link>
  );
};

const StoreButtons = {
  AppStoreButton,
  PlayStoreButton,
  WebsiteButton,
  GithubRepoButton
}

export { StoreButtons };
