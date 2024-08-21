import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useWebSocket } from "../contexts/WebSocketProvider";
import { CategoryScale, Chart as ChartJS } from "chart.js/auto";
import "../App.css";

const GyroGraph = () => {
  ChartJS.register(CategoryScale);
  const { data } = useWebSocket() || {}; // Default to an empty object if undefined
  const [gyroData, setGyroData] = useState({
    labels: [0],
    datasets: [
      { label: "Yaw", data: [0], fill: false, borderColor: "red" },
      { label: "Pitch", data: [0], fill: false, borderColor: "green" },
      { label: "Roll", data: [0], fill: false, borderColor: "blue" },
    ],
  });

  useEffect(() => {
    if (data && typeof data.yaw !== "undefined" && typeof data.pitch !== "undefined" && typeof data.roll !== "undefined") {
      const newLabel = new Date().toLocaleTimeString();
      setGyroData((prevData) => {
        const updatedLabels = [...prevData.labels.slice(-6), newLabel];
        const updatedYaw = [...prevData.datasets[0].data.slice(-6), data.yaw];
        const updatedPitch = [...prevData.datasets[1].data.slice(-6), data.pitch];
        const updatedRoll = [...prevData.datasets[2].data.slice(-6), data.roll];

        return {
          labels: updatedLabels,
          datasets: [
            { ...prevData.datasets[0], data: updatedYaw },
            { ...prevData.datasets[1], data: updatedPitch },
            { ...prevData.datasets[2], data: updatedRoll },
          ],
        };
      });
    }
  }, [data]);

  return (
    <div className="gyro-graph-container">
      {/* <p className="graph-title">Gyro Graph</p> */}
      <Line
        data={gyroData}
        options={{ responsive: true, maintainAspectRatio: false }}
      />
    </div>
  );
};

export default GyroGraph;
