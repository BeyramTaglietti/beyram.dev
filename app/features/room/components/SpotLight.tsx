import type { SpotLightProps } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { SpotLightHelper } from "three";

export const SpotLight = ({ ...spotLightProps }: SpotLightProps) => {
  const lightRef = useRef(undefined);
  const { scene } = useThree();

  useEffect(() => {
    let helper: SpotLightHelper;
    if (lightRef.current) {
      helper = new SpotLightHelper(lightRef.current);
      scene.add(helper);
    }

    return () => {
      scene.remove(helper);
    };
  }, [scene]);

  return <spotLight {...spotLightProps} ref={lightRef} />;
};
