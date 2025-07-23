import React from "react";
import Sidebar from "../Fragments/Sidebar";
import Topbar from "../Fragments/Topbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Topbar */}
        <Topbar />

        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto relative">{children}</main>
      </div>
    </div>
  );
}
