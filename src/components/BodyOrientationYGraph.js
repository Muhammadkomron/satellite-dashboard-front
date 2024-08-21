import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useWebSocket } from "../contexts/WebSocketProvider";
import { CategoryScale, Chart as ChartJS } from "chart.js/auto";
import "../App.css";


const BodyOrientationYGraph = () => {
  ChartJS.register(CategoryScale);
  const { data } = useWebSocket() || {}; // Default to an empty object if undefined
  const [orientationYData, setOrientationYData] = useState({
    labels: [0],
    datasets: [
      { label: "Temprature", data: [0], fill: false, borderColor: "blue" },
    ],
  });

  useEffect(() => {
    if (data && data.roll !== undefined) { // Check if data and data.roll exist
      const newLabel = new Date().toLocaleTimeString();
      setOrientationYData((prevData) => {
        const updatedLabels = [...prevData.labels.slice(-15), newLabel];
        const updatedRoll = [...prevData.datasets[0].data.slice(-15), data.temp];

        return {
          labels: updatedLabels,
          datasets: [
            { ...prevData.datasets[0], data: updatedRoll },
          ],
        };
      });
    }
  }, [data]);

  return (
    <div className="orientation-y-graph-container">
      {/* <p className="graph-title">Body Orientation Y Graph</p> */}
      <Line
        data={orientationYData}
        options={{ responsive: true, maintainAspectRatio: false }}
      />
    </div>
  );
};

export default BodyOrientationYGraph;
