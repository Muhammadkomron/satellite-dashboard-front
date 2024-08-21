import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useWebSocket } from "../contexts/WebSocketProvider";
import { CategoryScale, Chart as ChartJS } from "chart.js/auto";
import "../App.css";


const BodyOrientationXGraph = () => {
  ChartJS.register(CategoryScale);
  const { data } = useWebSocket() || {}; // Default to an empty object if undefined
  const [orientationXData, setOrientationXData] = useState({
    labels: [0],
    datasets: [
      { label: "Pitch", data: [0], fill: false, borderColor: "green" },
    ],
  });

  useEffect(() => {
    if (data && data.pitch !== undefined) { // Check if data and data.pitch exist
      const newLabel = new Date().toLocaleTimeString();
      setOrientationXData((prevData) => {
        const updatedLabels = [...prevData.labels.slice(-6), newLabel];
        const updatedPitch = [...prevData.datasets[0].data.slice(-6), data.pitch];

        return {
          labels: updatedLabels,
          datasets: [
            { ...prevData.datasets[0], data: updatedPitch },
          ],
        };
      });
    }
  }, [data]);

  return (
    <div className="orientation-x-graph-container">
      {/* <p className="graph-title">Body Orientation X Graph</p> */}
      <Line
        data={orientationXData}
        options={{ responsive: true, maintainAspectRatio: false }}
      />
    </div>
  );
};

export default BodyOrientationXGraph;
