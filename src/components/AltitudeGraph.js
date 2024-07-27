import React, {useEffect, useState} from 'react';
import {Line} from 'react-chartjs-2';
import {useWebSocket} from '../contexts/WebSocketProvider';
import {CategoryScale, Chart as ChartJS} from 'chart.js/auto';

const AltitudeGraph = () => {
    ChartJS.register(CategoryScale);
    const {data} = useWebSocket();
    const [altitude, setAltitude] = useState({
        labels: [0],
        datasets: [{
            label: "Altitude", data: [0], fill: false,
        }],
    });

    useEffect(() => {
        const altitude = data.altitude;
        const newLabel = new Date().toLocaleTimeString();
        setAltitude((prevData) => {
            const updatedLabels = [...prevData.labels.slice(-14), newLabel];
            const updatedData = [...prevData.datasets[0].data.slice(-14), altitude];

            return {
                labels: updatedLabels, datasets: [{
                    ...prevData.datasets[0], data: updatedData,
                }],
            };
        });
    }, [data]);

    return (
        <div className="altitude-graph-container">
            <Line data={altitude} options={{ responsive: true, maintainAspectRatio: false }}/>
        </div>
    );
};

export default AltitudeGraph;