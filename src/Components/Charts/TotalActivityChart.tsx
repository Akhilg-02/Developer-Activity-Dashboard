import {
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import BarChart from "./BarChart";
import PolarChart from "./PolarChart";


const TotalActivityChart: React.FC = () => {
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


export default TotalActivityChart;
