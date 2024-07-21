import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sky, Cloud } from "@react-three/drei";
import useWebSocket from "../hooks/useWebSocket";
import { MeshStandardMaterial, CylinderGeometry } from "three";

const SatelliteModel = () => {
  const { data } = useWebSocket();
  const ref = useRef();
  const [scale, setScale] = useState(1);

  useFrame(() => {
    if (ref.current) {
      setScale(1 + Math.sin(Date.now() / 1000) * 0.05);
      ref.current.scale.set(scale, scale, scale);
      ref.current.position.set(data.x, data.y, data.z);
    }
  });

  return (
    <mesh ref={ref} position={[0, 0.5, 0]}>
      <cylinderGeometry args={[0.1, 0.1, 1, 32]} />
      <meshStandardMaterial color="#ff6f6f" roughness={0.7} metalness={0.3} />
    </mesh>
  );
};

const Ground = () => {
  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, -1, 0]}>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="lightgray" />
    </mesh>
  );
};

const ThreeDModel = () => {
  return (
    <div style={{ padding: "50px 0" }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <OrbitControls />
        <Sky
          distance={1000}
          sunPosition={[100, 100, 100]}
          inclination={0.49}
          azimuth={0.25}
          turbidity={10}
          rayleigh={2}
          mieCoefficient={0.005}
          mieDirectionalG={0.8}
        />
        <Cloud
          opacity={0.1}
          speed={0.2}
          width={10}
          depth={1}
          color="white"
          position={[0, 0, 0]}
        />
        <SatelliteModel />
        <Ground />
      </Canvas>
    </div>
  );
};

export default ThreeDModel;
