import React, { createContext, useContext, useEffect, useState } from 'react';

// Default context value with added GPS coordinates
const defaultWebSocketContext = {
    data: {
        i: 0,
        status: -1,
        altitude: 0,
        temperature: 0,
        humidity: 0,
        voltage: 0,
        gyro: { yaw: 0, pitch: 0, roll: 0 },
        acceleration: { x: -5, y: 1, z: 10 },
        latitude: 0,
        longitude: 0,
        altitude: 0,
    },
    connected: false,
};

const WebSocketContext = createContext(defaultWebSocketContext);

export const WebSocketProvider = ({ children }) => {
    const [data, setData] = useState({
        i: 0,
        status: -1,
        altitude: 0,
        temperature: 0,
        humidity: 0,
        voltage: 0,
        gyro: { yaw: 0, pitch: 0, roll: 40 },
        acceleration: { x: -5, y: 1, z: 10 },
        latitude: 0,
        longitude: 0,
       
    });

    // Simulate WebSocket data with random values
    useEffect(() => {
        const interval = setInterval(() => {
            setData(prevData => ({
                ...prevData,
                i: prevData.i + 1,
                altitude: Math.floor(Math.random() * 900),
                temperature: Math.floor(Math.random() * 30),
                humidity: Math.floor(Math.random() * 100),
                voltage: Math.floor(Math.random() * 12),
                gyro: {
                    yaw: Math.ceil(Math.random() * 50) * (Math.round(Math.random()) ? 1 : -1),
                    pitch: Math.ceil(Math.random() * 50) * (Math.round(Math.random()) ? 1 : -1),
                    roll: Math.ceil(Math.random() * 50) * (Math.round(Math.random()) ? 1 : -1)
                },
                acceleration: {
                    x: Math.ceil(Math.random() * 10) * (Math.round(Math.random()) ? 1 : -1),
                    y: Math.ceil(Math.random() * 10) * (Math.round(Math.random()) ? 1 : -1),
                    z: Math.ceil(Math.random() * 10) * (Math.round(Math.random()) ? 1 : -1)
                },
                latitude: (Math.random() * 180 - 90).toFixed(6), // Random latitude between -90 and 90
                longitude: (Math.random() * 360 - 180).toFixed(6), // Random longitude between -180 and 180
            }));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <WebSocketContext.Provider value={{ data }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => useContext(WebSocketContext);
