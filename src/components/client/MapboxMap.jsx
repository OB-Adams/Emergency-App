'use client';

import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const MapboxMap = ({ onLocationSelect, onClose, initialCoordinates, showMarker = false }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);

  useEffect(() => {
    if (map.current) return; // Initialize map only once

    const defaultCenter = initialCoordinates || [-0.186964, 5.603717];
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: defaultCenter,
      zoom: initialCoordinates ? 14 : 9,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl());

    if (showMarker && initialCoordinates) {
      // Add a marker at the initial coordinates
      marker.current = new mapboxgl.Marker()
        .setLngLat([initialCoordinates.lng, initialCoordinates.lat])
        .addTo(map.current);
    }

    if (!showMarker) {
      // Allow clicking on the map to select a location (for Homepage.jsx functionality)
      map.current.on("click", (e) => {
        const { lng, lat } = e.lngLat;
        if (marker.current) {
          marker.current.remove();
        }
        marker.current = new mapboxgl.Marker()
          .setLngLat([lng, lat])
          .addTo(map.current);
        onLocationSelect({ lng, lat });
      });
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [onLocationSelect, initialCoordinates, showMarker]);

  return (
    <div>
      <div ref={mapContainer} className="w-full h-64 sm:h-96" />
    </div>
  );
};

export default MapboxMap;