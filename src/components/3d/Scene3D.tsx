import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  useProgress,
  Html,
} from "@react-three/drei";
import { ReactModel } from "./ReactModel";
import { Suspense } from "react";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div
        style={{
          color: "white",
          fontWeight: 600,
          fontSize: 18,
          background: "rgba(0,0,0,0.5)",
          padding: "1em 2em",
          borderRadius: 8,
        }}
      >
        Loading... {progress.toFixed(0)}%
      </div>
    </Html>
  );
}

export function Scene3D() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: "transparent" }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={<Loader />}>
          <ambientLight intensity={0.5} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={1}
          />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          <ReactModel
            position={[0, 0, 0]}
            scale={2}
            rotation={[0, Math.PI / 4, 0]}
          />
          <Environment preset="city" />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
