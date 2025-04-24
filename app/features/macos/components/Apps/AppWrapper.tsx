import { type ReactNode } from "react";
import { cn } from "~/utils";

export const AppWrapper = ({
  active,
  children,
  className,
}: {
  active: boolean;
  children: ReactNode;
  className?: string;
}) => {
  return (
    <>
      <div
        className={cn(
          "size-full bg-[#1d1d20fa] text-white backdrop-blur-2xl rounded-[.5em] flex flex-col overflow-hidden shadow transition-all duration-400",
          active ? "p-3" : "p-0.5",
          className
        )}
      >
        <div
          className={cn(
            "flex flex-col overflow-hidden transition-all duration-400",
            active ? "w-full h-[6%] max-h-3" : "h-0 w-0"
          )}
        >
          <ActionButtons />
        </div>
        <div className="size-full relative pt-1">
          <div
            className={cn(
              "overflow-hidden absolute origin-top-left transition-all duration-400",
              active ? "scale-100 size-[100%]" : `scale-[30%] size-[333%]`
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

const baseClass =
  "bg-gray-600 rounded-full transition-all duration-100 h-full aspect-square";
const ActionButtons = () => {
  return (
    <>
      <div className="flex flex-row gap-2 size-full max-h-4 group">
        <div className={cn(baseClass, "group-hover:bg-red-400")}></div>
        <div className={cn(baseClass, "group-hover:bg-yellow-400")}></div>
        <div className={cn(baseClass, "group-hover:bg-green-400")}></div>
      </div>
    </>
  );
};
