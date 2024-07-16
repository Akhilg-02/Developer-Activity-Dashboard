import { useState, forwardRef } from "react";
import {
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  Drawer,
  Modal,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Slide,
} from "@mui/material";
import { Bar } from "react-chartjs-2";
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
import Draggable from "react-draggable/build/cjs/Draggable";
import CloseIcon from "@mui/icons-material/Close";
import { useActivityContext } from "../Context/ActivityProvider";
import { TransitionProps } from "@mui/material/transitions";

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

const PaperComponent = (props) => {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
};

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide 
         direction="right"
         timeout={56000}
         ref={ref} {...props} />;
});

const BarChart: React.FC = () => {
  const { selectedData } = useActivityContext();
  const [dialogOpen, setDialogOpen] = useState(false);

  const activeValue = selectedData.totalActivity.map((active) => active.value);

  const activeName = selectedData.totalActivity.map((active) => active.name);

  const data2 = {
    labels: activeName,
    datasets: [
      {
        label: "",
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
          color: "white",
        },
        grid: {
          display: false,
        },
        ticks: {
          autoSkip: false,
          color: "white",
        },
      },
      y: {
        title: {
          display: true,
          text: "Count of Activity",
          color: "white",
        },
        ticks: {
          autoSkip: false,
          color: "white",
        },
        border: {
          dash: [5, 5],
          color: "wheat",
        },
        grid: {
          display: true,
          color: "gray",
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

  const handleOpen = () => setDialogOpen(true);
  const handleClose = () => setDialogOpen(false);

  return (
    <>
      <Box>
        <Button variant="outlined" color="info" onClick={handleOpen} style={{marginLeft:"70%"}} >
          View Detailed Report
        </Button>
        <Dialog
          TransitionComponent={Transition}
          open={dialogOpen}
          onClose={handleClose}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle
            style={{ cursor: "move", backgroundColor: "rgb(167 60 243 / 10%)" }}
            id="draggable-dialog-title"
          >
            <Typography variant="h6" component="div">
              Detailed Report
            </Typography>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent
            dividers
            sx={{
              backgroundColor: "rgb(167 60 243 / 10%)",
            }}
          >
            <Typography variant="body1" sx={{fontSize:"1.2em", textTransform: "capitalize"}}>
                User : {selectedData.name}
            </Typography>
            <br />
            <TableContainer component={Paper}>
                
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Label</TableCell>
                    <TableCell align="right">Total Requests</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedData.totalActivity.map((activity) => (
                    <TableRow key={activity.name}>
                      <TableCell component="th" scope="row">
                        {activity.name}
                      </TableCell>
                      <TableCell align="right">{activity.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
        </Dialog>
      </Box>
      <Box mt={2} mr={4}>
        <Bar data={data2} options={options2} style={{ height: "50vh" }} />
      </Box>
    </>
  );
};

export default BarChart;
