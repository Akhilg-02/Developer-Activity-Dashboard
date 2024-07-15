import { Grid, Paper, Typography, Box } from "@mui/material";
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
  return (
    <>
      <Grid xs={12}>
        <Paper
          elevation={3}
          style={{
            padding: "8px",
            width: "100%",
            borderRadius: "20px",
            marginLeft: "1",
            backgroundColor: "rgb(167 60 243 / 10%)",
          }}
        >
          <Typography
            variant="h6"
            style={{ marginLeft: "2%", color: "violet" }}
          >
            Total activity for different requests
          </Typography>
          <br />
          <Grid
            container
            spacing={3}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Grid item xs={12} sm={6} md={6} lg={5}>
              <PolarChart />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={7}>
              <BarChart />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
};

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
           color:"gray"
        },
        border:{
          dash:[1,3],
          color:"wheat"
        },
        grid: {
          display: true,
          color:"gray"
        },
        pointLabels: {
          display: true,
          color: "white"
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

const BarChart = () => {
  const { selectedData } = useActivityContext();

  const activeValue = selectedData.totalActivity.map((active) => active.value);

  const activeName = selectedData.totalActivity.map((active) => active.name);

  const data2 = {
    labels: activeName,
    datasets: [
      {
        label: "My First Dataset",
        data: activeValue,
        tension: 0.5,
        backgroundColor: [
          "#EF6B6B",
          "#61CDBB",
          "#FAC76E",
          "#C2528B",
          "#0396A6",
          "#5F50A9",
          "#8F3519",
        ],
        fill: false,
      },
    ],
  };

  const options2 = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: "Types of Activity",
          color: "white"
        },
        grid: {
          display: false,
        },
        ticks: {
          autoSkip: false,
         color: "white"
       }
      },
      y: {
        title: {
          display: true,
          text: "Count of Activity",
          color: "white"
        },
        ticks: {
          autoSkip: false,
         color: "white"
       },
        border:{
          dash:[5, 5],
          color:"wheat"
        },
        grid: {
          display: true,
          color:"gray"
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
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        },
      },
    },
  };
  return (
    <>
      <Box mt={2} mr={4}>
        <Bar data={data2} options={options2} style={{ height: "50vh" }} />
      </Box>
    </>
  );
};

export default TotalActivityChart;
