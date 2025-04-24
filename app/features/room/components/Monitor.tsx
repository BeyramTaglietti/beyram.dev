import { easings, useSpring } from "@react-spring/three";
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
import {
  Mesh,
  PerspectiveCamera,
  Vector3,
  type Object3D,
  type Object3DEventMap,
} from "three";
import { MacosHome } from "~/features/macos/components";
import { UseAnalytics } from "~/hooks";
import { RoomContext } from "../context";
import { InteractiveModelsEnum } from "../enums";

type MonitorRef = {
  watch: () => void;
  stopWatching: () => void;
};

export const Monitor = ({ ref }: { ref?: RefObject<MonitorRef | null> }) => {
  const { trackEvent } = UseAnalytics();

  const { scene, camera, size } = useThree();

  const { setDisableInteractions } = useContext(RoomContext);

  const monitorRef = useRef<Object3D<Object3DEventMap>>(null);
  const [htmlState, setHtmlState] = useState<{
    position: Vector3;
    size: Vector3;
  } | null>(null);

  const [, api] = useSpring(() => ({
    position: [camera.position.x, camera.position.y, camera.position.z],
  }));

  const calculateMonitorSize = useCallback(() => {
    if (monitorRef.current) {
      const monitorMesh = monitorRef.current as Mesh;
      monitorMesh.geometry.computeBoundingBox();
      const box = monitorMesh.geometry.boundingBox;

      if (!box) return;

      const minVec = box.min.clone();
      const maxVec = box.max.clone();

      minVec.applyMatrix4(monitorRef.current.matrixWorld);
      maxVec.applyMatrix4(monitorRef.current.matrixWorld);

      const minScreen = minVec.clone().project(camera);
      const maxScreen = maxVec.clone().project(camera);

      const pixelWidth = Math.abs(
        ((maxScreen.x - minScreen.x) * size.width) / 2
      );
      const pixelHeight = Math.abs(
        ((maxScreen.y - minScreen.y) * size.height) / 2
      );

      return new Vector3(pixelWidth, pixelHeight, 0);
    }
  }, [camera, size.height, size.width]);

  const lookAtMonitor = useCallback(() => {
    if (monitorRef.current) {
      trackEvent("Monitor clicked");

      const worldPosition = new Vector3();
      monitorRef.current.getWorldPosition(worldPosition);

      const newCameraPosition = worldPosition.clone();

      const monitorMesh = monitorRef.current as Mesh;
      monitorMesh.geometry.computeBoundingBox();
      const box = monitorMesh.geometry.boundingBox;

      if (!box) return;

      const monitorWidth = Math.abs(box.max.z - box.min.z);
      const monitorHeight = Math.abs(box.max.y - box.min.y);

      newCameraPosition.x -=
        distanceToFitObjectToView(
          (camera as PerspectiveCamera).aspect,
          (camera as PerspectiveCamera).fov,
          monitorWidth,
          monitorHeight
        ) / 42;

      api.set({
        position: [camera.position.x, camera.position.y, camera.position.z],
      });

      api.start({
        position: [
          newCameraPosition.x,
          newCameraPosition.y,
          newCameraPosition.z,
        ],
        config: {
          duration: 700,
          easing: easings.easeOutSine,
        },
        onStart: () => {
          setDisableInteractions(true);
        },
        onChange: ({ value }) => {
          camera.position.set(
            value.position[0],
            value.position[1],
            value.position[2]
          );
          camera.lookAt(worldPosition);
        },
        onRest: () => {
          const size = calculateMonitorSize();
          if (!size) return;

          setHtmlState({
            position: worldPosition,
            size,
          });
          setDisableInteractions(false);
        },
      });
    }
  }, [api, calculateMonitorSize, camera, setDisableInteractions, trackEvent]);

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

/**
 * Convert vertical field of view to horizontal field of view, given an aspect
 * ratio. See https://arstechnica.com/civis/viewtopic.php?f=6&t=37447
 *
 * @param vfov - The vertical field of view.
 * @param aspect - The camera aspect ratio, which is generally width/height of the viewport.
 * @returns - The horizontal field of view.
 */
function vfovToHfov(vfov: number, aspect: number): number {
  const { tan, atan } = Math;
  return atan(aspect * tan(vfov / 2)) * 2;
}

/**
 * Get the distance from the camera to fit an object in view by either its
 * horizontal or its vertical dimension.
 *
 * @param size - This should be the width or height of the object to fit.
 * @param fov - If `size` is the object's width, `fov` should be the horizontal
 * field of view of the view camera. If `size` is the object's height, then
 * `fov` should be the view camera's vertical field of view.
 * @returns - The distance from the camera so that the object will fit from
 * edge to edge of the viewport.
 */
function _distanceToFitObjectInView(size: number, fov: number): number {
  const { tan } = Math;
  return size / (2 * tan(fov / 2));
}

function distanceToFitObjectToView(
  cameraAspect: number,
  cameraVFov: number,
  objWidth: number,
  objHeight: number
): number {
  const objAspect = objWidth / objHeight;
  const cameraHFov = vfovToHfov(cameraVFov, cameraAspect);

  let distance: number = 0;

  if (objAspect > cameraAspect) {
    distance = _distanceToFitObjectInView(objHeight, cameraVFov);
  } else if (objAspect <= cameraAspect) {
    distance = _distanceToFitObjectInView(objWidth, cameraHFov);
  }

  return distance;
}
