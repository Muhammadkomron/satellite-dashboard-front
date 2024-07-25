import {useWebSocket} from '../contexts/WebSocketProvider';

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

const RealTimeData = () => {
    const {data, connected} = useWebSocket();

    return (
        <div className="real-time-data">
            <h2>Real-Time Data</h2>
            <div className="real-time-data-text">
                <div className="real-time-data-text-left">
                    <p>WebSocket Status: {connected ? 'Connected' : 'Disconnected'}</p>
                    <p>Satellite Status: {numberToText(data.status)}</p>
                    <p>Humidity: {data.humidity} %</p>
                </div>
                <div className="real-time-data-text-right">
                    <p>Temperature: {data.temperature} °C</p>
                    <p>Voltage: {data.voltage} V</p>
                    <p>Iteration: {data.i}</p>
                </div>
            </div>
        </div>
    );
};

export default RealTimeData;
