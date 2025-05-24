import { Html } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import {
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type RefObject,
} from "react";
import { Vector3, type Object3D, type Object3DEventMap } from "three";
import { SnakeGame } from "~/features/snake/components";
import { useAnalytics, useLookAtObject } from "~/hooks";
import { RoomContext } from "../context";
import { InteractiveModelsEnum } from "../enums";

type MonitorRef = {
  watch: () => void;
  stopWatching: () => void;
};

export const Gameboy = ({ ref }: { ref?: RefObject<MonitorRef | null> }) => {
  const { trackEvent } = useAnalytics();

  const { scene } = useThree();

  const { setDisableInteractions } = useContext(RoomContext);

  const [htmlState, setHtmlState] = useState<{
    position: Vector3;
    size: Vector3;
  } | null>(null);

  const gameboyConsoleRef = useRef<Object3D<Object3DEventMap>>(null);
  useEffect(() => {
    const gameboyScreen = scene.getObjectByName(
      InteractiveModelsEnum.gameboy_screen
    );
    if (gameboyScreen) {
      gameboyConsoleRef.current = gameboyScreen;
    }
  }, [scene]);

  const { lookAtObject } = useLookAtObject({
    onStart: () => {
      setDisableInteractions(true);
    },
    onRest: (pos, size) => {
      setHtmlState({
        position: pos,
        size,
      });
      setDisableInteractions(false);
    },
    objectAxis: "y",
    distanceFactor: 1000,
  });
  const lookAtGameScreen = useCallback(() => {
    trackEvent("Gameboy clicked");
    lookAtObject(gameboyConsoleRef);
  }, [lookAtObject, trackEvent]);

  useImperativeHandle(ref, () => ({
    watch: lookAtGameScreen,
    stopWatching: () => {
      setHtmlState(null);
    },
  }));

  return (
    <>
      {htmlState && (
        <Html
          center
          position={htmlState.position}
          style={{
            width: `${htmlState.size.x}px`,
            height: `${htmlState.size.y}px`,
          }}
        >
          <SnakeGame />
        </Html>
      )}
    </>
  );
};
