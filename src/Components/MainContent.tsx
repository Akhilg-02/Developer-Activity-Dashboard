import {
  Select,
  MenuItem,
  Grid,
  FormControl,
  OutlinedInput,
  styled,
  InputLabel,
  Box,
  
} from "@mui/material";
import { useActivityContext } from "./Context/ActivityProvider";
import TotalActivityGrid from "./RequestGrids";
import DateWiseChart from "./Charts/DateWiseChart";
import TotalActivityChart from "./Charts/TotalActivityChart";
import RecentActivity from "./RecentActivityTableContent";

const CustomOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'red', // Default border color
      borderRadius: '20px', // Custom border radius
    }
    // ,
    // '&:hover fieldset': {
    //   borderColor: 'green', // Border color on hover
    // },
    // '&.Mui-focused fieldset': {
    //   borderColor: 'red', // Border color when focused
    // },
  },
}));

const MainContent = () => {
  const { data, selectedName, selectedData, handleChange } = useActivityContext();


  return (
    <>
    <Box style={{marginLeft:"82%"}}>
      <FormControl variant="outlined" style={{ minWidth: 120 }}>
        <InputLabel id="name-select-label" style={{color:"white"}}>Select User</InputLabel>
        <Select
          placeholder="Select the User"
          labelId="name-select-label"
          id="demo-simple-select-helper"
          value={selectedName}
          onChange={handleChange}
          input={<CustomOutlinedInput label="Select User" />}
          sx={{
            color: "white",
            '.MuiOutlinedInput-notchedOutline': {
              //borderColor: 'rgba(228, 219, 233, 0.25)',
              borderColor: 'rgba(228, 219, 233, 0.25)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
             // borderColor: 'rgba(228, 219, 233, 0.25)',
              borderColor: '#C2528B',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              //borderColor: 'rgba(228, 219, 233, 0.25)',
              // borderColor: 'yellow',
            },
            '.MuiSvgIcon-root ': {
              fill: "white !important",
            }
          }}
         
        >
          {/* <MenuItem value={row.name}>
            <em>None</em>
          </MenuItem> */}
          {data &&
            data.rows &&
            data.rows.map((row) => (
              <MenuItem key={row.name} value={row.name}>
                {row.name}
              </MenuItem>
            ))}
        </Select>
        
        
      </FormControl>
       </Box>
      {selectedData && (
        <Grid container spacing={3} style={{ marginTop: "20px" }}>
          <Grid item xs={12} md={4}>
            <TotalActivityGrid />
          </Grid>
          <Grid item xs={12} md={8} mt={12}>
            <DateWiseChart />
          </Grid>
          <Grid item xs={12}>
            <TotalActivityChart />
          </Grid>
          <Grid item xs={12}>
            <RecentActivity />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default MainContent;
