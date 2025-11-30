"use client";
import Header from "@/components/Layout/Header";
import Sidebar from "@/components/Layout/Sidebar/Sidebar";
import Dashboard from "@/components/Dashboard/Dashboard";
import Image from "next/image";
import React, { useState } from "react";

export default function Home() {
  const [sidebarCollapsed, setSideBarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  return (
    <div className="min-h-screen bg-linier-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-900 transition-all duration-500">
      <div className="flex h-screen overflow-hidden">
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSideBarCollapsed(!sidebarCollapsed)}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header
            sidebarCollapsed={sidebarCollapsed}
            onToggleSidebar={() => setSideBarCollapsed(!sidebarCollapsed)}
          />
          <main className="flex-1 overflow-y-auto bg-transparent">
            <div className="p-6 space-y-6">
              {currentPage === "dashboard" && <Dashboard />}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
