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
      <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <TruckElectric className="w-6 h-6 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-xl font-bold text-slate-800 dark:text-white">
                Manufactflow
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Admin Panel
              </p>
            </div>
          )}
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
        <div className="p-4 border-t border-slate-200/50 dark:border-r-slate-700/50">
          <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
            <Image
              src={"/assets/image/example.png"}
              alt={"people"}
              width={40}
              height={40}
              className="rounded-full ring-2 ring-blue-500"
            />
            <div className="flex-1 min-w-0">
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
        </div>
      )}
    </div>
  );
};

export default Sidebar;
