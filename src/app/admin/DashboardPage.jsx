'use client';

import React, { useState, useEffect } from 'react';
import GoogleMap from '../../components/client/GoogleMap';
import { Button } from '../../components/ui/button';

const DashboardPage = ({ requests, onRowClick, selectedRequestId, setActiveTab }) => {
  const [recentRequests, setRecentRequests] = useState([]);
  const [mapMarkers, setMapMarkers] = useState([]);
  const [quickStats, setQuickStats] = useState({
    activeRequests: 0,
    urgentRequests: 0,
    todaysRequests: 0,
  });

  useEffect(() => {
    if (requests && requests.length > 0) {
      // Calculate Quick Stats
      const activeRequests = requests.filter(req => req.status !== 'Resolved').length;
      const urgentRequests = requests.filter(req => req.priority === 'High' && req.status !== 'Resolved').length;
      const today = new Date().toISOString().split('T')[0];
      const todaysRequests = requests.filter(req => new Date(req.createdAt).toISOString().split('T')[0] === today).length;

      setQuickStats({
        activeRequests,
        urgentRequests,
        todaysRequests,
      });

      // Get Recent Requests (last 5)
      const sortedRequests = [...requests].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      const recent = sortedRequests.slice(0, 5);
      setRecentRequests(recent);

      // Prepare Map Markers
      const markers = recent
        .filter(req => req.coordinates)
        .map(req => ({
          lat: req.coordinates.lat,
          lng: req.coordinates.lng,
          id: req.id,
        }));
      setMapMarkers(markers);
    }
  }, [requests]);

  const handleRowClick = (request) => {
    onRowClick(request);
  };

  const handleMarkAsResolved = (requestId) => {
    // Simulate marking as resolved
    // In a real app, make an API call to update the status
    // fetch(`/api/requests/${requestId}`, {
    //   method: 'PATCH',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ status: 'Resolved' }),
    // }).then(() => {
    //   // Refresh requests
    // });
    console.log(`Marked request ${requestId} as resolved`);
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Responder Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Quick Stats */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Quick Stats</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Active Requests:</span>
              <span className="text-red-600 font-bold">{quickStats.activeRequests}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Urgent Requests:</span>
              <span className="text-red-600 font-bold">{quickStats.urgentRequests}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Today's Requests:</span>
              <span className="text-red-600 font-bold">{quickStats.todaysRequests}</span>
            </div>
          </div>
        </div>

        {/* Recent Requests */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm md:col-span-2">
          <h3 className="text-lg font-semibold mb-2">Recent Requests</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  {['ID', 'Type', 'Location', 'Status', 'Action'].map((header) => (
                    <th
                      key={header}
                      className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentRequests.map((request) => (
                  <tr
                    key={request.id}
                    className={`cursor-pointer hover:bg-gray-100 ${
                      selectedRequestId === request.id ? 'bg-gray-200' : ''
                    }`}
                    onClick={() => handleRowClick(request)}
                  >
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{request.id}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{request.emergencyType}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{request.location}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{request.status}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">
                      {request.status !== 'Resolved' && (
                        <Button
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent row click
                            handleMarkAsResolved(request.id);
                          }}
                          className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 text-xs"
                        >
                          Mark Resolved
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mini-Map */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Recent Request Locations</h3>
          <div className="h-64">
            {mapMarkers.length > 0 ? (
              <GoogleMap
                initialCoordinates={mapMarkers[0]}
                markers={mapMarkers}
                showMarker={true}
              />
            ) : (
              <div className="h-full flex items-center justify-center bg-gray-100">
                <p className="text-gray-600">No recent locations available</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
          <div className="space-y-2">
            <Button
              onClick={() => setActiveTab('active-requests')}
              className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
            >
              View Active Requests
            </Button>
            <Button
              onClick={() => setActiveTab('analytics')}
              className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700"
            >
              View Analytics
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;