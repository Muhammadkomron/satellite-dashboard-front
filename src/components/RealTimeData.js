import React from 'react';
import { useWebSocket } from '../contexts/WebSocketProvider';

const RealTimeData = () => {
    const { data, connected } = useWebSocket();

    return (
        <div className="real-time-data">
            <h2>Real-Time Data</h2>
            <p>WebSocket Status: {connected ? 'Connected' : 'Disconnected'}</p>
            <p>Humidity: {data.humidity}%</p>
            <p>Temperature: {data.temperature}°C</p>
            <p>Voltage: {data.voltage} V</p>
            <p>Iteration: {data.i}</p>
        </div>
    );
};

export default RealTimeData;
