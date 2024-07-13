import { Grid, Paper, Typography } from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js/auto";
import { useActivityContext } from "../Context/ActivityProvider";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const DateWiseChart = () => {
  const { selectedData } = useActivityContext();
  //console.log("Sleelcted",selectedData);
  

  const dates = selectedData.dayWiseActivity.map(
    (dayActivity) => dayActivity.date
  );

  const getCountsForLabel = (label) => {
    return selectedData.dayWiseActivity.map((dayActivity) => {
      const item = dayActivity.items.children.find(
        (item) => item.label === label
      );
      return item ? parseInt(item.count) : 0;
    });
  };

  const labels = selectedData.dayWiseActivity.reduce((acc, dayActivity) => {
    dayActivity.items.children.forEach((item) => {
      if (!acc.find((labelInfo) => labelInfo.label === item.label)) {
        acc.push({ label: item.label, borderColor: item.fillColor });
      }
    });
    return acc;
  }, []);

  const datasets = labels.map((labelInfo) => ({
    label: labelInfo.label, 
    data: getCountsForLabel(labelInfo.label),
    borderColor: labelInfo.borderColor,
    fill: false,
    borderWidth: 2,
    //pointRadius: 3,
    pointHoverRadius: 5,
    showLine: true,
  }));

  const lineChartsData = {
    labels: dates,
    datasets: datasets,
    fill: false,
    borderColor: 'rgb(75, 192, 185)',
    tension: 0.1
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date' // Title for the x-axis
        },
        // ticks: {
        //   callback: function(value: string, index: any, values: any) {
        //     return value.split("-").reverse().join("/"); // Format date if needed
        //   },
        //   autoSkip: false,
        //   maxRotation: 0,
        //   minRotation: 0,
        //   align: 'start', // Align the labels vertically
        //   crossAlign: 'near', // Further aligns the labels vertically
        // }
      },
      y: {
        title: {
          display: true,
          text: 'Count' // Title for the y-axis
        }
      }
    },
    plugins: {
      legend: {
        display: false 
      },
    }
  };

  return (
    <Grid item xs={12}>
      <Paper elevation={3} style={{ padding: "12px", width: "60%",  }}>
       <Typography variant="h6">Day Wise Activity</Typography>
        <Line options={options} data={lineChartsData} style={{height:"150vh"}} />
      </Paper>
    </Grid>
  );
};

export default DateWiseChart;
