import { useNavigation } from "@remix-run/react";
import { useEffect, useState } from "react";

const LoadingBar = () => {
  const [progress, setProgress] = useState<number>(0);
  const [visible, setVisible] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    async function setNewWidth() {
      if (navigation.state === "loading") {
        setProgress(0);
        let progressValue = 15;
        interval = setInterval(() => {
          setProgress(progressValue);
          if (progressValue < 90) progressValue += 1;
        }, 40);
        setVisible(true);
      } else {
        setProgress(100);
        clearInterval(interval);
      }
    }

    setNewWidth();

    return () => clearInterval(interval);
  }, [navigation]);

  useEffect(() => {
    let opacityTimeout: NodeJS.Timeout;
    let sizeTimeout: NodeJS.Timeout;

    if (progress === 100) {
      opacityTimeout = setTimeout(() => {
        setVisible(false);

        sizeTimeout = setTimeout(() => {
          setProgress(0);
        }, 500);
      }, 1000);
    }
    return () => {
      clearTimeout(opacityTimeout);
      clearTimeout(sizeTimeout);
    };
  }, [progress]);

  return (
    <div className="w-full h-1 flex absolute">
      {/* <div className="absolute top-0 left-0 text-white text-2xl flex flex-col">
        <span>Visible {visible}</span>
        <span>Width {progress}</span>
      </div> */}
      <span
        className={`˙${
          visible ? "opacity-100" : "opacity-0"
        } h-full bg-white transition-all duration-500 ease-in-out`}
        style={{
          width: progress ? `${progress}%` : "",
          opacity: visible ? "1" : "0",
        }}
      ></span>
    </div>
  );
};

export default LoadingBar;
