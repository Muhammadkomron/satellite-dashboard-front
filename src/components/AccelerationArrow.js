import React from 'react';
import {Cone, Cylinder, OrbitControls} from "@react-three/drei";
import {useFrame, useThree} from "@react-three/fiber";
import {useWebSocket} from "../contexts/WebSocketProvider";

function AxisSquare({rotation, color}) {
    return (
        <mesh position={[0, 0, 0]} scale={[0.5, 0.5, 0.5]} rotation={rotation}>
            <boxGeometry attach="geometry" args={[10, 10, 0.05, 1]}/>
            <meshStandardMaterial attach="material" color={color} transparent opacity={0.3}/>
        </mesh>
    );
}

const AccelerationArrow = () => {
    const {camera, gl} = useThree();
    camera.position.set(3, 3, 5);
    const {data} = useWebSocket();
    const arrowRef = React.useRef();

    const arrowLength = 5; // Adjust as needed
    const arrowRadius = 0.1; // Adjust as needed
    const coneHeight = 0.5; // Adjust as needed
    const coneRadius = 0.2; // Adjust as needed

    useFrame(() => {
        if (arrowRef.current) {
            // Update position of the arrow tip based on data.x, data.y, data.z
            const x = data.acceleration.x || 0;
            const y = data.acceleration.y || 0;
            const z = data.acceleration.z || 0;

            const length = Math.sqrt(x * x + y * y + z * z);

            // Calculate the position of the arrow tip
            // const direction = [x / length, y / length, z / length];
            const arrowTipPosition = [x, y, z];
            const arrowMiddlePosition = [x / 2, y / 2, z / 2];

            // Set position of the arrow parts
            arrowRef.current.children[0].position.set(...arrowMiddlePosition);
            arrowRef.current.children[0].scale.set(1, length / arrowLength, 1);
            arrowRef.current.children[1].position.set(...arrowTipPosition);
        }
    });
    return (
        <>
            <mesh position={[0, 0, 0]} scale={[0.5, 0.5, 0.5]}>
                <sphereGeometry attach="geometry" args={[1, 32, 16, 16]}/>
                <meshStandardMaterial attach="material" color="purple" transparent opacity={0.3}/>
            </mesh>
            {/* X axis squares */}
            <AxisSquare rotation={[Math.PI / 2, 0, Math.PI / 2]} color="red"/>

            {/* Y axis squares */}
            <AxisSquare rotation={[0, Math.PI, Math.PI]} color="green"/>

            {/* Z axis squares */}
            <AxisSquare rotation={[0, Math.PI / 2, Math.PI / 2]} color="blue"/>
            <group ref={arrowRef}>
                <Cylinder
                    args={[arrowRadius, arrowRadius, arrowLength, 32]}
                    position={[0, arrowLength / 2, 0]}
                    rotation={[0, 0, 0]}
                >
                    <meshStandardMaterial attach="material" color="red"/>
                </Cylinder>
                <Cone
                    args={[coneRadius, coneHeight, 32]}
                    position={[0, arrowLength, 0]}
                    rotation={[0, 0, 0]}
                >
                    <meshStandardMaterial attach="material" color="red"/>
                </Cone>
            </group>
            <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} args={[camera, gl.domElement]}/>
        </>
    );
};

export default AccelerationArrow;
