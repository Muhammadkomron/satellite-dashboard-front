import React, { createContext, useContext, useEffect, useState } from 'react';

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
    const [data, setData] = useState({
        mission_time: "",
        pressure1: 0,
        pressure2: 0,
        altitude1: 0,
        altitude2: 0,
        altitude_difference: 0,
        descent_rate: 0,
        temp: 0,
        battery_voltage: 0,
        gps_latitude: 0,
        gps_longitude: 0,
        gps_altitude: 0,
        pitch: 0,
        roll: 0,
        yaw: 0,
        lnln: "",
        iot_data: 0,
        team_number: "",
    });

    useEffect(() => {
        const socket = new WebSocket('ws://10.10.0.202:8000/ws');

        socket.onopen = () => {
            console.log('WebSocket connection established');
        };

        socket.onmessage = (event) => {
            console.log('Received message:', event.data); // Log received data
            try {
                const jsonData = JSON.parse(event.data);
                if (jsonData) {
                    setData({
                        mission_time: jsonData["MISSION TIME"] || "",
                        pressure1: parseFloat(jsonData["PRESSURE1"]) || 0,
                        pressure2: parseFloat(jsonData["PRESSURE2"]) || 0,
                        altitude1: parseFloat(jsonData["ALTITUDE1"]) || 0,
                        altitude2: parseFloat(jsonData["ALTITUDE2"]) || 0,
                        altitude_difference: parseFloat(jsonData["ALTITUDE DIFFERENCE"]) || 0,
                        descent_rate: parseFloat(jsonData["DESCENT RATE"]) || 0,
                        temp: parseFloat(jsonData["TEMP"]) || 0,
                        battery_voltage: parseFloat(jsonData["BATTERY VOLTAGE"]) || 0,
                        gps_latitude: parseFloat(jsonData["GPS1 LATITUDE"]) || 0,
                        gps_longitude: parseFloat(jsonData["GPS1 LONGITUDE"]) || 0,
                        gps_altitude: parseFloat(jsonData["GPS1 ALTITUDE"]) || 0,
                        pitch: parseFloat(jsonData["PITCH"]) || 0,
                        roll: parseFloat(jsonData["ROLL"]) || 0,
                        yaw: parseFloat(jsonData["YAW"]) || 0,
                        lnln: jsonData["LNLN"] || "",
                        iot_data: parseFloat(jsonData["IoT DATA"]) || 0,
                        team_number: jsonData["TEAM NUMBER"] || "",
                    });
                }
            } catch (error) {
                console.error('Failed to parse message:', error);
            }
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        socket.onclose = () => {
            console.log('WebSocket connection closed');
        };

        return () => {
            socket.close();
        };
    }, []);

    return (
        <WebSocketContext.Provider value={{ data }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => useContext(WebSocketContext);
