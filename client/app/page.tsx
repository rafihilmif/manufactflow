import Header from "@/components/Layout/Header";
import Sidebar from "@/components/Layout/Sidebar/Sidebar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-linier-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-900 transition-all duration-500">
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
        </div>
      </div>
    </div>
  );
}
