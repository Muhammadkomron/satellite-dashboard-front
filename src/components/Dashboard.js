import React from "react";
import RealTimeChart from "./RealTimeChart";
import ThreeDModel from "./ThreeDModel";
import useWebSocket from "../hooks/useWebSocket";

const Dashboard = () => {
  const { data, isConnected } = useWebSocket();

  return (
    <div>
      <h1>Real-Time IoT Dashboard</h1>
      <p>WebSocket Status: {isConnected ? "Connected" : "Disconnected"}</p>
      <p>Temperature: {data.t} °C</p>
      <p>Humidity: {data.h} %</p>
      <p>Voltage: {data.v} V</p>
      <div style={{ marginBottom: "50px" }}>
        <RealTimeChart chartType="temperature" />
      </div>
      <div style={{ marginBottom: "50px" }}>
        <RealTimeChart chartType="humidity" />
      </div>
      <div style={{ marginBottom: "50px" }}>
        <RealTimeChart chartType="voltage" />
      </div>
      <ThreeDModel />
    </div>
  );
};

export default Dashboard;
