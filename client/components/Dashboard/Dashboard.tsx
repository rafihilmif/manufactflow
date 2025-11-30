import Chart from "@/components/Dashboard/Chart/Chart";
import Statistic from "@/components/Dashboard/Statistic";
import React from "react";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <Statistic />

      <Chart />
    </div>
  );
};

export default Dashboard;
