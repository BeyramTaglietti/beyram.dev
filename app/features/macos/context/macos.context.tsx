import { createContext, useCallback, useMemo, useState } from "react";
import { UseAnalytics } from "~/hooks";
import { IWasHere, NorseVenture, Redo } from "../components";
import { MacosAppsEnum } from "../enums";
import type { MacosApp } from "../types";

type MacosContextType = {
  availableApps: Array<MacosApp>;

  activeApp: MacosAppsEnum | null;
  setActiveApp: (app: MacosAppsEnum | null) => void;

  appsOpen: Array<MacosAppsEnum>;
  openApp: (app: MacosAppsEnum) => void;
};

export const MacosContext = createContext<MacosContextType>({
  availableApps: [],

  activeApp: null,
  setActiveApp: () => {},

  appsOpen: [],
  openApp: () => {},
});

export const MacosProvider = ({ children }: { children: React.ReactNode }) => {
  const { trackEvent } = UseAnalytics();

  const [activeApp, setActiveApp] = useState<MacosAppsEnum | null>(null);
  const [appsOpen, setAppsOpen] = useState<Array<MacosAppsEnum>>([]);

  const availableApps = useMemo<Array<MacosApp>>(() => {
    return [
      {
        background: "/assets/projects/norse_venture/norse_venture.png",
        app: MacosAppsEnum.NORSE_VENTURE,
        AppComponent: NorseVenture,
      },
      {
        background: "/assets/projects/redo/redo.png",
        app: MacosAppsEnum.REDO,
        AppComponent: Redo,
      },
      {
        background: "/assets/textures/macos_notes.webp",
        app: MacosAppsEnum.IWASHERE,
        AppComponent: IWasHere,
      },
    ];
  }, []);

  const openApp = useCallback(
    (app: MacosAppsEnum) => {
      trackEvent("Opening an app", { app_name: app });
      if (appsOpen.includes(app)) {
        setActiveApp(app);
      } else {
        setActiveApp(app);
        setAppsOpen((prev) => [...prev, app]);
      }
    },
    [appsOpen, trackEvent]
  );

  return (
    <MacosContext.Provider
      value={{
        activeApp,
        openApp,
        appsOpen,
        setActiveApp,
        availableApps,
      }}
    >
      {children}
    </MacosContext.Provider>
  );
};
