import Calendar from "@/components/Calender";
import Chart from "@/components/Dashboard/Chart/Chart";
import Feed from "@/components/Dashboard/Feed";
import Statistic from "@/components/Dashboard/Statistic";
import Table from "@/components/Dashboard/Table";
import React from "react";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <Statistic />

      <Chart />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-3">
        <div className="xl:col-span-2">
          <Table />
        </div>
        <div>
          <Calendar />
          <Feed />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
