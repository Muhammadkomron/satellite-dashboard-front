import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useWebSocket } from "../contexts/WebSocketProvider";
import { CategoryScale, Chart as ChartJS } from "chart.js/auto";
import "../App.css";


const RawTelemetryGraph = () => {
  ChartJS.register(CategoryScale);
  const { data } = useWebSocket() || {}; // Default to an empty object if undefined
  const [telemetryData, setTelemetryData] = useState({
    labels: [0],
    datasets: [
      { label: "Telemetry", data: [0], fill: false, borderColor: "purple" },
    ],
  });

  useEffect(() => {
    if (data && data.telemetry !== undefined) { // Check if data and data.telemetry exist
      const newLabel = new Date().toLocaleTimeString();
      setTelemetryData((prevData) => {
        const updatedLabels = [...prevData.labels.slice(-6), newLabel];
        const updatedTelemetry = [
          ...prevData.datasets[0].data.slice(-6),
          data.telemetry,
        ];

        return {
          labels: updatedLabels,
          datasets: [{ ...prevData.datasets[0], data: updatedTelemetry }],
        };
      });
    }
  }, [data]);

  return (
    <div className="raw-telemetry-graph-container">
      {/* <p className="graph-title">Raw Telemetry Graph</p> */}
      <Line
        data={telemetryData}
        options={{ responsive: true, maintainAspectRatio: false }}
      />
    </div>
  );
};

export default RawTelemetryGraph;
