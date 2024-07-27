import React, {useRef, useState} from "react";
import {Cone, Cylinder, OrbitControls, Text} from "@react-three/drei";
import {useFrame, useThree} from "@react-three/fiber";
import {useWebSocket} from "../contexts/WebSocketProvider";
import * as THREE from "three";

function AxisSquare({rotation, color}) {
    return (
        <mesh position={[0, 0, 0]} scale={[0.5, 0.5, 0.5]} rotation={rotation}>
            <boxGeometry attach="geometry" args={[10, 10, 0.05, 1]}/>
            <meshBasicMaterial
                attach="material"
                color={color}
                transparent
                opacity={0.3}
            />
        </mesh>
    );
}

const AccelerationArrow = () => {
    const {camera, gl} = useThree();
    camera.position.set(3, 3, 7);
    const {data} = useWebSocket();
    const arrowRef = useRef();
    const textRef = useRef();
    const [color, setColor] = useState("blue");

    const arrowLength = 0.1;
    const arrowRadius = 0.4;
    const coneHeight = 2;
    const coneRadius = 0.8;

    useFrame(() => {
        if (arrowRef.current) {
            const x = data.acceleration.x || 0;
            const y = data.acceleration.y || 0;
            const z = data.acceleration.z || 0;

            let length = Math.sqrt(x * x + y * y + z * z);
            if (y < 0) {
                length = -length;
            }

            const direction = new THREE.Vector3(x / length, y / length, z / length).normalize();

            arrowRef.current.position.set(0, 0, 0);
            arrowRef.current.lookAt(direction);
            arrowRef.current.rotation.setFromVector3(direction);

            arrowRef.current.children[0].position.set(0, length / 2, 0);
            arrowRef.current.children[0].scale.set(1, length / arrowLength, 1);
            arrowRef.current.children[1].position.set(0, length, 0);

            if (x < 0) {
                setColor("red");
            } else {
                setColor("blue");
            }
        }

        if (textRef.current) {
            textRef.current.quaternion.copy(camera.quaternion);
        }
    });

    return (
        <>
            <mesh position={[0, 0, 0]} scale={[0.2, 0.2, 0.2]}>
                <sphereGeometry attach="geometry" args={[1, 32, 16]}/>
                <meshStandardMaterial
                    attach="material"
                    color={color}
                    transparent
                    opacity={0.3}
                />
                <group ref={arrowRef}>
                    <Cylinder
                        args={[arrowRadius, arrowRadius, arrowLength, 32]}
                        position={[0, arrowLength / 2, 0]}
                    >
                        <meshStandardMaterial attach="material" color={color}/>
                    </Cylinder>
                    <Cone
                        args={[coneRadius, coneHeight, 32]}
                        position={[0, arrowLength, 0]}
                    >
                        <meshStandardMaterial attach="material" color={color}/>
                    </Cone>
                </group>
            </mesh>
            <AxisSquare rotation={[Math.PI / 2, 0, Math.PI / 2]} color="red"/>
            <AxisSquare rotation={[0, Math.PI, Math.PI]} color="green"/>
            <AxisSquare rotation={[0, Math.PI / 2, Math.PI / 2]} color="blue"/>
            <Text
                ref={textRef}
                fontSize={0.7}
                color="black"
                anchorX="left"
                anchorY="top"
                position={[-8, 5.5, 0]} // Adjust position to place the text in the corner
            >
                {`x: ${(data.acceleration.x || 0).toFixed(2)}, y: ${(
                    data.acceleration.y || 0
                ).toFixed(2)}, z: ${(data.acceleration.z || 0).toFixed(2)}`}
            </Text>
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                enableRotate={false}
                args={[camera, gl.domElement]}
            />
        </>
    );
};

export default AccelerationArrow;
