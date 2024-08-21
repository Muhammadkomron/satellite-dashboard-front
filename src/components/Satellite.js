import React, { useRef } from 'react';
import { useFrame, useThree, useLoader } from '@react-three/fiber';
import { useWebSocket } from '../contexts/WebSocketProvider';
import * as THREE from 'three';
import { OrbitControls, Text } from '@react-three/drei';
import { TextureLoader } from 'three';

const Satellite = () => {
    const ref = useRef();
    const textRef = useRef();
    const { data } = useWebSocket() || {};
    const { camera, gl } = useThree();

    const logoTexture = useLoader(TextureLoader, '/icons/NazarX New Black.png');
    
    // Check if the texture is loaded correctly
    if (!logoTexture) {
        console.error('Texture failed to load.');
    }

    const currentRotation = useRef(new THREE.Euler(0, 0, 0));

    useFrame(() => {
        if (ref.current) {
            const targetRotation = new THREE.Euler(
                THREE.MathUtils.degToRad(data.pitch || 0),
                THREE.MathUtils.degToRad(data.yaw || 0),
                THREE.MathUtils.degToRad(data.roll || 0)
            );

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
            <ambientLight intensity={0.5} />
            <directionalLight 
                position={[10, 10, 10]} 
                castShadow 
                intensity={1.0} 
            />
            <spotLight 
                position={[20, 20, 20]} 
                angle={0.3} 
                penumbra={1} 
                castShadow 
                intensity={1.0} 
            />
            <mesh 
                ref={ref} 
                scale={[0.6, 0.6, 0.6]} 
                castShadow 
                receiveShadow
            >
                <cylinderGeometry args={[1, 1, 5, 32]} />
                <meshStandardMaterial 
                map={logoTexture}
                    color="white"
                    roughness={0.7} 
                    metalness={0.3} 
                />
            </mesh>
            <Text
                ref={textRef}
                fontSize={0.4}
                color="white"
                anchorX="left"
                anchorY="top"
                position={[-4, 3.5, 0]}
            >
                {`pitch: ${(data.pitch || 0).toFixed(2)}, roll: ${(data.roll || 0).toFixed(2)}, yaw: ${(data.yaw || 0).toFixed(2)}`}
            </Text>
            <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} args={[camera, gl.domElement]} />
        </>
    );
};

export default Satellite;
