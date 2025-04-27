'use client';

import React, { useState, useEffect } from "react";
import GoogleMap from "../../components/client/GoogleMap";

const RequestDetails = ({ request, onClose }) => {
  const [coordinates, setCoordinates] = useState(null);
  const [mediaErrors, setMediaErrors] = useState({});

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

  const handleMediaError = (index) => {
    setMediaErrors((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <div className="mt-6 p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <span className="text-gray-600 flex-1">{item.value || 'N/A'}</span>
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

      {/* Media Section */}
      {request.media && request.media.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-4 text-gray-800">Attached Media</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {request.media.map((mediaItem, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 shadow-sm bg-gray-50">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-semibold text-gray-700">
                    {mediaItem.type.charAt(0).toUpperCase() + mediaItem.type.slice(1)} {index + 1}
                  </p>
                  {(mediaItem.uploadedAt || mediaItem.size) && (
                    <p className="text-xs text-gray-500">
                      {mediaItem.uploadedAt
                        ? new Date(mediaItem.uploadedAt).toLocaleString("en-US", {
                            dateStyle: "short",
                            timeStyle: "short",
                          })
                        : ""}
                      {mediaItem.uploadedAt && mediaItem.size ? " | " : ""}
                      {mediaItem.size ? `${(mediaItem.size / 1024).toFixed(1)} KB` : ""}
                    </p>
                  )}
                </div>
                {mediaErrors[index] ? (
                  <div className="w-full h-48 flex items-center justify-center bg-gray-200 rounded-lg">
                    <p className="text-gray-600 text-sm">Failed to load media</p>
                  </div>
                ) : (
                  <>
                    {mediaItem.type === 'image' && (
                      <img
                        src={mediaItem.data}
                        alt={`Attached ${mediaItem.type} ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg"
                        onError={() => handleMediaError(index)}
                      />
                    )}
                    {mediaItem.type === 'video' && (
                      <video
                        src={mediaItem.data}
                        controls
                        className="w-full h-48 object-cover rounded-lg"
                        onError={() => handleMediaError(index)}
                      />
                    )}
                    {mediaItem.type === 'audio' && (
                      <audio
                        src={mediaItem.data}
                        controls
                        className="w-full"
                        onError={() => handleMediaError(index)}
                      />
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestDetails;