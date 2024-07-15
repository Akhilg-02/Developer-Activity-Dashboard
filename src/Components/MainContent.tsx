import {
  Select,
  MenuItem,
  Grid,
  FormControl,
  OutlinedInput,
  styled,
  InputLabel,
  Box,
  Typography,
  
} from "@mui/material";
import { useActivityContext } from "./Context/ActivityProvider";
import TotalActivityGrid from "./RequestGrids";
import DateWiseChart from "./Charts/DateWiseChart";
import TotalActivityChart from "./Charts/TotalActivityChart";
import RecentActivity from "./RecentActivityTableContent";

const CustomOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'red', 
      borderRadius: '20px',
    }
  },
}));

const selectUser={
  color: "white",
  '.MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(228, 219, 233, 0.25)',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#C2528B',
  },
  '.MuiSvgIcon-root ': {
    fill: "white !important",
  }
}

const MainContent = () => {
  const { data, selectedName, selectedData,setSelectedName,setSelectedData} = useActivityContext();

  const handleChange = (event) => {
    const name = event.target.value;
    setSelectedName(name);

    if (data && data.rows) {
      const userData = data.rows.find((row) => row.name === name);
      setSelectedData(userData);
    } else {
      console.log('Data is not yet available');
    }
  };


  return (
    <>
    <Box>
    <Typography variant="h3" style={{ marginLeft: "2%", color: "violet" }}> Developers Activity Highlights</Typography>
    </Box>
    <Box style={{marginLeft:"82%"}}>
      <FormControl variant="outlined" style={{ minWidth: 120 }}>
        <InputLabel id="name-select-label" style={{color:"white"}}>Select Developer</InputLabel>
        <Select
          placeholder="Select the User"
          labelId="name-select-label"
          id="demo-simple-select-helper"
          value={selectedName}
          onChange={handleChange}
          input={<CustomOutlinedInput label="Select User" />}
          sx={selectUser}
         
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
