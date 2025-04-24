import { useSpring } from "@react-spring/three";
import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ComponentRef,
} from "react";
import { Raycaster, Vector2, Vector3 } from "three";
import { useScreenSize } from "~/hooks";
import { RoomContext } from "../context";
import { InteractiveFlagsEnum, InteractiveModelsEnum } from "../enums";
import { DeskLamp } from "./DeskLamp";
import { Flags } from "./Flags";
import { Monitor } from "./Monitor";
import { VinylPlayer } from "./VinylPlayer";

export const Room = ({ onModelLoaded }: { onModelLoaded: () => void }) => {
  const { scene } = useGLTF(
    "/assets/models/room250418.glb",
    undefined,
    undefined,
    () => {
      onModelLoaded();
    }
  );

  const screenSize = useScreenSize();

  const { disableInteractions, enableOrbits, disableOrbits, setOrbitsTarget } =
    useContext(RoomContext);

  const { gl, camera } = useThree();
  const raycaster = useRef(new Raycaster());

  const vinylPlayerRef = useRef<ComponentRef<typeof VinylPlayer>>(null);
  const deskLampRef = useRef<ComponentRef<typeof DeskLamp>>(null);
  const monitorRef = useRef<ComponentRef<typeof Monitor>>(null);

  const [lookingAt, setLookingAt] = useState<InteractiveModelsEnum | null>(
    null
  );
  const [onMonitor, setOnMonitor] = useState(false);

  const [, api] = useSpring(() => ({
    position: [camera.position.x, camera.position.y, camera.position.z],
  }));

  const [startingCameraPosition, setStartingCameraPosition] = useState(
    camera.position.toArray()
  );

  const detectRaycast = useCallback(
    (event: MouseEvent) => {
      const mouse = new Vector2();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.current.setFromCamera(mouse, camera);

      const lookingAt = raycaster.current.intersectObjects(
        scene.children,
        true
      );

      const foundModel = lookingAt.some((intersect) => {
        return Object.values(InteractiveModelsEnum).some((model) => {
          if (intersect.object.name === model) {
            console.log("looking at", model);
            setLookingAt(model);
            return true;
          }
        });
      });

      if (!foundModel) setLookingAt(null);

      document.body.style.cursor = foundModel ? "pointer" : "default";
    },
    [camera, scene]
  );

  const handleClick = useCallback(() => {
    if (disableInteractions) return;

    switch (lookingAt) {
      case InteractiveModelsEnum.vinyl_base:
        vinylPlayerRef.current?.play();
        break;
      case InteractiveModelsEnum.lamp_light_case:
      case InteractiveModelsEnum.lamp_light_base:
        deskLampRef.current?.toggleLight();
        break;
      case InteractiveModelsEnum.monitor_screen:
        if (screenSize < 900) return;
        disableOrbits();
        setStartingCameraPosition(camera.position.toArray());
        monitorRef.current?.watch();
        setOnMonitor(true);
        break;
      default:
        if (onMonitor) {
          const worldPosition = new Vector3();
          const monitor = scene.getObjectByName(
            InteractiveModelsEnum.monitor_screen
          );
          monitor?.getWorldPosition(worldPosition);

          api.set({
            position: [camera.position.x, camera.position.y, camera.position.z],
          });

          setLookingAt(null);
          monitorRef.current?.stopWatching();
          setOnMonitor(false);
          setOrbitsTarget(worldPosition);
          enableOrbits();

          api.start({
            position: [
              startingCameraPosition[0],
              startingCameraPosition[1],
              startingCameraPosition[2],
            ],
            onChange: ({ value }) => {
              camera.position.set(
                value.position[0],
                value.position[1],
                value.position[2]
              );
              camera.lookAt(worldPosition);
            },
          });
        }
        break;
    }
  }, [
    api,
    camera,
    disableInteractions,
    disableOrbits,
    enableOrbits,
    lookingAt,
    onMonitor,
    scene,
    screenSize,
    setOrbitsTarget,
    startingCameraPosition,
  ]);

  useEffect(() => {
    scene.traverse((obj) => {
      if (obj.isObject3D) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });

    gl.domElement.addEventListener("mousedown", handleClick);
    gl.domElement.addEventListener("mousemove", detectRaycast);

    return () => {
      gl.domElement.removeEventListener("mousedown", handleClick);
      gl.domElement.removeEventListener("mousemove", detectRaycast);
    };
  }, [detectRaycast, gl.domElement, handleClick, scene]);

  return (
    <>
      <primitive object={scene} />
      <VinylPlayer ref={vinylPlayerRef} />
      <DeskLamp ref={deskLampRef} />
      <Monitor ref={monitorRef} />
      <Flags lookingAt={lookingAt as InteractiveFlagsEnum | null} />
    </>
  );
};
