import React, { useRef } from 'react';
import { useFrame, useThree, useLoader } from '@react-three/fiber';
import { useWebSocket } from '../contexts/WebSocketProvider';
import * as THREE from 'three';
import { OrbitControls, Text } from '@react-three/drei';
import { TextureLoader } from 'three';

const Satellite = () => {
    const ref = useRef();
    const textRef = useRef();
    const { data } = useWebSocket()  || {};
    const { camera, gl } = useThree();

    const logoTexture = useLoader(TextureLoader, '/icons/NazarX New Black.png');

    const currentRotation = useRef(new THREE.Euler(0, 0, 0));
    const targetRotation = new THREE.Euler(
        THREE.MathUtils.degToRad(data.gyro.pitch),
        THREE.MathUtils.degToRad(data.gyro.yaw),
        THREE.MathUtils.degToRad(data.gyro.roll)
    );

    useFrame((state, delta) => {
        if (ref.current) {
            // Smoothly interpolate the rotation towards the target rotation
            currentRotation.current.x = THREE.MathUtils.lerp(currentRotation.current.x, targetRotation.x, 0.1);
            currentRotation.current.y = THREE.MathUtils.lerp(currentRotation.current.y, targetRotation.y, 0.1);
            currentRotation.current.z = THREE.MathUtils.lerp(currentRotation.current.z, targetRotation.z, 0.1);
            ref.current.rotation.copy(currentRotation.current);
        }
        if (textRef.current) {
            textRef.current.quaternion.copy(camera.quaternion);
        }
    });

    return (
        <>
            <mesh ref={ref} scale={[0.6, 0.6, 0.6]}>
                <cylinderGeometry args={[1, 1, 5, 32]} />
                <meshStandardMaterial map={logoTexture} roughness={0.7} metalness={0.3} />
            </mesh>
            <Text
                ref={textRef}
                fontSize={0.4}
                color="black"
                anchorX="left"
                anchorY="top"
                position={[-4, 3.5, 0]}
            >
                {`pitch: ${(data.gyro.pitch || 0).toFixed(2)}, roll: ${(
                    data.gyro.roll || 0
                ).toFixed(2)}, yaw: ${(data.gyro.yaw || 0).toFixed(2)}`}
            </Text>
            <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} args={[camera, gl.domElement]} />
        </>
    );
};

export default Satellite;
