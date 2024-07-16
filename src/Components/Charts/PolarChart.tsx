import { Box } from "@mui/material";
import { PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  PolarAreaController,
} from "chart.js/auto";
import { useActivityContext } from "../Context/ActivityProvider";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  BarElement,
  ArcElement,
  PolarAreaController,
  Title,
  Tooltip,
  Legend
);

const PolarChart = () => {
  const { selectedData } = useActivityContext();

  const activeValue = selectedData.totalActivity.map((active) => active.value);

  const activeName = selectedData.totalActivity.map((active) => active.name);

  const data1 = {
    labels: activeName,
    datasets: [
      {
        label: "Total Activity",
        data: activeValue,
        backgroundColor: [
          "#EF6B6B",
          "#61CDBB",
          "#FAC76E",
          "#C2528B",
          "#0396A6",
          "#5F50A9",
          "#8F3519",
        ],
      },
    ],
  };

  const options1 = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        ticks: {
          count: 5,
          display: false,
        },
        angleLines: {
          display: true,
          color: "gray",
        },
        border: {
          dash: [1, 3],
          color: "wheat",
        },
        grid: {
          display: true,
          color: "gray",
        },
        pointLabels: {
          display: true,
          color: "white",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.raw || 0;
            return `${label}: ${value}`;
          },
        },
      },
    },
  };
  return (
    <>
      <Box>
        <PolarArea data={data1} options={options1} style={{ height: "50vh" }} />
      </Box>
    </>
  );
};

export default PolarChart;
