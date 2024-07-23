import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useWebSocket } from '../contexts/WebSocketProvider';
import * as THREE from 'three';

const AccelerationArrow = () => {
    const ref = useRef();
    const { data } = useWebSocket();

    useFrame(() => {
        if (ref.current) {
            const length = Math.sqrt(data.acceleration.x ** 2 + data.acceleration.y ** 2 + data.acceleration.z ** 2);
            const direction = new THREE.Vector3(data.acceleration.x, data.acceleration.y, data.acceleration.z).normalize();
            ref.current.rotation.setFromVector3(direction.applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2));
            ref.current.scale.set(1, length, 1);
            ref.current.position.set(0, length / 2, 0);
        }
    });

    return (
        <>
            <group ref={ref}>
                <mesh position={[0, 0.5, 0]}>
                    <cylinderGeometry args={[0.05, 0.05, 1, 32]} />
                    <meshStandardMaterial color="red" />
                </mesh>
                <mesh position={[0, 1.05, 0]}>
                    <coneGeometry args={[0.1, 0.2, 32]} />
                    <meshStandardMaterial color="red" />
                </mesh>
            </group>
            <axesHelper args={[5]} />
        </>
    );
};

export default AccelerationArrow;
