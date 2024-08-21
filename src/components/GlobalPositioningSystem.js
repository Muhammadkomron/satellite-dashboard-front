import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Icon, LatLngBounds } from 'leaflet';
import "../App.css";
import 'leaflet/dist/leaflet.css';
import { useWebSocket } from '../contexts/WebSocketProvider'; // Assuming you have a WebSocket context

// Путь к вашей пользовательской иконке
const customIcon = new Icon({
    iconUrl: '/icons/rocket.png', // Путь начинается с /
    iconSize: [32, 32], // Размер иконки
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

// Границы Турции
// const turkeyBounds = new LatLngBounds(
//     [35.813, 25.0], // Юго-восточный угол
//     [42.1, 44.8]   // Северо-западный угол
// );

const GlobalPositioningSystem = () => {
    const [position, setPosition] = useState([35.813, 25.0]); // Начальная позиция
    const [altitude, setAltitude] = useState(0);

    const { data } = useWebSocket() || {}; // Предполагается, что data содержит latitude, longitude и altitude

    useEffect(() => {
        if (data) {
            const { gps_latitude: latitude, gps_longitude: longitude, gps_altitude: altitude } = data;
            if (latitude !== undefined && longitude !== undefined) {
                setPosition([latitude, longitude]);
                setAltitude(altitude || 0); // Установка значения высоты или 0, если значение не доступно
            }
        }
    }, [data]);

    const [latitude, longitude] = position;

    return (
        <div className="global-positioning-system">
            <h2>Global Positioning System</h2>
            <div className="coordinates">
                <p><strong>Latitude:</strong> {latitude.toFixed(6)}</p>
                <p><strong>Longitude:</strong> {longitude.toFixed(6)}</p>
                <p><strong>Altitude:</strong> {altitude} meters</p>
            </div>
            <MapContainer
                center={[latitude, longitude]}
                zoom={6}
                style={{ height: "250px", width: "100%" }}
                // maxBounds={turkeyBounds}
                maxBoundsViscosity={1.0}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[latitude, longitude]} icon={customIcon}>
                    <Popup>
                        Current Position<br />Lat: {latitude.toFixed(6)},
                        Lon: {longitude.toFixed(6)}<br />Altitude: {altitude} meters
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default GlobalPositioningSystem;
