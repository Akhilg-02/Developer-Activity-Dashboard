import { useEffect, useState } from "react";
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
  Box,
} from "@mui/material";

import sampleData from "./assets/data/sample-data.json";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const RecentActivityTableContent = () => {

  
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = () => {
      setTimeout(() => {
        setData(sampleData.data.AuthorWorklog);
      }, 1000);
    };

    if (true) {
      fetchData();
    }
  }, []);



  return (
    <>
      <TableContainer component={Paper} style={{borderRadius:"20px", backgroundColor:"#F5F5F5"}}>
        <Typography variant="h6" style={{marginLeft:"2%"}}>
          Activity Table
        </Typography>
        <br />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{" "}</TableCell>
              <TableCell>Users</TableCell>
              <TableCell>Activite days</TableCell>
              <TableCell>Day wise Activity</TableCell>
              <TableCell>Total Activity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.rows &&
              data.rows.map((row,ind) => {
                return (
                  <>
                    <TableRow key={ind}>
                     <TableCell><AccountCircleIcon/></TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.activeDays.days}</TableCell>
                      <TableCell>{row.dayWiseActivity.length}</TableCell>
                      <TableCell>{row.totalActivity.length}</TableCell>
                    </TableRow>
                  </>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default RecentActivityTableContent;
