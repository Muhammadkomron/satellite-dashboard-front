import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useWebSocket } from "../contexts/WebSocketProvider";
import { CategoryScale, Chart as ChartJS } from "chart.js/auto";
import "../App.css";

const AltitudeGraph = () => {
  ChartJS.register(CategoryScale);
  const { data } = useWebSocket() || {}; // Default to an empty object if undefined
  const [altitude, setAltitude] = useState({
    labels: [0],
    datasets: [
      {
        label: "Altitude1",
        data: [0],
        fill: false,
        borderColor: "blue",
      },
      {
        label: "Altitude2",
        data: [1],
        fill: false,
        borderColor: "red",
      },
    ],
  });

  useEffect(() => {
    if (data && typeof data.altitude1 !== 'undefined') {
      const newLabel = new Date().toLocaleTimeString();
      setAltitude((prevData) => {
        const updatedLabels = [...prevData.labels.slice(-15), newLabel];
        const updatedData = [...prevData.datasets[0].data.slice(-15), data.altitude1];
        const updatedData2 = [...prevData.datasets[1].data.slice(-15), data.altitude2];

        return {
          labels: updatedLabels,
          datasets: [
            {
              ...prevData.datasets[0],
              data: updatedData,
            },
            {
                ...prevData.datasets[1],
                data: updatedData2,
              },
          ],
        };
      });
    }
  }, [data]);

  return (
    <div className="altitude-graph-container">
      {/* <p className="graph-title">Altitude Graph</p> */}
      <Line
        data={altitude}
        options={{ responsive: true, maintainAspectRatio: false }}
      />
    </div>
  );
};

export default AltitudeGraph;
