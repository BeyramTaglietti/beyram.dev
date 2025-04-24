import type { Project } from "~/models";

export const projects: Array<Project> = [
  {
    title: "norse venture",
    description: "trip planning cross platform app",
    imageUrl: "assets/projects/norse_venture/norse_venture.png",
    links: [
      {
        url: "https://apps.apple.com/it/app/norse-venture-trip-planner/id6478082618",
        type: "AppStore",
      },
      {
        url: "https://play.google.com/store/apps/details?id=com.beyramtaglietti.norseventure&pcampaignid=web_share",
        type: "PlayStore",
      },
    ],
  },
  {
    title: "Redo",
    description: "Repetitive tasks manager cross platform app",
    imageUrl: "assets/projects/redo/redo.png",
    links: [
      {
        url: "https://apps.apple.com/us/app/redo-repetitive-tasks/id6504712333",
        type: "AppStore",
      },
      {
        url: "https://github.com/BeyramTaglietti/redo",
        type: "Github",
      },
    ],
  },
];
