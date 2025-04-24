import { Loader } from "lucide-react";

type SceneLoadingProps = {
  startScene: () => void;
  progress: number;
  modelsLoading?: boolean;
};
export const SceneLoading = ({
  startScene,
  progress,
  modelsLoading,
}: SceneLoadingProps) => {
  return (
    <>
      <div className="size-full bg-white flex justify-center items-center">
        {progress !== 100 || modelsLoading ? (
          <>
            <span className="text-2xl mr-2 font-semibold">
              {progress === 0 ? (
                "Downloading assets"
              ) : (
                <div className="flex flex-row gap-2">
                  <span>Loading scene</span>
                  <span className="text-primary">{progress.toFixed(0)}%</span>
                </div>
              )}
            </span>
            {progress === 0 && (
              <Loader className="animate-spin text-2xl ml-2" />
            )}
          </>
        ) : (
          <>
            <button
              className="text-5xl cursor-pointer bg-gradient-to-r from-primary to-primary-gradient bg-clip-text font-semibold text-gray hover:text-transparent transition-colors duration-400"
              onClick={startScene}
            >
              Start
            </button>
          </>
        )}
      </div>
    </>
  );
};
