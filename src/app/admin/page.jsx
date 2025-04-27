'use client';

import React, { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';
import { AppSidebar } from '../../components/app-sidebar';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '../../components/ui/sidebar';
import { Separator } from '../../components/ui/separator';
import { Modal } from '../../components/ui/modal';
import RequestTable from './RequestTable';
import RequestDetails from './RequestDetails';
import AnalyticsPage from './AnalyticsPage';
import ProfilePage from './ProfilePage';
import SettingsPage from './SettingsPage';
import { Button } from '../../components/ui/button';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import DashboardPage from './DashboardPage';

// Register Chart.js components for HistoryPage
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// HistoryPage for chart view
const HistoryPage = () => {
  const [view, setView] = useState('weekly');

  const weeklyData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Requests',
        data: [5, 8, 3, 10, 7, 4, 6],
        backgroundColor: '#FF0000',
        borderColor: '#FF0000',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        backgroundColor: '#333',
        titleFont: { size: 14 },
        bodyFont: { size: 12 },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: '#E5E7EB',
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow">
      {view === 'weekly' && (
        <div>
          <h2 className="text-xl font-bold mb-2">Weekly Emergency Requests</h2>
          <div className="h-80">
            <Bar data={weeklyData} options={options} />
          </div>
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

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <SidebarProvider className="flex">
      <AppSidebar className="flex-1/6" setActiveTab={setActiveTab} activeTab={activeTab} />
      <SidebarInset className="flex-5/6">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Button
            onClick={handleSignOut}
            className="ml-auto bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 hover:cursor-pointer"
          >
            Sign Out
          </Button>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          {activeTab === 'dashboard' && (
            <DashboardPage/>
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

          {activeTab === 'analytics' && <AnalyticsPage />}

          {activeTab === 'weekly' && <HistoryPage />}

          {activeTab === 'profile' && <ProfilePage />}

          {activeTab === 'settings' && <SettingsPage />}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}