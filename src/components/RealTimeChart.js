import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns";
import useWebSocket from "../hooks/useWebSocket";

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const RealTimeChart = ({ chartType }) => {
  const { data } = useWebSocket();
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Temperature (°C)",
        data: [],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 2,
        pointRadius: 3,
        pointBorderColor: "rgba(255, 99, 132, 1)",
        pointBackgroundColor: "#fff",
        fill: true,
      },
      {
        label: "Humidity (%)",
        data: [],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderWidth: 2,
        pointRadius: 3,
        pointBorderColor: "rgba(54, 162, 235, 1)",
        pointBackgroundColor: "#fff",
        fill: true,
      },
      {
        label: "Voltage (V)",
        data: [],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        pointRadius: 3,
        pointBorderColor: "rgba(75, 192, 192, 1)",
        pointBackgroundColor: "#fff",
        fill: true,
      },
    ],
  });

  useEffect(() => {
    const now = new Date();
    setChartData((prevData) => {
      const newLabels = [...prevData.labels, now].slice(-15);

      const newTempData =
        chartType === "temperature"
          ? [...prevData.datasets[0].data, { x: now, y: data.t }].slice(-15)
          : prevData.datasets[0].data;

      const newHumidityData =
        chartType === "humidity"
          ? [...prevData.datasets[1].data, { x: now, y: data.h }].slice(-15)
          : prevData.datasets[1].data;

      const newVoltageData =
        chartType === "voltage"
          ? [...prevData.datasets[2].data, { x: now, y: data.v }].slice(-15)
          : prevData.datasets[2].data;

      return {
        labels: newLabels,
        datasets: [
          { ...prevData.datasets[0], data: newTempData },
          { ...prevData.datasets[1], data: newHumidityData },
          { ...prevData.datasets[2], data: newVoltageData },
        ],
      };
    });
  }, [data, chartType]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
            family: "Arial, sans-serif",
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
        callbacks: {
          label: (tooltipItem) => `Value: ${tooltipItem.formattedValue}`,
        },
      },
      title: {
        display: true,
        text: `${chartType.charAt(0).toUpperCase() + chartType.slice(1)} Data`,
        font: {
          size: 16,
          family: "Arial, sans-serif",
        },
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "second",
          tooltipFormat: "PPpp",
          displayFormats: {
            second: "HH:mm:ss",
          },
        },
        title: {
          display: true,
          text: "Time",
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 14,
          color: "#fff",
        },
      },
      y: {
        title: {
          display: true,
          text: "Value",
        },
        ticks: {
          color: "#fff",
        },
      },
    },
  };

  return (
    <div style={{ height: "400px" }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default RealTimeChart;
