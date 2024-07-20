import React, {useContext, useRef} from 'react';
import {Line} from 'react-chartjs-2';
import {CategoryScale, Chart as ChartJS} from 'chart.js/auto';
import {AltitudeContext} from "../contexts/AltitudeContext";

const AltitudeLineChart = () => {
    ChartJS.register(CategoryScale);

    const options = {
        scales: {
            x: {
                beginAtZero: true,
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    const ref = useRef();
    const data = useContext(AltitudeContext);
    return <Line ref={ref} data={data} options={options}/>;
};

export default AltitudeLineChart;
