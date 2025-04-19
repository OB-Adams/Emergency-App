'use client';

import React, { useState, useEffect } from "react";
import MapboxMap from "../../components/client/MapboxMap";

const RequestDetails = ({ request, onClose }) => {
  const [coordinates, setCoordinates] = useState(null);

  const geocodeLocation = async (location) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          location
        )}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`
      );
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].geometry.coordinates;
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

  // Format the createdAt timestamp
  const formattedDate = new Date(request.createdAt).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="mt-4 p-4 bg-gray-100 rounded-xl shadow">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold">Request Details</h3>
        <button
          onClick={onClose}
          className="text-red-600 hover:underline"
        >
          Close
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Details Section */}
        <div>
          <p><strong>Request ID:</strong> {request.id}</p>
          <p><strong>Type:</strong> {request.type}</p>
          <p><strong>User's Fullname:</strong> {request.fullname}</p>
          <p><strong>Contact:</strong> {request.contact}</p>
          <p><strong>Time:</strong> {request.time}</p>
          <p><strong>Location:</strong> {request.location}</p>
          <p><strong>Description:</strong> {request.description}</p>
          <p><strong>Status:</strong> {request.status}</p>
          <p><strong>Created At:</strong> {formattedDate}</p>
        </div>
        {/* Map Section */}
        <div className="h-64">
          {coordinates ? (
            <MapboxMap
              initialCoordinates={coordinates}
              showMarker={true}
            />
          ) : (
            <p className="text-gray-600">Loading map...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestDetails;