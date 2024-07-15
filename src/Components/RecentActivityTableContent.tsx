import { useEffect, useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography,
  Box,
  styled,
} from "@mui/material";

import sampleData from "./assets/data/sample-data.json";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const WhiteTableCell = styled(TableCell)(({ theme }) => ({
  color: 'white',
}));

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
      <TableContainer component={Paper} style={{borderRadius:"20px",padding:"10px" ,backgroundColor:"rgb(167 60 243 / 10%)"}}>
        <Typography variant="h6" style={{marginLeft:"2%", color:"violet"}}>
          Activity Table
        </Typography>
        <br />
        <Table>
          <TableHead>
            <TableRow>
              <WhiteTableCell>{" "}</WhiteTableCell>
              <WhiteTableCell>Users</WhiteTableCell>
              <WhiteTableCell>Activite days</WhiteTableCell>
              <WhiteTableCell>Day wise Activity</WhiteTableCell>
              <WhiteTableCell>Total Activity</WhiteTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.rows &&
              data.rows.map((row,ind) => {
                return (
                  <>
                    <TableRow key={ind}>
                     <WhiteTableCell><AccountCircleIcon/></WhiteTableCell>
                      <WhiteTableCell>{row.name}</WhiteTableCell>
                      <WhiteTableCell>{row.activeDays.days}</WhiteTableCell>
                      <WhiteTableCell>{row.dayWiseActivity.length}</WhiteTableCell>
                      <WhiteTableCell>{row.totalActivity.length}</WhiteTableCell>
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
