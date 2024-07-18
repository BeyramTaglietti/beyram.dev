import { Link } from "@remix-run/react";
import { FaSafari } from "react-icons/fa";
import { IoLogoApple, IoLogoGooglePlaystore } from "react-icons/io5";

type StoreButtonProps = {
  url: string;
};

export const AppStoreButton = ({ url }: StoreButtonProps) => {
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

export const PlayStoreButton = ({ url }: StoreButtonProps) => {
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

export const WebsiteButton = ({ url }: StoreButtonProps) => {
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
