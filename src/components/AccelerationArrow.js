import React, { useRef } from 'react';
import { Cone, Cylinder, OrbitControls, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useWebSocket } from "../contexts/WebSocketProvider";
import * as THREE from "three";

function AxisSquare({ rotation, color }) {
    return (
        <mesh position={[0, 0, 0]} scale={[0.5, 0.5, 0.5]} rotation={rotation}>
            <boxGeometry attach="geometry" args={[10, 10, 0.05, 1]} />
            <meshStandardMaterial attach="material" color={color} transparent opacity={0.3} />
        </mesh>
    );
}

const AccelerationArrow = () => {
    const { camera, gl } = useThree();
    camera.position.set(3, 3, 7);
    const { data } = useWebSocket();
    const arrowRef = useRef();
    const textRef = useRef();

    const arrowLength = 0.1; // Adjust as needed
    const arrowRadius = 0.1; // Adjust as needed
    const coneHeight = 0.5; // Adjust as needed
    const coneRadius = 0.2; // Adjust as needed

    useFrame(() => {
        if (arrowRef.current) {
            const x = data.acceleration.x || 0;
            const y = data.acceleration.y || 0;
            const z = data.acceleration.z || 0;

            const length = Math.sqrt(x * x + y * y + z * z);

            const direction = [x / length, y / length, z / length];

            arrowRef.current.position.set(0, 0, 0);
            arrowRef.current.rotation.setFromVector3(new THREE.Vector3(...direction).normalize());

            arrowRef.current.children[0].position.set(0, length / 2, 0);
            arrowRef.current.children[0].scale.set(1, length / arrowLength, 1);
            arrowRef.current.children[1].position.set(0, length, 0);
        }

        // Make text face the camera
        if (textRef.current) {
            textRef.current.lookAt(camera.position);
        }
    });

    return (
        <>
            <mesh position={[0, 0, 0]} scale={[0.5, 0.5, 0.5]}>
                <sphereGeometry attach="geometry" args={[1, 32, 16]} />
                <meshStandardMaterial attach="material" color="purple" transparent opacity={0.3} />
                <group ref={arrowRef}>
                    <Cylinder
                        args={[arrowRadius, arrowRadius, arrowLength, 32]}
                        position={[0, arrowLength / 2, 0]}
                    >
                        <meshStandardMaterial attach="material" color="blue" />
                    </Cylinder>
                    <Cone
                        args={[coneRadius, coneHeight, 32]}
                        position={[0, arrowLength, 0]}
                    >
                        <meshStandardMaterial attach="material" color="red" />
                    </Cone>
                </group>
            </mesh>
            {/* X axis squares */}
            <AxisSquare rotation={[Math.PI / 2, 0, Math.PI / 2]} color="red" />
            {/* Y axis squares */}
            <AxisSquare rotation={[0, Math.PI, Math.PI]} color="green" />
            {/* Z axis squares */}
            <AxisSquare rotation={[0, Math.PI / 2, Math.PI / 2]} color="blue" />
            {/* Static Text showing coordinates */}
            <Text
                ref={textRef}
                fontSize={0.5}
                color="black"
                anchorX="left"
                anchorY="top"
                position={[-6, 4, 0]} // Adjust position to place the text in the corner
            >
                {`(${(data.acceleration.x || 0).toFixed(2)}, ${(data.acceleration.y || 0).toFixed(2)}, ${(data.acceleration.z || 0).toFixed(2)})`}
            </Text>
            <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} args={[camera, gl.domElement]} />
        </>
    );
};

export default AccelerationArrow;
