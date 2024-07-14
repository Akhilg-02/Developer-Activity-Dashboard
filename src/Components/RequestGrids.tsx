import {
  Card,
  CardContent,
  Grid,
  Paper,
  Typography,
  Box,
  styled,
} from "@mui/material";
import { useActivityContext } from "./Context/ActivityProvider";
import EastIcon from "@mui/icons-material/East";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import MergeTypeIcon from "@mui/icons-material/MergeType";
import CommitIcon from "@mui/icons-material/Commit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const CircleBox = styled(Box)({
  width: 90,
  height: 90,
  backgroundColor: "black",//#0e1d34,#91B9DD
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "10px",
});

const icons = [
  <MeetingRoomIcon  sx={{color:"#dc6a73", fontSize:"70px"}} />,
  <MergeTypeIcon sx={{color:"#53c8b0", fontSize:"70px"}} />,
  <CommitIcon sx={{color:"#f5d196", fontSize:"70px"}} />,
  <RemoveRedEyeIcon sx={{color:"#c5568c", fontSize:"70px"}} />,
];

const RequestGrids
 = () => {
  const { selectedData } = useActivityContext();
  return (
    <>
      <Grid item xs={12}>
        <Box style={{ padding: "12px"}}>
          {/* <Typography variant="h6" style={{marginLeft:"5%", }}>Total Activity</Typography> */}
          <Grid container spacing={1}>
            {selectedData.totalActivity.slice(0, 4).map((activity, index) => (
              <Grid item xs={12} sm={6} md={3} lg={12} key={index}>
                <Card
                  style={{
                    margin: "8px",
                    borderRadius: "20px",
                    display: "flex",
                  }}
                >
                  <CardContent>
                    <CircleBox>
                      {icons[index % icons.length]}
                    </CircleBox>
                  </CardContent>
                  <CardContent>
                    <Box mt={2} ml={8}>
                    <Typography sx={{color:"#a7a7a7"}} variant="h5">{activity.name}</Typography>
                    <br />
                    <Typography variant="h6">{activity.value}</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Grid>
    </>
  );
};

export default RequestGrids
;
