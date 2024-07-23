import React, {useRef} from 'react';
import {useFrame} from '@react-three/fiber';
import {useWebSocket} from '../contexts/WebSocketProvider';
import * as THREE from 'three';

const AccelerationArrow = () => {
    const ref = useRef();
    const {data} = useWebSocket();

    useFrame(() => {
        if (ref.current) {
            const length = Math.sqrt(data.acceleration.x ** 2 + data.acceleration.y ** 2 + data.acceleration.z ** 2);
            ref.current.setDirection(new THREE.Vector3(data.acceleration.x, data.acceleration.y, data.acceleration.z).normalize());
            ref.current.setLength(length);
        }
    });

    return (
        <>
            <arrowHelper
                ref={ref}
                args={[new THREE.Vector3(1, 0, 0), new THREE.Vector3(2, 0, 0), 1, 0xff0000]}
                position={[0, 0, 0]}
            />
            <axesHelper args={[5]} position={[2, 0, 0]}/>
        </>
    );
};

export default AccelerationArrow;
