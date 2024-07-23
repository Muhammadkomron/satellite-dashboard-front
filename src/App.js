import React from 'react';
import {Canvas} from '@react-three/fiber';
import Satellite from './components/Satellite';
import AltitudeGraph from './components/AltitudeGraph';
import {WebSocketProvider} from './contexts/WebSocketProvider';
import './App.css';
import {ContactShadows} from "@react-three/drei";
import RealTimeData from "./components/RealTimeData";
// import AccelerationArrow from "./components/AccelerationArrow";

function App() {
    return (
        <div className="App">
            <WebSocketProvider>
                <div className="content">
                    <Canvas style={{ height: '70vh', width: '70vw' }}>
                        <ambientLight intensity={0.5}/>
                        <directionalLight position={[10, 10, 5]}/>
                        <Satellite/>
                        <ContactShadows frames={1} position={[0, -3, 0]} blur={1} opacity={0.1}/>
                        <ContactShadows frames={1} position={[0, -3, 0]} blur={5} opacity={0.2} color="red"/>
                    </Canvas>
                    {/*<Canvas className="canvas" style={{ height: '40vh', width: '60vw', marginTop: '20px' }}>*/}
                    {/*    <ambientLight />*/}
                    {/*    <pointLight position={[10, 10, 10]} />*/}
                    {/*    <AccelerationArrow />*/}
                    {/*</Canvas>*/}
                    <div className="sidebar">
                        <RealTimeData />
                        <AltitudeGraph />
                    </div>
                </div>
            </WebSocketProvider>
        </div>
    );
}

export default App;
