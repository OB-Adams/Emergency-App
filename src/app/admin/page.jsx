'use client';

import React, { useState } from "react";
import { AppSidebar } from "../../components/app-sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "../../components/ui/sidebar";
import { Separator } from "../../components/ui/separator";
import { Modal } from "../../components/ui/modal";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import RequestTable from "./RequestTable";
import RequestDetails from "./RequestDetails";

// HistoryPage Component
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

  return (
    <div className="p-4 bg-white rounded-xl shadow">
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
    </div>
  );
};

// Main Dashboard
export default function AdminDashboard() {
  const [statuses, setStatuses] = useState({});
  const [activeTab, setActiveTab] = useState("active-requests");
  const [selectedRequest, setSelectedRequest] = useState(null);

  const sampleRequests = [
    {
      id: "232020",
      type: "Fire",
      fullname: "Cosmos Nyantakyi",
      contact: "0546777888",
      time: "8:45am",
      location: "National Cathedral inside, Accra",
      description: "Fire outbreak in the main hall, heavy smoke reported.",
      status: "pending",
      createdAt: "2025-04-18T08:45:00Z",
    },
    {
      id: "232021",
      type: "Accident",
      fullname: "Nikki Carter",
      contact: "0244130987",
      time: "10:10am",
      location: "Mamprobi, Near Town",
      description: "Car accident involving two vehicles, one person injured.",
      status: "pending",
      createdAt: "2025-04-18T10:10:00Z",
    },
    {
      id: "232022",
      type: "Theft",
      fullname: "Maame Yeboah",
      contact: "0209998888",
      time: "1:01am",
      location: "Labadi beach",
      description: "Bag stolen while walking on the beach at night.",
      status: "pending",
      createdAt: "2025-04-19T01:01:00Z",
    },
    {
      id: "232023",
      type: "Medical",
      fullname: "Kwame Asante",
      contact: "0551234567",
      time: "3:30pm",
      location: "Korle Bu Teaching Hospital, Accra",
      description: "Patient experiencing chest pain, urgent assistance needed.",
      status: "pending",
      createdAt: "2025-04-18T15:30:00Z",
    },
    {
      id: "232024",
      type: "Flood",
      fullname: "Ama Mensah",
      contact: "0278901234",
      time: "6:20pm",
      location: "Dzorwulu, Accra",
      description: "Severe flooding in residential area, water entering homes.",
      status: "pending",
      createdAt: "2025-04-18T18:20:00Z",
    },
  ];

  const handleStatus = (requestId, status) => {
    setStatuses((prev) => ({
      ...prev,
      [requestId]: status,
    }));
  };

  const handleRowClick = (request) => {
    if (selectedRequest && selectedRequest.id === request.id) {
      setSelectedRequest(null); // Deselect if clicking the same row
    } else {
      setSelectedRequest(request);
    }
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
          {activeTab === "dashboard" && (
            <div className="p-4 bg-white rounded-xl shadow">
              <h2 className="text-xl font-bold mb-2">Dashboard</h2>
              <p>Dashboard content coming soon...</p>
            </div>
          )}

          {activeTab === "active-requests" && (
            <div>
              <RequestTable
                requests={sampleRequests}
                statuses={statuses}
                handleStatus={handleStatus}
                onRowClick={handleRowClick}
                selectedRequestId={selectedRequest?.id}
              />
              <RequestDetails
                request={selectedRequest}
                onClose={() => setSelectedRequest(null)}
              />
              <Modal />
            </div>
          )}

          {activeTab === "weekly" && <HistoryPage />}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}