import { PositionalAudio } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type ComponentRef,
  type RefObject,
} from "react";
import type { Object3D } from "three";
import { UseAnalytics } from "~/hooks";

type VinylRef = {
  play: () => void;
};

export const VinylPlayer = ({ ref }: { ref?: RefObject<VinylRef | null> }) => {
  const { trackEvent } = UseAnalytics();

  const vinylDiscRef = useRef<Object3D | null>(null);
  const audioRef = useRef<ComponentRef<typeof PositionalAudio> | null>(null);

  const { scene } = useThree();

  const [isRotating, setIsRotating] = useState(false);

  useEffect(() => {
    const vinylDisc = scene.getObjectByName("vinyl_disk");
    if (vinylDisc) {
      vinylDiscRef.current = vinylDisc;
    }
  }, [scene]);

  useFrame(() => {
    if (vinylDiscRef.current && isRotating) {
      vinylDiscRef.current.rotation.y += 0.01;
    }
  });

  const playMusic = useCallback(() => {
    trackEvent("Playing music");

    if (audioRef.current) {
      if (isRotating) {
        audioRef.current.pause();
        setIsRotating(false);
      } else {
        audioRef.current.play();
        setIsRotating(true);
      }
    }
  }, [isRotating, trackEvent]);

  useImperativeHandle(
    ref,
    () => ({
      play: playMusic,
    }),
    [playMusic]
  );

  return (
    <>
      <PositionalAudio
        ref={audioRef}
        url="/assets/audio/school_globes_vinyl.mp3"
        distance={2}
        loop
        position={vinylDiscRef.current?.position}
      />
    </>
  );
};
