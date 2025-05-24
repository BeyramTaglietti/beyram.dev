import type { Size } from "@react-three/fiber";
import { Mesh, PerspectiveCamera, Vector3 } from "three";

const calculateObjectSize = (
  obj: Mesh,
  size: Size,
  camera: PerspectiveCamera
) => {
  obj.geometry.computeBoundingBox();
  const box = obj.geometry.boundingBox;

  if (!box) return;

  const minVec = box.min.clone();
  const maxVec = box.max.clone();

  minVec.applyMatrix4(obj.matrixWorld);
  maxVec.applyMatrix4(obj.matrixWorld);

  const minScreen = minVec.clone().project(camera);
  const maxScreen = maxVec.clone().project(camera);

  const pixelWidth = Math.abs(((maxScreen.x - minScreen.x) * size.width) / 2);
  const pixelHeight = Math.abs(((maxScreen.y - minScreen.y) * size.height) / 2);

  return new Vector3(pixelWidth, pixelHeight, 0);
};

export const threeUtils = { calculateObjectSize };
