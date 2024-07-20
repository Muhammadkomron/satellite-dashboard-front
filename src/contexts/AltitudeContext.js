import {createContext, useState} from 'react';

export const AltitudeContext = createContext({labels: [], datasets: []});

export const AltitudeProvider = ({children}) => {
    console.log(children.data);
    const [data, setAltitude] = useState({
        labels: ['Current'],
        datasets: [],
        // datasets: [{
        //     label: 'Altitude', data: [0], fill: false, borderColor: '#9B59B6', borderWidth: 5,
        // }],
    });
    const newLabel = new Date().toLocaleTimeString();
    setAltitude((prevData) => {
        const updatedLabels = [...prevData.labels.slice(-14), newLabel];
        const updatedData = [];
        // const updatedData = [...prevData.datasets[0].data.slice(-14), altitudeData.value];

        return {
            labels: updatedLabels,
            datasets: [{
                ...prevData.datasets[0], data: updatedData,
            }],
        };
    });
    return (<AltitudeContext.Provider value={data}>
        {children}
    </AltitudeContext.Provider>);
};
