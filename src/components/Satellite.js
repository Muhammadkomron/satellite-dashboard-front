import React, {useRef} from 'react';
import {useFrame, useThree} from '@react-three/fiber';
import {useWebSocket} from '../contexts/WebSocketProvider';
import * as THREE from "three/src/math/MathUtils";
import {OrbitControls} from "@react-three/drei";

const Satellite = () => {
    const ref = useRef();
    const {data} = useWebSocket();

    const {camera, gl} = useThree();
    const controls = useRef();
    useFrame(() => {
        if (ref.current) {
            ref.current.rotation.set(THREE.MathUtils.degToRad(data.gyro.pitch), THREE.MathUtils.degToRad(data.gyro.yaw), THREE.MathUtils.degToRad(data.gyro.roll));
        }
        controls.current.update();
    });
    return (<>
            <mesh ref={ref} scale={[0.5, 0.5, 0.5]} position={[0, 0, 0]}>
                <cylinderGeometry args={[1, 1, 5, 32]} />
                <meshStandardMaterial color="#ff6f6f" roughness={0.7} metalness={0.3}/>
            </mesh>
            <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} ref={controls} args={[camera, gl.domElement]}/>
        </>);
};

export default Satellite;
