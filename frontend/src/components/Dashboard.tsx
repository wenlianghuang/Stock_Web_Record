import React from "react";
import Sidebar from "./Sidebar";
import '../styles/Dashboard.css';
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