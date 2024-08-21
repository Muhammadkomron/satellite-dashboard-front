import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useWebSocket } from "../contexts/WebSocketProvider";
import { CategoryScale, Chart as ChartJS } from "chart.js/auto";
import "../App.css";

const ThrottleGraph = () => {
  ChartJS.register(CategoryScale);
  const { data } = useWebSocket() || {};
  const [throttleData, setThrottleData] = useState({
    labels: [0],
    datasets: [{ label: "Throttle", data: [0], fill: false, borderColor: "orange" }],
  });

  useEffect(() => {
    if (data && data.throttle !== undefined) { // Check if data and data.throttle exist
      const newLabel = new Date().toLocaleTimeString();
      setThrottleData((prevData) => {
        const updatedLabels = [...prevData.labels.slice(-6), newLabel];
        const updatedData = [
          ...prevData.datasets[0].data.slice(-6),
          data.throttle,
        ];

        return {
          labels: updatedLabels,
          datasets: [
            { ...prevData.datasets[0], data: updatedData },
          ],
        };
      });
    }
  }, [data]);

  return (
    <div className="throttle-graph-container">
      {/* <p className="graph-title">Throttle Graph</p> */}
      <Line
        data={throttleData}
        options={{ responsive: true, maintainAspectRatio: false }}
      />
    </div>
  );
};

export default ThrottleGraph;
