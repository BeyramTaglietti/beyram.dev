import { createContext, useState, type ReactNode } from "react";
import type { Vector3 } from "three";

type RoomContextType = {
  orbitsEnabled: boolean;
  orbitsTarget: [number, number, number] | Vector3;
  sceneInitialized: boolean;
  disableInteractions: boolean;
  setSceneInitialized: (value: boolean) => void;
  enableOrbits: () => void;
  disableOrbits: () => void;
  setOrbitsTarget: (value: [number, number, number] | Vector3) => void;
  setDisableInteractions: (value: boolean) => void;
};

export const RoomContext = createContext<RoomContextType>({
  orbitsEnabled: true,
  orbitsTarget: [0, 0, 0],
  sceneInitialized: false,
  disableInteractions: false,
  setSceneInitialized: () => {},
  enableOrbits: () => {},
  disableOrbits: () => {},
  setOrbitsTarget: () => {},
  setDisableInteractions: () => {},
});

export const RoomProvider = ({ children }: { children: ReactNode }) => {
  const [sceneInitialized, setSceneInitialized] = useState(false);
  const [orbitsEnabled, setOrbitsEnabled] = useState(true);
  const [orbitsTarget, setOrbitsTarget] = useState<
    [number, number, number] | Vector3
  >([0, 0, 0]);
  const [disableInteractions, setDisableInteractions] = useState(false);

  return (
    <RoomContext.Provider
      value={{
        sceneInitialized,
        orbitsEnabled,
        orbitsTarget,
        disableInteractions,
        setSceneInitialized,
        enableOrbits: () => setOrbitsEnabled(true),
        disableOrbits: () => setOrbitsEnabled(false),
        setOrbitsTarget,
        setDisableInteractions,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};
