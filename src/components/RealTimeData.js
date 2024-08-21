import React, { useEffect, useRef, useState } from 'react';
import { useWebSocket } from '../contexts/WebSocketProvider';
import '../App.css'; // Ensure you have this CSS file or update accordingly

const numberToText = (number) => {
    const numberMap = {
        0: 'Ready to Flight',
        1: 'Ascent',
        2: 'Model Satellite Descent',
        3: 'Release',
        4: 'Science Payload Descent',
        5: 'Recovery'
    };
    return numberMap[number] || 'NOT Ready to Flight';
};

const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
};

const RealTimeData = () => {
    const { data, connected } = useWebSocket() || {};
    const [status, setStatus] = useState('Error');
    const [alarmOn, setAlarmOn] = useState(true);
    const [currentTime, setCurrentTime] = useState(formatDate(new Date()));
    const audioRef = useRef(null);

    // Update the current time every second
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(formatDate(new Date()));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // Handle status change and play sound if necessary
    useEffect(() => {
        if (connected && data) {
            setStatus('OK');
            if (alarmOn) {
                audioRef.current?.pause();
                audioRef.current.currentTime = 0; // Reset audio position
            }
        } else {
            setStatus('Error');
            if (alarmOn && audioRef.current) {
                audioRef.current.play().catch((error) => {
                    console.error('Failed to play sound:', error);
                });
            }
        }
    }, [connected, data, alarmOn]);

    // Handle user interaction to enable audio play
    const handleUserInteraction = () => {
        if (audioRef.current) {
            audioRef.current.play().catch((error) => {
                console.error('Failed to play sound:', error);
            });
        }
    };

    // Toggle alarm sound
    const toggleAlarm = () => {
        setAlarmOn((prev) => !prev);
    };

    return (
        <div className={`real-time-data ${status === 'Error' ? 'error' : 'ok'}`} onClick={handleUserInteraction}>
            <h2>Real-Time Data</h2>
            <p><strong>Status:</strong> {status}</p>
            <p><strong>Mission Time:</strong> {currentTime}</p>
            <div className="real-time-data-text">
                <div className="real-time-data-text-left">
                    <p><strong>WebSocket Status:</strong> {connected ? 'Connected' : 'Disconnected'}</p>
                    <p><strong>Satellite Status:</strong> {data ? numberToText(data.team_number) : 'N/A'}</p>
                    <p><strong>Temperature:</strong> {data ? `${data.temp} °C` : 'N/A'}</p>
                </div>
                <div className="real-time-data-text-right">
                    <p><strong>Voltage:</strong> {data ? `${data.battery_voltage} V` : 'N/A'}</p>
                    <p><strong>Pressure1:</strong> {data ? `${data.pressure1} Pa` : 'N/A'}</p>
                    <p><strong>Pressure2:</strong> {data ? `${data.pressure2} Pa` : 'N/A'}</p>
                    <p><strong>Iteration:</strong> {data ? data.lnln : 'N/A'}</p>
                </div>
            </div>
            <audio ref={audioRef} src="/alarm-sound.mp3" preload="auto" />
            <button onClick={toggleAlarm}>
                {alarmOn ? 'Turn Off Alarm' : 'Turn On Alarm'}
            </button>
        </div>
    );
};

export default RealTimeData;
