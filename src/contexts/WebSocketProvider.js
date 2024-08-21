import React, { createContext, useContext, useEffect, useState } from 'react';

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
    const [data, setData] = useState({
        packet_number: "",
        sattelite_status: "",
        error_code: "",
        missiontime: "",
        pressure1: 0,
        pressure2: 0,
        altitude1: 0,
        altitude2: 0,
        altitude_difference: 0,
        descent_rate: 0,
        temp: 0,
        battery_voltage: 0,
        gps_altitude: 0,
        gps_longitude: 0,
        pitch: 0,
        roll: 0,
        yaw: 0,
        lnln: "",
        iot_data: 0,
        team_number: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5555');
                const jsonData = await response.json();
                setData({
                    packet_number: jsonData.packet_number,
                    sattelite_status: jsonData.sattelite_status,
                    error_code: jsonData.error_code,
                    missiontime: jsonData.missiontime,
                    pressure1: parseFloat(jsonData.pressure1),
                    pressure2: parseFloat(jsonData.pressure2),
                    altitude1: parseFloat(jsonData.altitude1),
                    altitude2: parseFloat(jsonData.altitude2),
                    altitude_difference: parseFloat(jsonData.altitude_difference),
                    descent_rate: parseFloat(jsonData.desent_rate),
                    temp: parseFloat(jsonData.temp),
                    battery_voltage: parseFloat(jsonData.battery_voltage),
                    gps_altitude: parseFloat(jsonData.gps_altitude),
                    gps_longitude: parseFloat(jsonData.gps_longitude),
                    pitch: parseFloat(jsonData.pitch),
                    roll: parseFloat(jsonData.roll),
                    yaw: parseFloat(jsonData.yaw),
                    lnln: jsonData.lnln,
                    iot_data: parseFloat(jsonData.iot_data),
                    team_number: jsonData.team_number,
                });
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        const interval = setInterval(fetchData, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <WebSocketContext.Provider value={{ data }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => useContext(WebSocketContext);
