import React from 'react';
import {Canvas} from '@react-three/fiber';
import Satellite from './components/Satellite';
import AltitudeGraph from './components/AltitudeGraph';
import {WebSocketProvider} from './contexts/WebSocketProvider';
import './App.css';
import {ContactShadows} from "@react-three/drei";
import RealTimeData from "./components/RealTimeData";
import AccelerationArrow from "./components/AccelerationArrow";
import WebRTCPlayer from "./components/WebRTCPlayer";

function App() {
    return (
        <div className="App">
            <WebSocketProvider>
                <div className="content">
                    <div className="data-cells">
                        <div className="cell">
                            <RealTimeData/>
                        </div>
                        <div className="graph">
                            <AltitudeGraph/>
                        </div>
                        <div className="video-cell">
                            <WebRTCPlayer/>
                        </div>
                    </div>
                    <div className="canvas-container">
                        <Canvas className="canvas" style={{height: '40vh'}}>
                            <ambientLight intensity={0.5}/>
                            <directionalLight position={[10, 10, 5]}/>
                            <Satellite/>
                            <ContactShadows frames={1} position={[0, -3, 0]} blur={3} opacity={0.1}/>
                            <ContactShadows frames={1} position={[0, -3, 0]} blur={6} opacity={0.2} color="red"/>
                        </Canvas>
                        <Canvas className="canvas" style={{height: '40vh', marginTop: '20px'}}>
                            <ambientLight/>
                            <pointLight position={[10, 8, 5]}/>
                            <AccelerationArrow/>
                        </Canvas>
                    </div>
                </div>
            </WebSocketProvider>
        </div>
    );
}

export default App;
