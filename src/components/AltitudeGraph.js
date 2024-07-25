import React, {useEffect, useState} from 'react';
import {Line} from 'react-chartjs-2';
import {useWebSocket} from '../contexts/WebSocketProvider';
import {CategoryScale, Chart as ChartJS} from 'chart.js/auto';

const AltitudeGraph = () => {
    ChartJS.register(CategoryScale);
    const {data} = useWebSocket();
    console.log("data.altitude");
    console.log(data.altitude);
    const [altitude, setAltitude] = useState({
        // const altitudeRef = useRef({
        labels: [0],
        datasets: [{
            label: "Altitude", data: [0], fill: false,
        }],
        // extra: {
        //     borderColor: '#9B59B6', borderWidth: 5,
        // },
    });

    useEffect(() => {
        // const interval = setInterval(async () => {
            const altitude = data.altitude;
            const newLabel = new Date().toLocaleTimeString();
            setAltitude((prevData) => {
                const updatedLabels = [...prevData.labels.slice(-14), newLabel];
                const updatedData = [...prevData.datasets[0].data.slice(-14), altitude];

                return {
                    labels: updatedLabels, datasets: [{
                        ...prevData.datasets[0], data: updatedData,
                    },],
                };
            });
        // }, 1000);

        // return () => clearInterval(interval);
    }, [data]);
    // useEffect(() => {
    // if (!connected) return;
    // const interval = setInterval(() => {
    // console.log("data.altitude.data.altitude");
    // console.log(data.altitude);
    // const time = new Date().toLocaleTimeString();
    // altitudeRef.current.labels.push(time);
    // altitudeRef.current.datasets[0].data.push(data.altitude);
    //
    // if (altitudeRef.current.labels.length > 14) {
    //     altitudeRef.current.labels.shift();
    //     altitudeRef.current.datasets[0].data.shift();
    // }
    //     }, 1000);
    //
    //     return () => clearInterval(interval);
    // }, [data]);
    return <Line data={altitude}/>;
};

export default AltitudeGraph;
