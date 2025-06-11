export type LinkType = "AppStore" | "Github" | "PlayStore" | "Website";
export type Project = {
  title: string;
  description: string;
  imageUrl: string;
  links: {
    url: string;
    type: LinkType;
  }[];
};
