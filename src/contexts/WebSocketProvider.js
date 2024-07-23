import React, {createContext, useContext, useEffect, useState} from 'react';

const REACT_APP_WEBSOCKET_URL = process.env.REACT_APP_WEBSOCKET_URL;

const defaultWebSocketContext = {
    data: {
        i: 0,
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
        altitude: 0,
        temperature: 0,
        humidity: 0,
        voltage: 0,
        gyro: {yaw: 0, pitch: 0, roll: 0},
        acceleration: {x: -5, y: 1, z: 10},
    });
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        const key = Math.random().toString(36).substring(2, 10);
        console.log(REACT_APP_WEBSOCKET_URL);
        const ws = new WebSocket(`${REACT_APP_WEBSOCKET_URL}?key=${key}`);

        ws.onopen = () => {
            setConnected(true);
        };

        ws.onmessage = (event) => {
            try {
                console.log(event.data);
                const receivedData = JSON.parse(event.data);
                setData(prevData => ({
                    ...prevData, ...receivedData
                }));
            } catch (error) {
                console.log('Error parsing JSON:', error);
            }
        };

        ws.onclose = () => {
            console.log('WebSocket closed');
        };

        return () => {
            ws.close();
        };
    }, []);

    return (<WebSocketContext.Provider value={{data, connected}}>
        {children}
    </WebSocketContext.Provider>);
};

export const useWebSocket = () => useContext(WebSocketContext);
