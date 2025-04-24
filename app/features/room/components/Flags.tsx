import { animated, useSpring } from "@react-spring/three";
import { Html } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import { Vector3 } from "three";
import { InteractiveFlagsEnum } from "../enums";

type FlagsProps = {
  lookingAt: InteractiveFlagsEnum | null;
};
export const Flags = ({ lookingAt }: FlagsProps) => {
  const { scene } = useThree();

  const tooltip = useMemo(() => {
    if (!lookingAt) return null;

    const flag = scene.getObjectByName(lookingAt);
    if (!flag) return null;

    const flagPosition = new Vector3();
    flag.getWorldPosition(flagPosition);
    flagPosition.z -= 0.4;

    const cities = Locations[lookingAt];
    if (!cities) return null;

    return {
      position: flagPosition,
      text: cities,
    };
  }, [lookingAt, scene]);

  const [spring, api] = useSpring(() => ({
    position: [tooltip?.position.x, tooltip?.position.y, tooltip?.position.z],
    config: { mass: 1, tension: 280, friction: 60 },
  }));

  useEffect(() => {
    if (tooltip) {
      api.start({
        position: [tooltip.position.x, tooltip.position.y, tooltip.position.z],
      });
    }
  }, [tooltip, api]);

  return (
    <>
      {tooltip && (
        <animated.group position={spring.position}>
          <Html center transform rotation-y={Math.PI / 2} distanceFactor={2}>
            <div className="bg-orange-400 rounded px-3 py-1 flex flex-col text-xs text-white">
              {tooltip.text.map((location, idx) => (
                <span key={`${location}_${idx}`}>{location}</span>
              ))}
            </div>
          </Html>
        </animated.group>
      )}
    </>
  );
};

const Locations: Record<InteractiveFlagsEnum, Array<string>> = {
  [InteractiveFlagsEnum.flag_italy]: [
    "Naples",
    "Rome",
    "Venice",
    "Florence",
    "Milan",
  ],
  [InteractiveFlagsEnum.flag_denmark]: ["Aarhus"],
  [InteractiveFlagsEnum.flag_hungary]: ["Budapest"],
  [InteractiveFlagsEnum.flag_norway]: ["Oslo"],
  [InteractiveFlagsEnum.flag_poland]: ["Warsaw"],
  [InteractiveFlagsEnum.flag_spain]: ["Barcelona", "LLoret de Mar"],
  [InteractiveFlagsEnum.flag_usa]: [
    "Los Angeles",
    "San Francisco",
    "Las Vegas",
  ],
  [InteractiveFlagsEnum.flag_switzerland]: ["Lugano"],
};
