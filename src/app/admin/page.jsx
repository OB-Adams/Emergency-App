'use client';

import React, { useEffect, useState } from 'react';
import { AppSidebar } from '../../components/app-sidebar';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '../../components/ui/sidebar';
import { Separator } from '../../components/ui/separator';
import { Modal } from '../../components/ui/modal';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import RequestTable from './RequestTable';
import RequestDetails from './RequestDetails';

// HistoryPage for chart view
const HistoryPage = () => {
  const [view, setView] = useState('weekly');

  const weeklyData = [
    { day: 'Mon', requests: 5 },
    { day: 'Tue', requests: 8 },
    { day: 'Wed', requests: 3 },
    { day: 'Thu', requests: 10 },
    { day: 'Fri', requests: 7 },
    { day: 'Sat', requests: 4 },
    { day: 'Sun', requests: 6 },
  ];

  return (
    <div className="p-4 bg-white rounded-xl shadow">
      {view === 'weekly' && (
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

export default function AdminDashboard() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statuses, setStatuses] = useState({});
  const [activeTab, setActiveTab] = useState('active-requests');
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    const fetchEmergencyRequests = async () => {
      try {
        const response = await fetch('/api/requests', {
          credentials: 'include',
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch requests');
        }

        setRequests(data.data || []);
      } catch (err) {
        console.error('❌ Failed to load requests:', err);
        setRequests([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEmergencyRequests();
  }, []);

  const handleStatus = (requestId, status) => {
    setStatuses((prev) => ({
      ...prev,
      [requestId]: status,
    }));
  };

  const handleRowClick = (request) => {
    if (selectedRequest && selectedRequest.id === request.id) {
      setSelectedRequest(null); // Deselect if same row clicked
    } else {
      setSelectedRequest(request);
    }
  };

  return (
    <SidebarProvider className="flex">
      <AppSidebar className="flex-1/6" setActiveTab={setActiveTab} />
      <SidebarInset className="flex-5/6">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          {activeTab === 'dashboard' && (
            <div className="p-4 bg-white rounded-xl shadow">
              <h2 className="text-xl font-bold mb-2">Dashboard</h2>
              <p>Dashboard content coming soon...</p>
            </div>
          )}

          {activeTab === 'active-requests' && (
            <div>
              {loading ? (
                <p>Loading emergency requests...</p>
              ) : requests.length === 0 ? (
                <p>No emergency requests found.</p>
              ) : (
                <>
                  <RequestTable
                    requests={requests}
                    statuses={statuses}
                    handleStatus={handleStatus}
                    onRowClick={handleRowClick}
                    selectedRequestId={selectedRequest?.id}
                  />
                  <RequestDetails
                    request={selectedRequest}
                    onClose={() => setSelectedRequest(null)}
                  />
                </>
              )}
              <Modal />
            </div>
          )}

          {activeTab === 'weekly' && <HistoryPage />}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
