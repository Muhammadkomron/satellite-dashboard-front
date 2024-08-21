import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useWebSocket } from "../contexts/WebSocketProvider";
import { CategoryScale, Chart as ChartJS } from "chart.js/auto";
import "../App.css";


const BodyOrientationZGraph = () => {
  ChartJS.register(CategoryScale);
  const { data } = useWebSocket() || {}; // Default to an empty object if undefined
  const [orientationZData, setOrientationZData] = useState({
    labels: [0],
    datasets: [
      { label: "Pressure1", data: [0], fill: false, borderColor: "red" },
      { label: "Pressure2", data: [1], fill: false, borderColor: "green" },
    ],
  });

  useEffect(() => {
    if (data && data.yaw !== undefined) { // Check if data and data.yaw exist
      const newLabel = new Date().toLocaleTimeString();
      setOrientationZData((prevData) => {
        const updatedLabels = [...prevData.labels.slice(-15), newLabel];
        const updatedPressure1 = [...prevData.datasets[0].data.slice(-15), data.pressure1];
        const updatedPressure2 = [...prevData.datasets[1].data.slice(-15), data.pressure2];

        return {
          labels: updatedLabels,
          datasets: [
            { ...prevData.datasets[0], data: updatedPressure1 },
            { ...prevData.datasets[1], data: updatedPressure2 },
          ],
        };
      });
    }
  }, [data]);

  return (
    <div className="orientation-z-graph-container">
      {/* <p className="graph-title">Body Orientation Z Graph</p> */}
      <Line
        data={orientationZData}
        options={{ responsive: true, maintainAspectRatio: false }}
      />
    </div>
  );
};

export default BodyOrientationZGraph;
