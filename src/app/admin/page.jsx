'use client';

import React, { useState } from "react";
import { AppSidebar } from "../../components/app-sidebar";
import {  SidebarProvider, SidebarInset, SidebarTrigger, Button,} from "../../components/ui/sidebar";
import { Separator } from "../../components/ui/separator";
import { Modal } from "../../components/ui/modal";
import {  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell,} from "recharts";

const sampleRequests = [
  {
    id: "232020",
    type: "Fire",
    fullname: "Cosmos Nyantakyi",
    contact: "0546777888",
    time: "8:45am",
    location: "National Cathedral inside, Accra",
  },
  {
    id: "232021",
    type: "Accident",
    fullname: "Nikki Carter",
    contact: "0244130987",
    time: "10:10am",
    location: "Mamprobi, Near Town",
  },
  {
    id: "232022",
    type: "Theft",
    fullname: "Maame Yeboah",
    contact: "0209998888",
    time: "1:01am",
    location: "Labadi beach",
  },
];

// ✅ HistoryPage Component
const HistoryPage = () => {
    const [view, setView] = useState("weekly");
  
    const weeklyData = [
      { day: "Mon", requests: 5 },
      { day: "Tue", requests: 8 },
      { day: "Wed", requests: 3 },
      { day: "Thu", requests: 10 },
      { day: "Fri", requests: 7 },
      { day: "Sat", requests: 4 },
      { day: "Sun", requests: 6 },
    ];
  
    const monthlyData = [
      { name: "Fire", value: 20 },
      { name: "Accident", value: 15 },
      { name: "Theft", value: 10 },
      { name: "Flood", value: 5 },
    ];
  
    const COLORS = ["#FF0000", "#FFA500", "#00C49F", "#0088FE"];
  
    return (
      <div className="p-4 bg-white rounded-xl shadow">
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setView("weekly")}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Weekly
          </button>
          <button
            onClick={() => setView("monthly")}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Monthly
          </button>
        </div>
  
        {view === "weekly" && (
          <div>
            <h2 className="text-xl font-bold mb-2">Weekly Emergency Requests</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="requests" fill="#FF0000" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
  
        {view === "monthly" && (
          <div>
            <h2 className="text-xl font-bold mb-2">Monthly Emergency Breakdown</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={monthlyData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {monthlyData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    );
  };
    
     

// ✅ Main Dashboard
export default function AdminDashboard() {
  const [statuses, setStatuses] = useState({});
  const [activeTab, setActiveTab] = useState("dashboard"); // NEW: track current view

  const handleStatus = (requestId, status) => {
    setStatuses((prev) => ({
      ...prev,
      [requestId]: status,
    }));
  };

  return (
    <SidebarProvider className={"flex"}>
      <AppSidebar className={"flex-1/6"} setActiveTab={setActiveTab} />
      <SidebarInset className={"flex-5/6"}>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          {/* Conditional Rendering Based on Sidebar Tab */}
          {activeTab === "dashboard" && (
            <div className="overflow-x-auto rounded-xl shadow bg-white">
              <table className="w-full table-auto border-collapse text-sm text-left">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-2">Request ID</th>
                    <th className="px-4 py-2">Request Type</th>
                    <th className="px-4 py-2">User's Fullname</th>
                    <th className="px-4 py-2">User's Contact</th>
                    <th className="px-4 py-2">Time of Request</th>
                    <th className="px-4 py-2">Location</th>
                    <th className="px-4 py-2">Is the request complete?</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleRequests.map((request) => {
                    const rowStatus = statuses[request.id];
                    return (
                      <tr
                        key={request.id}
                        className={
                          rowStatus === "yes"
                            ? "bg-green-200"
                            : rowStatus === "no"
                            ? "bg-red-200"
                            : ""
                        }
                      >
                        <td className="px-4 py-2 border-t">{request.id}</td>
                        <td className="px-4 py-2 border-t">{request.type}</td>
                        <td className="px-4 py-2 border-t">{request.fullname}</td>
                        <td className="px-4 py-2 border-t">{request.contact}</td>
                        <td className="px-4 py-2 border-t">{request.time}</td>
                        <td className="px-4 py-2 border-t">{request.location}</td>
                        <td className="px-4 py-2 border-t space-x-2">
                          <button
                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                            onClick={() => handleStatus(request.id, "yes")}
                          >
                            YES
                          </button>
                          <button
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            onClick={() => handleStatus(request.id, "no")}
                          >
                            NO
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "Weekly" && <HistoryPage />}
          <Modal />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
