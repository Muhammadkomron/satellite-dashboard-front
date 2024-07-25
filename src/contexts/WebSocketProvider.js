import React, {createContext, useContext, useEffect, useState} from 'react';

// const REACT_APP_WEBSOCKET_URL = process.env.REACT_APP_WEBSOCKET_URL;

const defaultWebSocketContext = {
    data: {
        i: 0,
        status: -1,
        altitude: 0,
        temperature: 0,
        humidity: 0,
        voltage: 0,
        gyro: {yaw: 0, pitch: 0, roll: 0},
        acceleration: {x: -5, y: 1, z: 10},
    },
    connected: false,
};

const WebSocketContext = createContext(defaultWebSocketContext);


export const WebSocketProvider = ({children}) => {
    const [data, setData] = useState({
        i: 0,
        status: -1,
        altitude: 0,
        temperature: 0,
        humidity: 0,
        voltage: 0,
        gyro: {yaw: 0, pitch: 0, roll: 40},
        acceleration: {x: -5, y: 1, z: 10},
    });
    // const [connected, setConnected] = useState(true);
    // setConnected(true);
    // useEffect(() => {
    //     const key = Math.random().toString(36).substring(2, 10);
    //     console.log(REACT_APP_WEBSOCKET_URL);
    //     const ws = new WebSocket(`${REACT_APP_WEBSOCKET_URL}?key=${key}`);

    useEffect(() => {
        const interval = setInterval(() => {
            setData({
                i: 0,
                altitude: Math.floor(Math.random() * 900),
                temperature: Math.floor(Math.random() * 30),
                humidity: Math.floor(Math.random() * 100),
                voltage: Math.floor(Math.random() * 12),
                gyro: {yaw: Math.ceil(Math.random() * 50) * (Math.round(Math.random()) ? 1 : -1), pitch: Math.ceil(Math.random() * 50) * (Math.round(Math.random()) ? 1 : -1), roll: Math.ceil(Math.random() * 50) * (Math.round(Math.random()) ? 1 : -1)},
                acceleration: {x: Math.ceil(Math.random() * 10) * (Math.round(Math.random()) ? 1 : -1), y: Math.ceil(Math.random() * 10) * (Math.round(Math.random()) ? 1 : -1), z: Math.ceil(Math.random() * 10) * (Math.round(Math.random()) ? 1 : -1)},
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);
    // ws.onopen = () => {
    //     setConnected(true);
    // };
    //
    // ws.onmessage = (event) => {
    //     try {
    //         console.log(event.data);
    //         const receivedData = JSON.parse(event.data);
    //         setData(prevData => ({
    //             ...prevData, ...receivedData
    //         }));
    //     } catch (error) {
    //         console.log('Error parsing JSON:', error);
    //     }
    // };
    //
    // ws.onclose = () => {
    //     console.log('WebSocket closed');
    // };
    //
    // return () => {
    //     ws.close();
    // };
    // }, []);

    return (<WebSocketContext.Provider value={{data}}>
        {children}
    </WebSocketContext.Provider>);
};

export const useWebSocket = () => useContext(WebSocketContext);
