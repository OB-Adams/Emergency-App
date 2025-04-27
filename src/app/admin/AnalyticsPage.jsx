'use client';

import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale, DoughnutController, Filler, BarElement } from 'chart.js';
import { Pie, Doughnut, Line, Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale, DoughnutController, Filler, BarElement);

// Mock analytics data with additional metrics
const mockAnalyticsData = {
  totalRequests: 50,
  maxRequestsGoal: 100, // For the progress bar
  statusBreakdown: [
    { status: 'Pending', count: 20 },
    { status: 'In Progress', count: 15 },
    { status: 'Resolved', count: 15 },
  ],
  requestsOverTime: [
    { date: '2025-04-20', count: 5 },
    { date: '2025-04-21', count: 8 },
    { date: '2025-04-22', count: 3 },
    { date: '2025-04-23', count: 10 },
    { date: '2025-04-24', count: 7 },
    { date: '2025-04-25', count: 12 },
    { date: '2025-04-26', count: 5 },
  ],
  averageResponseTime: 45, // Average response time in minutes (for resolved requests)
  emergencyTypes: [
    { type: 'Medical', count: 15 },
    { type: 'Fire', count: 10 },
    { type: 'Accident', count: 8 },
    { type: 'Other', count: 17 },
  ],
  requestsByPriority: [
    { priority: 'High', count: 12 },
    { priority: 'Medium', count: 25 },
    { priority: 'Low', count: 13 },
  ],
};

const AnalyticsPage = () => {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    // Simulate fetching analytics data
    setAnalytics(mockAnalyticsData);

    // In a real app, fetch from /api/admin/analytics
    // Example MongoDB queries:
    // - Average Response Time: db.requests.aggregate([{ $match: { status: "Resolved" } }, { $group: { _id: null, avgTime: { $avg: { $subtract: ["$resolvedAt", "$createdAt"] } } } }])
    // - Emergency Types: db.requests.aggregate([{ $group: { _id: "$emergencyType", count: { $sum: 1 } } }])
    // - Requests by Priority: db.requests.aggregate([{ $group: { _id: "$priority", count: { $sum: 1 } } }])
  }, []);

  if (!analytics) {
    return <div className="p-4 bg-white rounded-xl shadow">Loading analytics...</div>;
  }

  // Data for Total Requests (Circular Progress Bar using Doughnut)
  const totalRequestsData = {
    datasets: [
      {
        data: [analytics.totalRequests, analytics.maxRequestsGoal - analytics.totalRequests],
        backgroundColor: ['#FF0000', '#E5E7EB'],
        borderWidth: 0,
        circumference: 360,
        cutout: '80%',
      },
    ],
  };

  // Data for Status Breakdown (Pie Chart)
  const statusBreakdownData = {
    labels: analytics.statusBreakdown.map(item => item.status),
    datasets: [
      {
        data: analytics.statusBreakdown.map(item => item.count),
        backgroundColor: ['#FF0000', '#FF5555', '#FF9999'],
        borderColor: '#FFFFFF',
        borderWidth: 2,
      },
    ],
  };

  // Data for Requests Over Time (Line Chart)
  const requestsOverTimeData = {
    labels: analytics.requestsOverTime.map(item => item.date),
    datasets: [
      {
        label: 'Requests',
        data: analytics.requestsOverTime.map(item => item.count),
        fill: true,
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        borderColor: '#FF0000',
        tension: 0.3,
      },
    ],
  };

  // Data for Most Common Emergency Types (Bar Chart)
  const emergencyTypesData = {
    labels: analytics.emergencyTypes.map(item => item.type),
    datasets: [
      {
        label: 'Count',
        data: analytics.emergencyTypes.map(item => item.count),
        backgroundColor: '#FF0000',
        borderColor: '#FF0000',
        borderWidth: 1,
      },
    ],
  };

  // Data for Requests by Priority (Horizontal Bar Chart)
  const requestsByPriorityData = {
    labels: analytics.requestsByPriority.map(item => item.priority),
    datasets: [
      {
        label: 'Count',
        data: analytics.requestsByPriority.map(item => item.count),
        backgroundColor: ['#FF0000', '#FF5555', '#FF9999'],
        borderColor: '#FFFFFF',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
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
    maintainAspectRatio: false,
  };

  const lineChartOptions = {
    ...chartOptions,
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
  };

  const barChartOptions = {
    ...chartOptions,
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          color: '#E5E7EB',
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };

  const horizontalBarChartOptions = {
    ...chartOptions,
    indexAxis: 'y',
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          color: '#E5E7EB',
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Requests (Circular Progress Bar) */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-2">Total Requests</h3>
          <div className="relative w-40 h-40">
            <Doughnut data={totalRequestsData} options={{ ...chartOptions, cutout: '80%' }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-red-600">
                {Math.round((analytics.totalRequests / analytics.maxRequestsGoal) * 100)}%
              </span>
            </div>
          </div>
          <p className="mt-2 text-gray-600">
            {analytics.totalRequests} of {analytics.maxRequestsGoal} requests
          </p>
        </div>

        {/* Average Response Time */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm flex flex-col items-center justify-center">
          <h3 className="text-lg font-semibold mb-2">Avg Response Time</h3>
          <p className="text-3xl font-bold text-red-600">{analytics.averageResponseTime} mins</p>
          <p className="mt-2 text-gray-600">For resolved requests</p>
        </div>

        {/* Status Breakdown (Pie Chart) */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Status Breakdown</h3>
          <div className="h-64">
            <Pie data={statusBreakdownData} options={chartOptions} />
          </div>
        </div>

        {/* Most Common Emergency Types (Bar Chart) */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm col-span-1 md:col-span-2 lg:col-span-1">
          <h3 className="text-lg font-semibold mb-2">Emergency Types</h3>
          <div className="h-64">
            <Bar data={emergencyTypesData} options={barChartOptions} />
          </div>
        </div>

        {/* Requests by Priority (Horizontal Bar Chart) */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm col-span-1 md:col-span-2 lg:col-span-1">
          <h3 className="text-lg font-semibold mb-2">Requests by Priority</h3>
          <div className="h-64">
            <Bar data={requestsByPriorityData} options={horizontalBarChartOptions} />
          </div>
        </div>

        {/* Requests Over Time (Line Chart) */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm col-span-1 md:col-span-2 lg:col-span-3">
          <h3 className="text-lg font-semibold mb-2">Requests Over Time</h3>
          <div className="h-80">
            <Line data={requestsOverTimeData} options={lineChartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;