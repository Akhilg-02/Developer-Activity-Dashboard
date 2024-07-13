import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Select,
  MenuItem,
  Grid,
  Paper,
  Typography,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useActivityContext } from "./Context/ActivityProvider";
import TotalActivityGrid from "./TotalActivityGrid";
import DateWiseChart from "./Charts/DateWiseChart";
import TotalActivityChart from "./Charts/TotalActivityChart";
import RecentActivity from "./RecentActivity";

const ActivityTable = () => {
  const { data, selectedName, selectedData, handleChange } = useActivityContext();

  return (
    <>
      <FormControl >
        <InputLabel id="name-select-label">Select User</InputLabel>
        <Select
          labelId="name-select-label"
          value={selectedName}
          onChange={handleChange}
        >
          {data &&
            data.rows &&
            data.rows.map((row) => (
              <MenuItem key={row.name} value={row.name}>
                {row.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      {selectedData && (
        <Grid container spacing={3} style={{ marginTop: "20px" }}>
          <TotalActivityGrid/>
          {/* <Grid item xs={12}>
            <Paper elevation={3} style={{ padding: "20px" }}>
              <Typography variant="h6">Day Wise Activity</Typography>
              {selectedData.dayWiseActivity.map((dayActivity, index) => (
                <div key={index}>
                  <Typography>Date: {dayActivity.date}</Typography>
                  {dayActivity.items.children.map((item, i) => (
                    <Typography key={i}>
                      {item.label}: {item.count}
                    </Typography>
                  ))}
                </div>
              ))}
            </Paper>
          </Grid> */}
          <DateWiseChart/>

          <TotalActivityChart/>

          <RecentActivity/>
          <Grid item xs={12}>
            <Paper elevation={3} style={{ padding: "20px" }}>
              <Typography variant="h6">Active Days</Typography>
              <Typography>Days: {selectedData.activeDays.days}</Typography>
              {/* <Typography>
                Is BurnOut: {selectedData.activeDays.isBurnOut.toString()}
              </Typography>
              <Typography>
                Insight: {selectedData.activeDays.insight.join(", ")}
              </Typography> */}
            </Paper>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default ActivityTable;
