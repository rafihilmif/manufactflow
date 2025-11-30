import RevenueChart from "@/components/Dashboard/Chart/RevenueChart";
import SalesChart from "@/components/Dashboard/Chart/SalesChart";
import React from "react";

const Chart = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <div className="xl:col-span-2">
        <RevenueChart />
      </div>
      <div className="space-y-6">
        <SalesChart />
      </div>
    </div>
  );
};

export default Chart;
