import { FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Paper, Select, styled, Typography } from "@mui/material";
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
import { useState } from "react";

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

const CustomOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'red', 
      borderRadius: '20px',
    }
  },
}));


const selctField = {
  color: "white",
  '.MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(228, 219, 233, 0.25)',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#C2528B',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
  },
  '.MuiSvgIcon-root ': {
    fill: "white !important",
  }
}

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


  const [selectedLines, setSelectedLines] = useState([]);

  const handleChange = (event) => {
    const { value } = event.target;
    setSelectedLines(value === 'none' ? [] : [value]);
  };


  const datasets = labels
  .map((labelInfo) => ({
    label: labelInfo.label, 
    data: getCountsForLabel(labelInfo.label),
    borderColor: labelInfo.borderColor,
    hidden: selectedLines.length > 0 && !selectedLines.includes(labelInfo.label),
  }));

  const lineChartsData = {
    labels: dates,
    datasets: datasets,
    fill: false,
    tension: 0.4
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Date's",
          color: "white"
        },
        grid: {
          display: false,
        },
        ticks: {
           autoSkip: false,
          // maxRotation: 80, 
          // minRotation: 80, 
          color: "white"
        }
      },
      y: {
        title: {
          display: true,
          text: "Count's",
          color: 'white', 
        },
        ticks: {
          beginAtZero: true,
          color: 'white', 
        },
        border:{
          dash:[5, 5],
          color:"wheat"
        },
        grid: {
          display: true,
          color:"gray"
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
      <Paper elevation={3} style={{ padding: "12px", borderRadius: "20px", backgroundColor: "rgb(167 60 243 / 10%)" }}>
        <Typography variant="h6" style={{ marginLeft: "2%", color: "violet" }}>Day wise Activity</Typography>
        <br />
        <FormControl sx={{marginLeft:"85%", width:"13%"}}>
          <InputLabel sx={{color:"white"}}>Select Request</InputLabel>
          <Select
            input={<CustomOutlinedInput label="Select User" />}
            onChange={handleChange}
            value={selectedLines.length === 0 ? 'none' : selectedLines[0]}
            sx={selctField}
          >
            <MenuItem value="none">None</MenuItem>
            {labels.map(labelInfo => (
              <MenuItem key={labelInfo.label} value={labelInfo.label}>{labelInfo.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Line options={options} data={lineChartsData} style={{ height: "60vh" }} />
      </Paper>
    </Grid>
    
    </>
  );
};


export default DateWiseChart;
