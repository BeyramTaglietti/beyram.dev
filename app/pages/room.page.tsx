import { OrbitControls, useProgress } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useContext, useState } from "react";
import { Room, SceneLoading } from "~/features/room/components";
import { RoomContext } from "~/features/room/context";

export const RoomPage = () => {
  const { progress } = useProgress();
  const { sceneInitialized, setSceneInitialized } = useContext(RoomContext);
  const [modelsLoading, setModelsLoading] = useState(true);

  return (
    <div className="w-dvw h-dvh">
      {!sceneInitialized && (
        <div className="absolute w-dvw h-dvh z-20">
          <SceneLoading
            startScene={() => setSceneInitialized(true)}
            progress={progress}
            modelsLoading={modelsLoading}
          />
        </div>
      )}
      <Canvas
        className="w-full h-full z-10"
        shadows
        camera={{
          position: [3, 3.3, 6.5],
        }}
        onCreated={({ gl }) => {
          gl.setClearColor("#858585");
        }}
      >
        <CustomOrbits />
        <spotLight
          position={[1, 6, -8]}
          angle={0.4}
          penumbra={1}
          decay={0.2}
          intensity={30}
          castShadow
          shadow-bias={-0.0002}
          color={"#ff8400"}
        />
        <pointLight intensity={30} position={[0, 4, 0]} />

        <Room onModelLoaded={() => setModelsLoading(false)} />
      </Canvas>
    </div>
  );
};

const CustomOrbits = () => {
  const roomContext = useContext(RoomContext);

  return (
    <OrbitControls
      minAzimuthAngle={-Math.PI / 6}
      maxAzimuthAngle={Math.PI / 1.6}
      enabled={roomContext.orbitsEnabled}
      target={roomContext.orbitsTarget}
    />
  );
};
