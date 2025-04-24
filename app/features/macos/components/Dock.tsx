import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentProps,
} from "react";
import { Fragment } from "react/jsx-runtime";
import { cn } from "~/utils";
import { MacosContext } from "../context";

export const Dock = () => {
  const { openApp, availableApps, appsOpen } = useContext(MacosContext);

  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const [dockHeight, setDockHeight] = useState<number | null>(null);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!divRef.current) return;
    setDockHeight(divRef.current.getBoundingClientRect().height);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoverIndex(null);
  }, []);

  const dockIcons = useMemo<Array<DockIconProps>>(() => {
    const apps = availableApps.map<DockIconProps>(({ app, background }) => ({
      appName: app,
      backgroundUrl: background,
      active: appsOpen.includes(app),
      onClick: () => openApp(app),
      delay: appsOpen.includes(app) ? false : true,
    }));

    return [
      {
        appName: "Finder",
        backgroundUrl: "/assets/textures/macos_finder.jpg",
        active: true,
      },
      {
        appName: "App Store",
        backgroundUrl: "/assets/textures/macos_appstore.jpg",
        onClick: () =>
          window.open(
            "https://apps.apple.com/us/developer/beyram-taglietti/id1731694326"
          ),
        delay: true,
      },
      ...apps,
    ];
  }, [availableApps, appsOpen, openApp]);

  return (
    <div
      className="w-full h-full backdrop-blur-2xl bg-black/20 z-20 transition-all duration-300 flex flex-row items-end gap-4 px-2 md:px-3 rounded-[8px] md:rounded-[16px]"
      ref={divRef}
      onMouseLeave={handleMouseLeave}
    >
      {dockHeight && (
        <>
          {dockIcons.map((icon, i) => {
            const distance =
              hoverIndex !== null ? Math.abs(hoverIndex - i) : null;

            const scale = distance === 0 ? 1.6 : distance === 1 ? 1.4 : 1;
            const iconHeight = dockHeight * 0.7 * scale;

            const marginBottom =
              distance === 0
                ? (dockHeight - iconHeight) * -2
                : distance === 1
                ? (dockHeight - iconHeight) * 8
                : (dockHeight - iconHeight) / 2;

            return (
              <Fragment key={i}>
                <DockIcon
                  style={{
                    height: iconHeight,
                    width: iconHeight,
                    marginBottom,
                  }}
                  onMouseEnter={() => setHoverIndex(i)}
                  hovered={distance === 0}
                  {...icon}
                />
              </Fragment>
            );
          })}
        </>
      )}
    </div>
  );
};

type DockIconProps = {
  appName: string;
  backgroundUrl?: string;
  active?: boolean;
  hovered?: boolean;
  delay?: boolean;
} & ComponentProps<"div">;

const DockIcon = ({
  appName,
  backgroundUrl,
  className,
  active,
  hovered,
  onClick,
  delay,
  ...restProps
}: DockIconProps) => {
  const [opening, setOpening] = useState(false);

  const openApp = useCallback((fn: () => void) => {
    setOpening(true);
    setTimeout(() => {
      setOpening(false);
      fn();
    }, 2500);
  }, []);

  return (
    <>
      <div className="relative">
        <div
          className={cn(
            "bg-white transition-all duration-300 ease-in-out overflow-hidden z-20 active:opacity-20 flex justify-center items-center rounded-[24%]",
            opening && "duration-600 animate-bounce",
            className
          )}
          onClick={(e) => {
            if (onClick && !delay) {
              onClick(e);
            } else {
              if (onClick) openApp(() => onClick(e));
            }
          }}
          {...restProps}
        >
          {backgroundUrl && (
            <img src={backgroundUrl} className="w-full h-full" />
          )}
        </div>

        <div className="absolute size-full bottom-2 -z-10">
          {active === true && (
            <div className="size-1 rounded-full bg-white/60 absolute -bottom-2 left-1/2 transform -translate-1/2"></div>
          )}
        </div>

        <div
          className={cn(
            "absolute -top-10 left-1/2 transform -translate-x-1/2 transition-all duration-300 w-fit px-2 py-1 flex justify-center items-center rounded bg-gray-800",
            hovered ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="absolute size-4 bg-gray-800 -bottom-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45 -z-10"></div>
          <span className="text-xs whitespace-nowrap text-white">
            {appName}
          </span>
        </div>
      </div>
    </>
  );
};
