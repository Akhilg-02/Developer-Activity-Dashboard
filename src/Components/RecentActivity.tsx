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

const RecentActivity = () => {
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

  //console.log("Data", data);

  return (
    <>
      <TableContainer component={Paper}>
        <Typography variant="h6" gutterBottom>
          Activity Table
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Users</TableCell>
              <TableCell>Activite days</TableCell>
              <TableCell>Day wise Activity</TableCell>
              <TableCell>Total Activity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.rows &&
              data.rows.map((row) => {
                return (
                  <>
                    <TableRow key={row.name}>
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

export default RecentActivity;
