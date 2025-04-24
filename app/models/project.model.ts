export type LinkType = "AppStore" | "Github" | "PlayStore";
export type Project = {
  title: string;
  description: string;
  imageUrl: string;
  links: {
    url: string;
    type: LinkType;
  }[];
};
