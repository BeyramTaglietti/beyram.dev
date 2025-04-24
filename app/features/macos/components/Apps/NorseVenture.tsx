import type { ReactNode } from "react";
import { cn } from "~/utils";

const SCREENS = [
  "/assets/projects/norse_venture/screen1.jpeg",
  "/assets/projects/norse_venture/screen2.jpeg",
  "/assets/projects/norse_venture/screen3.jpeg",
];

export const NorseVenture = () => {
  return (
    <>
      <div className="flex flex-col h-full">
        <h1 className="text-4xl pb-2">Norse Venture</h1>
        <div className="flex flex-col gap-6 overflow-y-auto flex-1">
          <div className="flex flex-col gap-2">
            <span className="text-xl">Backend:</span>
            <ul className="text-orange-400">
              <li>
                <TechLink url="https://hono.dev/">HonoJS</TechLink>
              </li>
              <li>
                <TechLink url="https://orm.drizzle.team/">DrizzleORM</TechLink>
              </li>
              <li>
                <TechLink>Postgres</TechLink>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xl">Frontend:</span>
            <ul className="text-orange-400">
              <li>
                <TechLink url="https://expo.dev/">React Native (Expo)</TechLink>
              </li>
              <li>
                <TechLink url="https://zustand.docs.pmnd.rs/getting-started/introduction">
                  Zustand
                </TechLink>
              </li>
              <li>
                <TechLink url="https://tanstack.com/query/latest/docs/framework/react/overview">
                  Tanstack Query
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
            Norse Venture is a trip planning application built for ease of use
            and semplicity, I made it specifically for me and my friends which
            only send money to me when it comes to organizing a trip... - That's
            why it needed to be just really simple allowing for quick and
            effortless cooperation.
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
