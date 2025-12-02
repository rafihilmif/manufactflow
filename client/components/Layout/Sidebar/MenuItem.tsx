"use client";
import { MenuItem as MenuItemType } from "@/types/menuItem";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

interface MenuItemProps {
  item: MenuItemType;
}

const MenuItem: React.FC<MenuItemProps> = ({
  item,
  currentPage,
  collapsed,
  onToggle,
  onPageChange,
}) => {
  const Icon = item.icon;
  const [expandItems, setExpandItems] = useState(new Set([""]));

  const toggleExpand = (id) => {
    const newExpand = new Set(expandItems);

    if (newExpand.has(id)) {
      newExpand.delete(id);
    } else {
      newExpand.add(id);
    }
    setExpandItems(newExpand);
  };
  return (
    <div key={item.id}>
      <button
        className={`w-full flex items-center justify-between p-3 rounded-xl transitiona-all duration-200 ${
          currentPage === item.id || item.active
            ? "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg shadow-blue-500/25"
            : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50"
        }`}
        onClick={() => {
          if (item.submenu) {
            toggleExpand(item.id);
          } else {
            onPageChange(item.id);
          }
        }}
      >
        <div className="flex items-center space-x-3">
          <Icon className={`w-5 h-5`} />
          <>
            {!collapsed && (
              <>
                <span className="font-medium ml-2">{item.label}</span>
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
            )}
          </>
        </div>
        {!collapsed && item.submenu && (
          <ChevronDown className={`w-4 h-4 transition-transform`} />
        )}
      </button>
      {!collapsed && item.submenu && expandItems.has(item.id) && (
        <div className="ml-8 mt-2 space-y-1">
          {item.submenu?.map((item, i) => {
            return (
              <button
                key={i}
                className="w-full text-left p-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-800 
                dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-lg transition-all"
              >
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MenuItem;
