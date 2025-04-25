'use client';

import React, { useRef, useEffect, useState } from 'react';
import { loadGoogleMaps } from '../../lib/googleMapsLoader';

const GoogleMap = ({ onLocationSelect, onClose, initialCoordinates, showMarker = false }) => {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [google, setGoogle] = useState(null);

  useEffect(() => {
    const initMap = async () => {
      try {
        const googleMaps = await loadGoogleMaps();
        setGoogle(googleMaps);

        const defaultCenter = initialCoordinates
          ? { lat: initialCoordinates.lat, lng: initialCoordinates.lng }
          : { lat: 5.603717, lng: -0.186964 }; // Default to Accra, Ghana

        const mapInstance = new googleMaps.maps.Map(mapContainer.current, {
          center: defaultCenter,
          zoom: initialCoordinates ? 14 : 9,
        });

        setMap(mapInstance);

        // Add navigation controls
        mapInstance.setOptions({
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
        });

        if (showMarker && initialCoordinates) {
          // Display a marker at the initial coordinates (for RequestDetails)
          const markerInstance = new googleMaps.maps.Marker({
            position: { lat: initialCoordinates.lat, lng: initialCoordinates.lng },
            map: mapInstance,
          });
          setMarker(markerInstance);
        }

        if (!showMarker) {
          // Allow clicking on the map to select a location (for Homepage)
          mapInstance.addListener('click', (e) => {
            const { lat, lng } = e.latLng;
            if (marker) {
              marker.setMap(null); // Remove previous marker
            }
            const newMarker = new googleMaps.maps.Marker({
              position: { lat: lat(), lng: lng() },
              map: mapInstance,
            });
            setMarker(newMarker);
            onLocationSelect({ lng: lng(), lat: lat() });
          });
        }
      } catch (error) {
        console.error('Error initializing Google Map:', error);
      }
    };

    initMap();

    return () => {
      if (map) {
        // Cleanup (Google Maps doesn't have a remove method, but we can clear the reference)
        setMap(null);
        setMarker(null);
      }
    };
  }, [onLocationSelect, initialCoordinates, showMarker]);

  return (
    <div>
      <div ref={mapContainer} className="w-full h-64 sm:h-96" />
    </div>
  );
};

export default GoogleMap;