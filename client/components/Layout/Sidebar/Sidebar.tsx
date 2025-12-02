"use client";

import React, { useState } from "react";
import { TruckElectric } from "lucide-react";
import Image from "next/image";
import MenuItem from "@/components/Layout/Sidebar/MenuItem";
import { menuItems as menuItemConfigs } from "@/lib/menu.config";

const Sidebar = ({ collapsed }) => {
  const [currentPage, setCurrentPage] = useState("dashboard");

  return (
    <div
      className={`${
        collapsed ? "w-20" : "w-72"
      } flex flex-col relative z-10 border-r border-slate-200/50 ease-in-out
        bg-white/80 dark:bg-slate-900/80 transition-all duration-300 backdrop-blur-xl`}
    >
      <div
        className={`${
          collapsed ? "p-4" : "p-6"
        } border-b border-slate-200/50 dark:border-slate-700/50 transition-all duration-300`}
      >
        <div
          className={`flex items-center transition-all duration-300 ${
            collapsed ? "justify-center" : "space-x-3"
          }`}
        >
          <div
            className={`${
              collapsed ? "w-12 h-12" : "w-10 h-10 sm:w-12 sm:h-12"
            } bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 ease-in-out`}
          >
            <TruckElectric
              className={`${
                collapsed ? "w-6 h-6" : "w-6 h-6 sm:w-7 sm:h-7"
              } text-white transition-all duration-300 ease-in-out`}
            />
          </div>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
            }`}
          >
            <h1 className="text-xl font-bold text-slate-800 dark:text-white whitespace-nowrap">
              Manufactflow
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
              Admin Panel
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItemConfigs.map((item) => {
          return (
            <MenuItem
              key={item.id}
              item={item}
              currentPage={currentPage}
              collapsed={collapsed}
              onPageChange={setCurrentPage}
            />
          );
        })}
      </nav>

      {!collapsed && (
        <div className="p-4 border-t border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
            <Image
              src={"/assets/image/example.png"}
              alt={"people"}
              width={40}
              height={40}
              className="rounded-full ring-2 ring-blue-500"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-800 dark:text-white truncate">
                John Doe
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                Administrator
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
