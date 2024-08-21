import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useWebSocket } from "../contexts/WebSocketProvider";
import { CategoryScale, Chart as ChartJS } from "chart.js/auto";
import "../App.css";

const AccelGraph = () => {
  ChartJS.register(CategoryScale);
  const { data } = useWebSocket() || {}; // Default to an empty object if undefined

  // Initialize state for the graph
  const [accelData, setAccelData] = useState({
    labels: [0],
    datasets: [
      { label: "X", data: [0], fill: false, borderColor: "red" },
      { label: "Y", data: [0], fill: false, borderColor: "green" },
      { label: "Z", data: [0], fill: false, borderColor: "blue" },
    ],
  });

  useEffect(() => {
    // Debug: Log received data
    console.log("Received data:", data);

    if (data && data.acceleration) {
      const newLabel = new Date().toLocaleTimeString();

      setAccelData((prevData) => {
        const updatedLabels = [...prevData.labels.slice(-6), newLabel];
        const updatedX = [...prevData.datasets[0].data.slice(-6), data.acceleration.x || 0];
        const updatedY = [...prevData.datasets[1].data.slice(-6), data.acceleration.y || 0];
        const updatedZ = [...prevData.datasets[2].data.slice(-6), data.acceleration.z || 0];

        return {
          labels: updatedLabels,
          datasets: [
            { ...prevData.datasets[0], data: updatedX },
            { ...prevData.datasets[1], data: updatedY },
            { ...prevData.datasets[2], data: updatedZ },
          ],
        };
      });
    } else {
      console.warn("No acceleration data found in received data.");
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
