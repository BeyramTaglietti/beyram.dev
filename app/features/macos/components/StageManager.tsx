import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "~/utils";
import { MacosContext } from "../context";
import type { MacosAppsEnum } from "../enums";
import { AppWrapper } from "./Apps/AppWrapper";

export const StageManager = () => {
  const outerDiv = useRef<HTMLDivElement>(null);
  const [outerDivSize, setOuterDivSize] = useState({ width: 0, height: 0 });
  const { activeApp, setActiveApp, appsOpen, availableApps } =
    useContext(MacosContext);

  useEffect(() => {
    if (outerDiv.current) {
      setOuterDivSize({
        width: outerDiv.current.clientWidth,
        height: outerDiv.current.clientHeight,
      });
    }
  }, []);

  const inactiveApps = useMemo(() => {
    return appsOpen.filter((app) => app !== activeApp);
  }, [activeApp, appsOpen]);

  const baseClass = useMemo(
    () => "absolute transform transition-all duration-400",
    []
  );

  const getInactiveAppClass = useCallback(
    (inactiveIndex: number) => {
      const relativeHeight = 10; // % of the outer div height each app can take
      const inactiveAppSize = outerDivSize.height / relativeHeight + 14;

      let offset = 0;

      if (inactiveApps.length > 1) {
        // Calculate total vertical space needed for all apps
        const totalSpacing = inactiveAppSize * inactiveApps.length;

        // Calculate the starting position (centered around the middle)
        const startPos = -totalSpacing / 2;

        // Position each app with equal spacing
        offset =
          startPos + inactiveIndex * inactiveAppSize + inactiveAppSize / 2;
      }

      return {
        className: "rotate-x-10 -rotate-y-9 left-4 translate-x-0 opacity-80",
        style: {
          top: `calc(50% + ${offset}px)`,
          height: `${relativeHeight}%`,
          width: "7%",
        },
      };
    },
    [inactiveApps.length, outerDivSize]
  );

  const activeAppClass = useMemo(
    () => "top-1/2 left-1/2 -translate-x-2/5 -translate-y-1/2 h-[90%] w-7/10",
    []
  );

  return (
    <>
      <div
        className="w-full h-full relative"
        ref={outerDiv}
        onClick={() => setActiveApp(null)}
      >
        {availableApps
          .filter(({ app }) => appsOpen.includes(app))
          .map(({ app, background, AppComponent }, idx) => (
            <StageApp
              key={idx}
              {...{
                app,
                activeApp,
                activeAppClass,
                getInactiveAppClass,
                baseClass,
                inactiveApps,
                outerDivSize,
                background,
                AppComponent,
                setActiveApp,
              }}
            />
          ))}
      </div>
    </>
  );
};

const StageApp = ({
  app,
  activeApp,
  activeAppClass,
  getInactiveAppClass,
  baseClass,
  inactiveApps,
  outerDivSize,
  background,
  AppComponent,
  setActiveApp,
}: {
  app: MacosAppsEnum;
  activeApp: MacosAppsEnum | null;
  activeAppClass: string;
  getInactiveAppClass: (inactiveIndex: number) => {
    className: string;
    style: React.CSSProperties;
  };
  baseClass: string;
  inactiveApps: MacosAppsEnum[];
  outerDivSize: { width: number; height: number };
  background: string;
  AppComponent: React.FC;
  setActiveApp: (app: MacosAppsEnum) => void;
}) => {
  const active = useMemo(() => {
    return activeApp === app;
  }, [app, activeApp]);

  const { style, divClass } = useMemo(() => {
    // Calculate inactive index - only for inactive apps
    let inactiveIndex = -1;
    if (!active) {
      inactiveIndex = inactiveApps.indexOf(app);
    }

    const style = active ? {} : getInactiveAppClass(inactiveIndex).style;
    const divClass = active
      ? activeAppClass
      : getInactiveAppClass(inactiveIndex).className;

    return { style, divClass };
  }, [active, activeAppClass, app, getInactiveAppClass, inactiveApps]);

  return (
    <>
      <div
        className={cn(baseClass, divClass)}
        style={style}
        onClick={(e) => {
          e.stopPropagation();
          setActiveApp(app);
        }}
      >
        <AppWrapper
          active={active}
          className={cn(
            active === false &&
              "hover:opacity-100 hover:scale-107 transition-all duration-300"
          )}
        >
          {active === false && (
            <div className="absolute size-full z-20"></div> // prevent interaction with inactive apps' content
          )}
          <AppComponent />
        </AppWrapper>

        <div
          className={cn(
            "absolute -bottom-1 -left-1 rounded-[24%] transition-all duration-300 overflow-hidden",
            active ? "opacity-0" : "opacity-100 "
          )}
          style={{
            width: outerDivSize.width / 50,
            height: outerDivSize.width / 50,
          }}
        >
          <img
            src={background}
            alt="app"
            className="object-contain size-full"
          />
        </div>
      </div>
    </>
  );
};
