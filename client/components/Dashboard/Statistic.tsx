import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";
import React from "react";
import { statisticsData } from "@/lib/statistic.config";

const StatisticGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {statisticsData.map((item, i) => {
        return (
          <div
            key={i}
            className="bg-white/80 dark:bg-slate-900/80 
        backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-xl
        hover:shadow-slate-200/20 dark:hover:shadow-slate-900/20 transition-all
        duration-300 group"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-600 darkk:text-slate-400 mb-2">
                  {item.title}
                </p>
                <p className="text-3xl font-bold text-slate-800 dark:text-white mb-4">
                  {item.value}
                </p>
                <div className="flex items-center space-x-2">
                  {item.trend === "up" ? (
                    <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-500" />
                  )}
                  <span
                    className={`text-sm font-semibold ${
                      item.trend === "up" ? "text-emerald-500" : "text-red-500"
                    }`}
                  >
                    {item.change}
                  </span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    vs Last month
                  </span>
                </div>
              </div>
              <div
                className={`p-3 rounded-xl ${item.bgColor} group-hover:scale-110 transition-all duration-300`}
              >
                {<item.icon className={`w-4 h-6 ${item.textColor}`} />}
              </div>
            </div>
            <div className="mt-4 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-100`}
                style={{ width: item.trend === "up" ? "75%" : "45%" }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatisticGrid;
