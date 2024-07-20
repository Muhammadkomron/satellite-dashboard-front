import {useEffect, useState} from 'react';

const REACT_APP_WEBSOCKET_URL = process.env.REACT_APP_WEBSOCKET_URL;

const useWebSocket = () => {
    const [data, setData] = useState({i: 0, x:0, t: 0, h: 0, v: 0, ax: 0, ay:0, az: 0, gx: 0, gy: 0, gz: 0});
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const key = Math.random().toString(36).substr(2, 10);
        console.log(REACT_APP_WEBSOCKET_URL);
        const ws = new WebSocket(`${REACT_APP_WEBSOCKET_URL}?key=${key}`);

        ws.onopen = () => {
            setIsConnected(true);
            console.log('Connected to WebSocket server');
        };
        ws.onmessage = (event) => {
            try {
                console.log(event.data);
                const receivedData = JSON.parse(event.data);
                setData(prevData => ({
                    ...prevData,
                    ...receivedData
                }));
            } catch (error) {
                console.log('Error parsing JSON:', error);
            }
        };

        ws.onclose = () => {
            setIsConnected(false);
            console.log('Disconnected from WebSocket server');
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        return () => {
            ws.close();
        };
    }, []);

    return {data, isConnected};
};

export default useWebSocket;
