import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useWebSocket } from "../contexts/WebSocketProvider";
import { CategoryScale, Chart as ChartJS } from "chart.js/auto";
import "../App.css";


const AccelGraph = () => {
  ChartJS.register(CategoryScale);
  const { data } = useWebSocket() || {}; // Default to an empty object if undefined
  const [accelData, setAccelData] = useState({
    labels: [0],
    datasets: [
      { label: "X", data: [0], fill: false, borderColor: "red" },
      { label: "Y", data: [0], fill: false, borderColor: "green" },
      { label: "Z", data: [0], fill: false, borderColor: "blue" },
    ],
  });

  useEffect(() => {
    if (data && data.acceleration) { // Check if data and data.acceleration exist
      const newLabel = new Date().toLocaleTimeString();
      setAccelData((prevData) => {
        const updatedLabels = [...prevData.labels.slice(-6), newLabel];
        const updatedX = [...prevData.datasets[0].data.slice(-6), data.acceleration.x];
        const updatedY = [...prevData.datasets[1].data.slice(-6), data.acceleration.y];
        const updatedZ = [...prevData.datasets[2].data.slice(-6), data.acceleration.z];

        return {
          labels: updatedLabels,
          datasets: [
            { ...prevData.datasets[0], data: updatedX },
            { ...prevData.datasets[1], data: updatedY },
            { ...prevData.datasets[2], data: updatedZ },
          ],
        };
      });
    }
  }, [data]);

  return (
    <div className="accel-graph-container">
      {/* <p className="graph-title">Acceleration Graph</p> */}
      <Line
        data={accelData}
        options={{ responsive: true, maintainAspectRatio: false }}
      />
    </div>
  );
};

export default AccelGraph;
