'use client';

import React, { useState, useEffect } from "react";
import GoogleMap from "../../components/client/GoogleMap";

const RequestDetails = ({ request, onClose }) => {
  const [coordinates, setCoordinates] = useState(null);

  const geocodeLocation = async (location) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        setCoordinates({ lng, lat });
      } else {
        console.error("No coordinates found for location:", location);
        setCoordinates(null);
      }
    } catch (error) {
      console.error("Error geocoding location:", error);
      setCoordinates(null);
    }
  };

  useEffect(() => {
    if (request && request.location) {
      geocodeLocation(request.location);
    }
  }, [request]);

  if (!request) return null;

  const formattedDate = new Date(request.createdAt).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="mt-6 bg-white rounded-2xl shadow-lg border border-gray-100">
      {/* Header with Gradient */}
      <div className="flex justify-between items-center mb-6 bg-gradient-to-r from-red-500 to-red-700 p-4 rounded-t-xl">
        <h3 className="text-xl font-bold text-white">Request Details</h3>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-200 font-semibold transition-colors duration-200"
        >
          Close
        </button>
      </div>

      <div className="grid grid-cols-1 p-6 md:grid-cols-2 gap-6">
        {/* Details Section */}
        <div className="space-y-4">
          {[
            { label: 'Request ID', value: request.id },
            { label: 'Type', value: request.type },
            { label: 'User\'s Fullname', value: request.fullname },
            { label: 'Contact', value: request.contact },
            { label: 'Time', value: request.time },
            { label: 'Location', value: request.location },
            { label: 'Description', value: request.description },
            { label: 'Status', value: request.status },
            { label: 'Created At', value: formattedDate },
          ].map((item, index) => (
            <div key={index} className="flex items-start">
              <span className="font-semibold text-gray-700 w-32">{item.label}:</span>
              <span className="text-gray-600 flex-1">{item.value}</span>
            </div>
          ))}
        </div>

        {/* Map Section */}
        <div className="h-72 rounded-lg overflow-hidden border border-gray-200 shadow-md">
          {coordinates ? (
            <GoogleMap
              initialCoordinates={coordinates}
              showMarker={true}
            />
          ) : (
            <div className="h-full flex items-center justify-center bg-gray-100">
              <p className="text-gray-600">Loading map...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestDetails;