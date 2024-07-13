import { Grid, Paper, Typography } from "@mui/material";
import { Bar, PolarArea } from "react-chartjs-2";
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

const TotalActivityChart = () => {
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
          "rgb(255, 99, 132)",
          "rgb(75, 192, 192)",
          "rgb(255, 205, 86)",
          "rgb(201, 203, 207)",
          "rgb(54, 162, 235)",
        ],
      },
    ],
  };

  const options = {
    scales: {
      r: {
        ticks: {
          count: 5,
          display: true,
        },
        angleLines: {
          display: true,
        },
        grid: {
          display: true,
        },
        pointLabels: {
          display: true,
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

  const data2 = {
    labels: activeName,
    datasets: [
      {
        label: "My First Dataset",
        data: activeValue,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(75, 192, 192)",
          "rgb(255, 205, 86)",
          "rgb(201, 203, 207)",
          "rgb(54, 162, 235)",
        ],
      },
    ],
  };

  return (
    <>
      <Grid item xs={12}>
        <Paper elevation={3} style={{ padding: "12px", width: "40%" }}>
          <Typography variant="h6">Total Activity</Typography>
          <PolarArea data={data1} options={options} />
          <Bar data={data2} />
        </Paper>
      </Grid>
    </>
  );
};

export default TotalActivityChart;
