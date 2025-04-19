'use client';

import React from "react";

const RequestTable = ({ requests, statuses, handleStatus, onRowClick, selectedRequestId }) => {
  return (
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
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => {
            const rowStatus = statuses[request.id] || request.status;
            return (
              <tr
                key={request.id}
                className={`cursor-pointer ${
                  rowStatus === "yes"
                    ? "bg-green-200"
                    : rowStatus === "no"
                    ? "bg-red-200"
                    : ""
                } ${selectedRequestId === request.id ? "bg-blue-100" : ""}`}
                onClick={() => onRowClick(request)}
              >
                <td className="px-4 py-2 border-t">{request.id}</td>
                <td className="px-4 py-2 border-t">{request.type}</td>
                <td className="px-4 py-2 border-t">{request.fullname}</td>
                <td className="px-4 py-2 border-t">{request.contact}</td>
                <td className="px-4 py-2 border-t">{request.time}</td>
                <td className="px-4 py-2 border-t">{request.location}</td>
                <td className="px-4 py-2 border-t space-x-2">
                  <span className="capitalize">{rowStatus}</span>
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStatus(request.id, "yes");
                    }}
                  >
                    YES
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStatus(request.id, "no");
                    }}
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
  );
};

export default RequestTable;