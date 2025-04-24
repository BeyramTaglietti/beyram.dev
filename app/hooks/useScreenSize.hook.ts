import { useCallback, useEffect, useState } from "react";

export const useScreenSize = (): number => {
  const [screenSize, setScreenSize] = useState<number>(0);

  const handleResize = useCallback(() => {
    setScreenSize(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return screenSize;
};
