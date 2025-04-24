import { MacosProvider } from "../context";
import { Dock } from "./Dock";
import { Navbar } from "./Navbar";
import { StageManager } from "./StageManager";

export const MacosHome = () => {
  return (
    <>
      <MacosProvider>
        <div className="w-full h-full bg-[url(/assets/textures/macos_wallpaper.jpg)] bg-cover bg-center flex flex-col">
          <div className="w-full h-[4%] max-h-8">
            <Navbar options={["File", "Edit", "View", "Window", "Help"]} />
          </div>

          <div className="flex-1 mb-[5%]">
            <StageManager />
          </div>

          <div className="h-[10%] absolute bottom-2 left-1/2 transform -translate-x-1/2 max-h-20">
            <Dock />
          </div>
        </div>
      </MacosProvider>
    </>
  );
};
