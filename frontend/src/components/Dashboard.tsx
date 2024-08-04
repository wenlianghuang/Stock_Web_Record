/*
import React from "react";
import '../styles/Dashboard.css';
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const Dashboard: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    return (
    <div className="dashboard-container">
        <Topbar/>
      <div className="dashboard">
        <Sidebar />
        <div className="content">
          {children}
        </div>
      </div>
    </div>
    );
  };

export default Dashboard;
*/


import { AppBar, Box, CssBaseline, Toolbar } from "@mui/material";
import React from "react";
import Topbar from "./Topbar";
const drawerWidth = 240;

const Dashboard: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Topbar />
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        //sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, marginLeft: `${drawerWidth}px`,marginTop:'64px' }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Dashboard;
