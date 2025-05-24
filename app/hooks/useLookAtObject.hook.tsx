import { easings, useSpring } from "@react-spring/three";
import { useThree } from "@react-three/fiber";
import { useCallback, type RefObject } from "react";
import {
  Mesh,
  PerspectiveCamera,
  Vector3,
  type Object3D,
  type Object3DEventMap,
} from "three";
import { threeUtils } from "~/utils";

type UseLookAtObject = {
  lookAtObject: (obj: RefObject<Object3D<Object3DEventMap> | null>) => void;
};

export const useLookAtObject = ({
  onStart,
  onRest,
  objectAxis,
  distanceFactor,
}: {
  onStart: () => void;
  onRest: (pos: Vector3, size: Vector3) => void;
  objectAxis: "x" | "y" | "z";
  distanceFactor: number;
}): UseLookAtObject => {
  const { camera, size } = useThree();

  const [, positionApi] = useSpring(() => ({
    position: [camera.position.x, camera.position.y, camera.position.z],
  }));

  const [, rotationApi] = useSpring(() => ({
    rotation: [0, 0, 0, 1], // Quaternion components [x, y, z, w]
  }));

  const lookAtObject = useCallback(
    (objRef: RefObject<Object3D<Object3DEventMap> | null>) => {
      if (objRef.current) {
        // Get target position in world space
        const worldPosition = new Vector3();
        objRef.current.getWorldPosition(worldPosition);

        // Calculate new camera position
        const newCameraPosition = worldPosition.clone();

        const objMesh = objRef.current as Mesh;
        objMesh.geometry.computeBoundingBox();
        const box = objMesh.geometry.boundingBox;

        if (!box) return;

        const objectWidth = Math.abs(box.max.z - box.min.z);
        const objectHeight = Math.abs(box.max.y - box.min.y);

        newCameraPosition[objectAxis] -=
          distanceToFitObjectToView(
            (camera as PerspectiveCamera).aspect,
            (camera as PerspectiveCamera).fov,
            objectWidth,
            objectHeight
          ) * distanceFactor;

        // Calculate target rotation (as quaternion)
        const startQuaternion = camera.quaternion.clone();

        // Create a temporary camera to get the target quaternion
        const tempCamera = camera.clone();
        tempCamera.position.copy(newCameraPosition);
        tempCamera.lookAt(worldPosition);
        const targetQuaternion = tempCamera.quaternion.clone();

        // Convert quaternions to arrays for react-spring
        const startRotation = [
          startQuaternion.x,
          startQuaternion.y,
          startQuaternion.z,
          startQuaternion.w,
        ];

        const targetRotation = [
          targetQuaternion.x,
          targetQuaternion.y,
          targetQuaternion.z,
          targetQuaternion.w,
        ];

        // Start the animations
        onStart();

        // Set initial values
        positionApi.set({
          position: [camera.position.x, camera.position.y, camera.position.z],
        });

        rotationApi.set({
          rotation: startRotation,
        });

        // Animate position
        positionApi.start({
          position: [
            newCameraPosition.x,
            newCameraPosition.y,
            newCameraPosition.z,
          ],
          config: {
            duration: 700,
            easing: easings.easeOutSine,
          },
          onChange: ({ value }) => {
            camera.position.set(
              value.position[0],
              value.position[1],
              value.position[2]
            );
          },
        });

        // Animate rotation separately
        rotationApi.start({
          rotation: targetRotation,
          config: {
            duration: 700,
            easing: easings.easeOutSine,
          },
          onChange: ({ value }) => {
            camera.quaternion.set(
              value.rotation[0],
              value.rotation[1],
              value.rotation[2],
              value.rotation[3]
            );
          },
          onRest: () => {
            const objSize = threeUtils.calculateObjectSize(
              objRef.current as Mesh,
              size,
              camera as PerspectiveCamera
            );
            if (!objSize) return;
            onRest(worldPosition, objSize);
          },
        });
      }
    },
    [
      positionApi,
      rotationApi,
      camera,
      objectAxis,
      onRest,
      onStart,
      size,
      distanceFactor,
    ]
  );

  return { lookAtObject };
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
