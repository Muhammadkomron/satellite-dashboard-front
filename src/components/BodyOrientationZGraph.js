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
      { label: "Yaw", data: [0], fill: false, borderColor: "red" },
    ],
  });

  useEffect(() => {
    if (data && data.yaw !== undefined) { // Check if data and data.yaw exist
      const newLabel = new Date().toLocaleTimeString();
      setOrientationZData((prevData) => {
        const updatedLabels = [...prevData.labels.slice(-6), newLabel];
        const updatedYaw = [...prevData.datasets[0].data.slice(-6), data.yaw];

        return {
          labels: updatedLabels,
          datasets: [
            { ...prevData.datasets[0], data: updatedYaw },
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
