import { useEffect, useState } from "react";

export type NavigationState = "idle" | "loading" | "submitting";

const LoadingBar = ({
  navigationState,
}: {
  navigationState: NavigationState;
}) => {
  const [width, setWidth] = useState("");

  useEffect(() => {
    async function setNewWidth() {
      if (navigationState === "loading") setWidth("w-4");
      else {
        setWidth("w-full");
      }
    }

    setNewWidth();
  }, [navigationState]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (width === "w-full") {
      timeout = setTimeout(() => {
        setWidth("");
      }, 1000);
    }
    return () => clearTimeout(timeout);
  }, [width]);

  return (
    <div className="w-full h-1 flex absolute">
      <span
        className={`${width} h-full bg-white duration-500 transition-all ease-out`}
      ></span>
    </div>
  );
};

export default LoadingBar;
