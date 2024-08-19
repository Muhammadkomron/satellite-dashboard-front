import React, {useState} from 'react';
import {Canvas} from '@react-three/fiber';
import Satellite from './components/Satellite';
import AltitudeGraph from './components/AltitudeGraph';
import {WebSocketProvider} from './contexts/WebSocketProvider';
import './App.css';
import {ContactShadows} from "@react-three/drei";
import RealTimeData from "./components/RealTimeData";
import AccelerationArrow from "./components/AccelerationArrow";
import WebRTCPlayer from "./components/WebRTCPlayer";
import GlobalPositioningSystem from './components/GlobalPositioningSystem';
import Preloader from './components/Preloader';

function App() {
    const [loadingComplete, setLoadingComplete] = useState(false);
    return (
        <div className="App">
            <WebSocketProvider>
            <div>
                {loadingComplete ? (
                        <div className="content">
                            <div className="data-cells">
                                <div className="canvas">
                                    {/* <ambientLight/>
                                    <pointLight position={[10, 8, 5]}/> */}
                                    <AccelerationArrow/>
                                </div>
                                <Canvas className="canvas">
                                    <ambientLight intensity={0.5}/>
                                    <directionalLight position={[10, 10, 5]}/>
                                    <Satellite/>
                                    <ContactShadows frames={1} position={[0, -3, 0]} blur={3} opacity={0.1}/>
                                    <ContactShadows frames={1} position={[0, -3, 0]} blur={6} opacity={0.2}
                                                    color="red"/>
                                </Canvas>
                                <div className="cell graph canvas">
                                    <AltitudeGraph/>
                                </div>
                            </div>
                            <div className="canvas-container">
                                <div className="cell">
                                    <WebRTCPlayer/>
                                </div>
                                <div className="cell">
                                    <RealTimeData/>
                                </div>
                                <div className="cell">
                                    <GlobalPositioningSystem/>
                                </div>
                            </div>
                        </div>
                ) : (
                    <Preloader onLoadingComplete={() => setLoadingComplete(true)}/>
                )}
            </div>
            </WebSocketProvider>
        </div>
    );
}

export default App;
