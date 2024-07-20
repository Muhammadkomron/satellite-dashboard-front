import React from 'react';
import useWebSocket from "../hooks/useWebSocket";

const Dashboard = () => {
    const {data, isConnected} = useWebSocket();

    return (<div>
        <h1>Real-Time IoT Dashboard</h1>
        <p>WebSocket Status: {isConnected ? 'Connected' : 'Disconnected'}</p>
        <p>Temperature: {data.t} °C</p>
        <p>Humidity: {data.h} %</p>
        <p>Voltage: {data.v} V</p>
    </div>);
};

export default Dashboard;
