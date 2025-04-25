import { PositionalAudio } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type ComponentRef,
  type RefObject,
} from "react";
import {
  Mesh,
  MeshStandardMaterial,
  Object3D,
  type Object3DEventMap,
} from "three";

type DeskLampRef = {
  toggleLight: () => void;
};

export const DeskLamp = ({ ref }: { ref?: RefObject<DeskLampRef | null> }) => {
  const lampLightRef = useRef<Object3D<Object3DEventMap>>(undefined);
  const lampBulbRef = useRef<Object3D<Object3DEventMap>>(undefined);
  const audioRef = useRef<ComponentRef<typeof PositionalAudio> | null>(null);

  const { scene } = useThree();

  useEffect(() => {
    lampLightRef.current = scene.getObjectByName("lamp_light_case");
    lampBulbRef.current = scene.getObjectByName("lamp_light_bulb");
  }, [scene]);

  const [lightOn, setLightOn] = useState(false);

  const toggleLight = useCallback(() => {
    if (!lampBulbRef.current) return;
    const material = (lampBulbRef.current.children[0] as Mesh)
      .material as MeshStandardMaterial;
    if (lightOn) {
      setLightOn(false);
      material.emissiveIntensity = 0.3;
    } else {
      setLightOn(true);
      material.emissiveIntensity = 10;
    }

    if (audioRef.current) {
      audioRef.current.play();
    }
  }, [lightOn]);

  useImperativeHandle(
    ref,
    () => ({
      toggleLight,
    }),
    [toggleLight]
  );

  return (
    <group>
      <spotLight
        position={lampLightRef.current?.position ?? [0, 0, 0]}
        intensity={8}
        angle={0.8}
        penumbra={1}
        decay={7}
        castShadow
        shadow-bias={-0.001}
        visible={lightOn}
      />
      {lampLightRef.current && (
        <PositionalAudio
          ref={audioRef}
          url="/assets/audio/light_switch.mp3"
          distance={0.3}
          loop={false}
          position={lampLightRef.current?.position}
        />
      )}
    </group>
  );
};
