import type { MacosAppsEnum } from "../enums";

export type MacosApp = {
  background: string;
  app: MacosAppsEnum;
  AppComponent: React.FC;
};
