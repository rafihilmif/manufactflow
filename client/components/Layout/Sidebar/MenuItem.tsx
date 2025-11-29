"use client";
import { MenuItem as MenuItemType } from "@/types/menuItem";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

interface MenuItemProps {
  item: MenuItemType;
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const Icon = item.icon;
  return (
    <div key={item.id}>
      <button
        className={`w-full flex items-center justify-between p-3 rounded-xl transitiona-all duration-200`}
      >
        <div className="flex items-center space-x-3">
          <Icon className={`w-5 h-5`} />
          <>
            <span className="font-medium ml-2 ">{item.label}</span>
            {item.badge && (
              <span className="px-2 py-1 text-xs bg-red-500 text-white rounded-full">
                {item.badge}
              </span>
            )}
            {item.count && (
              <span className="px-2 py-1 text-xs bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full">
                {item.count}
              </span>
            )}
          </>
        </div>
      </button>
    </div>
  );
};

export default MenuItem;
