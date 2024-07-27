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
                    <p><strong>WebSocket Status:</strong> {connected ? 'Connected' : 'Disconnected'}</p>
                    <p><strong>Satellite Status:</strong> {numberToText(data.status)}</p>
                    <p><strong>Humidity:</strong> {data.humidity} %</p>
                </div>
                <div className="real-time-data-text-right">
                    <p><strong>Temperature:</strong> {data.temperature} °C</p>
                    <p><strong>Voltage:</strong> {data.voltage} V</p>
                    <p><strong>Iteration:</strong> {data.i}</p>
                </div>
            </div>
        </div>
    );
};


export default RealTimeData;
