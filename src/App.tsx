import "./App.css";
import {Box } from "@mui/material";
import Navbar from "./Components/Navbar";
import { ActivityProvider } from "./Components/Context/ActivityProvider";


const App: React.FC = () => {
  return (
    <Box>
      <ActivityProvider>
         <Navbar />
      </ActivityProvider>
    </Box>
  );
};

export default App;
