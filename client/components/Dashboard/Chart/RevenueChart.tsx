import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import React from "react";
import { chartData } from "@/lib/chart.config";
const RevenueChart = () => {
  return (
    <div
      className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl
    rounded-b-2xl border border-slate-200/50 dark:border-slate-700/50 p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="text-xl font-bold text-slate-800 dark:text-white">
          <h3>Revenue Chart</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Monthly revenue and expenses
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-full"></div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              <span>Revenue</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gradient-to-r from-slate-400 to-slate-500 rounded-full"></div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              <span>Expenses</span>
            </div>
          </div>
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianAxis
              strokeDasharray={"3 3"}
              stroke="#e2e8fe"
              opacity={0.3}
            />
            <XAxis
              dataKey={"month"}
              stroke="#6478b"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#6478b"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 255, 0.95)",
                border: "none",
                borderRadius: "12px",
                boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
              }}
              formatter={(value) => [`$${value.toLocaleString()}`, ""]}
            />
            <Bar
              dataKey={"revenue"}
              fill={"url(#revenueGradient)"}
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
            <Bar
              dataKey={"expenses"}
              fill={"url(#expensesGradient)"}
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="8%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>

              <linearGradient id="expensesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="8%" stopColor="#6ee7b7" />
                <stop offset="100%" stopColor="#34d399" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;
