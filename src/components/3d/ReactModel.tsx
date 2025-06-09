import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Group } from "three";

interface ReactModelProps {
  position?: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
}

export function ReactModel({
  position = [0, 0, 0],
  scale = 1,
  rotation = [0, 0, 0],
}: ReactModelProps) {
  const group = useRef<Group>(null);
  const { scene } = useGLTF("/react.gltf");

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = Math.sin(t / 2) * 0.1;
    group.current.position.y = Math.sin(t / 1.5) * 0.1;
  });

  return (
    <group ref={group} position={position} scale={scale} rotation={rotation}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/react.gltf");
