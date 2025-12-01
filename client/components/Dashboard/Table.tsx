import { MoreHorizontal, TrendingDown, TrendingUp } from "lucide-react";
import { recentOrder, topProduct } from "@/lib/table.config";
import React from "react";

const Table = () => {
  const getStatusColor = (item) => {
    switch (item) {
      case "completed":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
      case "pending":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "cancelled":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400";
    }
  };
  return (
    <div className="space-y-6">
      <div
        className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl
        rounded-b-2xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden"
      >
        <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-lsate-800 dark:text-white">
                Recent Production
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Latest production orders
              </p>
            </div>
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              View All
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-3 text-sm font-semibold text-slate-600">
                  Order ID
                </th>
                <th className="text-left p-3 text-sm font-semibold text-slate-600">
                  Customer
                </th>
                <th className="text-left p-3 text-sm font-semibold text-slate-600">
                  Product
                </th>
                <th className="text-left p-3 text-sm font-semibold text-slate-600">
                  Amount
                </th>
                <th className="text-left p-3 text-sm font-semibold text-slate-600">
                  Status
                </th>
                <th className="text-left p-3 text-sm font-semibold text-slate-600">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {recentOrder.map((item, i) => {
                return (
                  <tr
                    key={i}
                    className="border-b border-slate-200/50 dark:border-slate-700/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="p-4">
                      <span className="text-sm font-medium text-blue">
                        {item.id}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-slate-800 dark:text-white">
                        {item.customer}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-slate-800 dark:text-white">
                        {item.product}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-slate-800 dark:text-white">
                        {item.amount}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`text-slate-400 dark:text-white font-medium text-xs px-3 py-1 rounded-full ${getStatusColor(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-slate-800 dark:text-white">
                        {item.date}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-slate-800 dark:text-white">
                        <MoreHorizontal className="w-4 h-4 " />
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div
        className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border
       border-slate-200/50 dark:border-slate-700/50"
      >
        <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold text-slate-800 dark:text-white">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                Top Production
              </h3>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Best performing production
            </p>
          </div>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View All
          </button>
        </div>
        <div className="p-6 space-y-4">
          {topProduct.map((item, i) => {
            return (
              <div
                key={i}
                className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-slate-800 dark:text-white">
                    {item.name}
                  </h4>
                  <p>{item.sales}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-800 dark:text-white">
                    {item.revenue}
                  </p>
                  <div className="flex items-center space-x-1">
                    {item.trend === "up" ? (
                      <TrendingUp className="w-3 h-3 text-emerald-500" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-red-500" />
                    )}
                    <span
                      className={`text-xs font-medium ${
                        item.trend === "up"
                          ? "text-emerald-500"
                          : "text-red-500"
                      }`}
                    >
                      {item.change}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Table;
