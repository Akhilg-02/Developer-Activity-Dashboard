import { Card, CardContent, Grid, Paper, Typography, Box } from "@mui/material";
import { useActivityContext } from "./Context/ActivityProvider";

const TotalActivityGrid = () => {
  const { selectedData } = useActivityContext();
  return (
    <>
      <Grid item xs={12}>
        {/* <Paper elevation={3} > */}
        <Box style={{ padding: "12px", width:"40%" }}>
          <Typography variant="h6">Total Activity</Typography>
          <Grid container spacing={1}>
            {selectedData.totalActivity.slice(0, 4).map((activity, index) => (
              <Grid item xs={12} sm={6} md={3} lg={12} key={index}>
                <Card style={{ margin: "8px" }}>
                  <CardContent>
                    <Typography variant="h6">{activity.name}</Typography>
                    <Typography variant="body1">{activity.value}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
          
        {/* </Paper> */}
      </Grid>
    </>
  );
};

export default TotalActivityGrid;
