import React from 'react';
import { Canvas } from '@react-three/fiber'; // Импортируем Canvas из react-three/fiber

import WebRTCPlayer from './components/WebRTCPlayer';
// import AccelGraph from './components/AccelGraph';
import GyroGraph from './components/GyroGraph';
import AltitudeGraph from './components/AltitudeGraph';
import ThrottleGraph from './components/ThrottleGraph';
import BodyOrientationXGraph from './components/BodyOrientationXGraph';
import BodyOrientationYGraph from './components/BodyOrientationYGraph';
import BodyOrientationZGraph from './components/BodyOrientationZGraph';
import GlobalPositioningSystem from './components/GlobalPositioningSystem';
import RawTelemetryGraph from './components/RawTelemetryGraph';
import AccelerationArrow from './components/AccelerationArrow';
import RealTimeData from './components/RealTimeData';
import Satellite from './components/Satellite';

import './App.css'; // Импортируем CSS файл

function App() {
    return (
        <div className="app-container">
            <div className="main-content">
                <div className="graphs top">
                    <GyroGraph />
                  
                    <Canvas>
                        <Satellite />
                    </Canvas>
                    {/* <AccelGraph /> */}
                    <BodyOrientationXGraph />
                    <BodyOrientationYGraph />
                    <BodyOrientationZGraph />
                </div>
                <div className="side-panel left">
                    <GlobalPositioningSystem />
                    <AltitudeGraph />
                    {/* <RawTelemetryGraph /> */}
                </div>
                <WebRTCPlayer />
                <div className="side-panel right">
                    {/* <ThrottleGraph /> */}
                    <AccelerationArrow />
                    <RealTimeData />
                </div>
            </div>
        </div>
    );
}

export default App;
