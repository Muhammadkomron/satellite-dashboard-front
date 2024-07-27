import React, {useRef} from 'react';
import {useFrame, useThree, useLoader} from '@react-three/fiber';
import {useWebSocket} from '../contexts/WebSocketProvider';
import * as THREE from "three/src/math/MathUtils";
import {OrbitControls, Text} from "@react-three/drei";
import {TextureLoader} from 'three';

const Satellite = () => {
    const ref = useRef();
    const textRef = useRef();
    const {data} = useWebSocket();
    const {camera, gl} = useThree();

    // Load the texture for the logo
    const logoTexture = useLoader(TextureLoader, '/icons/nazarx.png');

    useFrame(() => {
        if (ref.current) {
            ref.current.rotation.set(THREE.MathUtils.degToRad(data.gyro.pitch), THREE.MathUtils.degToRad(data.gyro.yaw), THREE.MathUtils.degToRad(data.gyro.roll));
        }
        if (textRef.current) {
            textRef.current.quaternion.copy(camera.quaternion); // Make sure the text always faces the camera
        }
    });

    return (
        <>
            <mesh ref={ref} scale={[0.5, 0.5, 0.5]} position={[0, 0, 0]}>
                <cylinderGeometry args={[1, 1, 5, 32]}/>
                <meshStandardMaterial map={logoTexture} roughness={0.7} metalness={0.3}/>
            </mesh>
            <Text
                ref={textRef}
                fontSize={0.4}
                color="black"
                anchorX="left"
                anchorY="top"
                position={[-4, 3.5, 0]} // Adjust position to place the text in the corner
            >
                {`pitch: ${(data.gyro.pitch || 0).toFixed(2)}, roll: ${(
                    data.gyro.roll || 0
                ).toFixed(2)}, yaw: ${(data.gyro.yaw || 0).toFixed(2)}`}
            </Text>
            <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} args={[camera, gl.domElement]}/>
        </>
    );
};

export default Satellite;
