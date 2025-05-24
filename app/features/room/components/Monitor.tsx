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
import { MacosHome } from "~/features/macos/components";
import { useAnalytics, useLookAtObject } from "~/hooks";
import { RoomContext } from "../context";
import { InteractiveModelsEnum } from "../enums";

type MonitorRef = {
  watch: () => void;
  stopWatching: () => void;
};

export const Monitor = ({ ref }: { ref?: RefObject<MonitorRef | null> }) => {
  const { trackEvent } = useAnalytics();

  const { scene } = useThree();

  const { setDisableInteractions } = useContext(RoomContext);

  const monitorRef = useRef<Object3D<Object3DEventMap>>(null);
  const [htmlState, setHtmlState] = useState<{
    position: Vector3;
    size: Vector3;
  } | null>(null);

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
    objectAxis: "x",
    distanceFactor: 1 / 42,
  });

  const lookAtMonitor = useCallback(() => {
    trackEvent("Monitor clicked");
    lookAtObject(monitorRef);
  }, [lookAtObject, trackEvent]);

  useImperativeHandle(ref, () => ({
    watch: lookAtMonitor,
    stopWatching: () => {
      setHtmlState(null);
    },
  }));

  useEffect(() => {
    const monitorScreen = scene.getObjectByName(
      InteractiveModelsEnum.monitor_screen
    );
    if (monitorScreen) {
      monitorRef.current = monitorScreen;
    }
  }, [scene]);

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
          <MacosHome />
        </Html>
      )}
    </>
  );
};
