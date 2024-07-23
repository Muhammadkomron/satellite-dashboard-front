import React, {useEffect, useRef} from 'react';
import {Line} from 'react-chartjs-2';
import {useWebSocket} from '../contexts/WebSocketProvider';
import {CategoryScale, Chart as ChartJS} from 'chart.js/auto';

const AltitudeGraph = () => {
    const {data, connected} = useWebSocket();
    const altitudeRef = useRef({
        labels: ['Current'],
        datasets: [{
            label: "Altitude", data: [0], fill: false,
        }],
        extra: {
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
        },
    });

    useEffect(() => {
        if (!connected) return;
        const interval = setInterval(() => {
            const time = new Date().toLocaleTimeString();
            altitudeRef.current.labels.push(time);
            altitudeRef.current.datasets[0].data.push(data.altitude);

            if (altitudeRef.current.labels.length > 14) {
                altitudeRef.current.labels.shift();
                altitudeRef.current.datasets[0].data.shift();
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [data, connected]);
    ChartJS.register(CategoryScale);
    return <Line data={altitudeRef.current}/>;
};

export default AltitudeGraph;
