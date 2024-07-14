import { colors, Grid, Paper, Typography } from "@mui/material";
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
  PointElement
} from "chart.js/auto";
import { useActivityContext } from "../Context/ActivityProvider";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  ArcElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const DateWiseChart = () => {
  const { selectedData } = useActivityContext();
  //console.log("Sleelcted",selectedData);
  
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const dates = selectedData.dayWiseActivity.map(dayActivity => formatDate(dayActivity.date));



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
    pointRadius: 3,
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
          text: "Date's",
        },
        grid: {
          display: false,
        },
        ticks: {
          autoSkip: false,
          maxRotation: 80, 
          minRotation: 80, 
        }
      },
      y: {
        title: {
          display: true,
          text: "Count's"
        },
        border:{
          dash:[5, 5],
          //color:"white"
        },
      }
    },
    plugins: {
      legend: {
        display: false 
      },
    }
  };
  return (
    <>
    <Grid item>
      <Paper elevation={3} style={{ padding: "12px", borderRadius:"20px", backgroundColor:"rgb(167 60 243 / 10%)"}}>
       <Typography variant="h6" style={{marginLeft:"2%"}}>Day Wise Activity</Typography>
       <br />
        <Line options={options} data={lineChartsData} style={{height:"250vh"}} />
      </Paper>
    </Grid>
    </>
  );
};

{/* <Grid item xs={12}>eight:"100vh"
      <Paper elevation={3} style={{ padding: "12px", width: "60%", borderRadius:"20px"}}>
       <Typography variant="h6">Day Wise Activity</Typography>
        <Line options={options} data={lineChartsData} style={{height:"150vh"}} />
      </Paper>
    </Grid> */}



export default DateWiseChart;
