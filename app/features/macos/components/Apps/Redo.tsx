import type { ReactNode } from "react";
import { cn } from "~/utils";

const SCREENS = [
  "/assets/projects/redo/screen1.jpeg",
  "/assets/projects/redo/screen2.jpeg",
];

export const Redo = () => {
  return (
    <>
      <div className="flex flex-col h-full">
        <h1 className="text-4xl pb-2">Redo</h1>
        <div className="flex flex-col gap-6 overflow-y-auto flex-1">
          <div className="flex flex-col gap-2">
            <span className="text-xl">Frontend:</span>
            <ul className="text-green-400">
              <li>
                <TechLink url="https://expo.dev/">React Native (Expo)</TechLink>
              </li>
              <li>
                <TechLink url="https://zustand.docs.pmnd.rs/getting-started/introduction">
                  Zustand
                </TechLink>
              </li>
              <li>
                <TechLink url="https://docs.swmansion.com/react-native-reanimated/">
                  Reanimated
                </TechLink>
              </li>
              <li>
                <TechLink url="https://react-hook-form.com/">
                  React Hook Form
                </TechLink>
              </li>
              <li>
                <TechLink url="https://www.nativewind.dev/">
                  Nativewind
                </TechLink>
              </li>
            </ul>
          </div>
          <p className="w-2/3">
            Redo is a very simple repetitive tasks/timers application where you
            can create timers which are connected to repetitive things you need
            to periodically do such as cleaning your car, changing the water in
            your plants, etc. The app was built in less than a week and it
            gathered users organically and also through Apple Ads using the
            available free credits Apple grants to new developers.
          </p>

          <div className="flex flex-row gap-8 overflow-x-auto min-h-120">
            {SCREENS.map((screen, i) => (
              <img key={i} src={screen} className="rounded-lg h-full" />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

type TechLinkProps = {
  url?: string;
  children: ReactNode;
};
const TechLink = ({ url, children }: TechLinkProps) => {
  return (
    <a className={cn(url && "cursor-pointer")} href={url} target="_blank">
      {children}
    </a>
  );
};
