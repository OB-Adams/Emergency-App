'use client';

import React, { useRef, useEffect, useState } from 'react';
import { loadGoogleMaps } from '../../lib/googleMapsLoader';
import { Button } from '../../components/ui/button';

const GoogleMap = ({ onLocationSelect, onClose, initialCoordinates, showMarker = false }) => {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [google, setGoogle] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    const initMap = async () => {
      try {
        const googleMaps = await loadGoogleMaps();
        setGoogle(googleMaps);

        const defaultCenter = initialCoordinates
          ? { lat: initialCoordinates.lat, lng: initialCoordinates.lng }
          : { lat: 5.603717, lng: -0.186964 };

        const mapInstance = new googleMaps.maps.Map(mapContainer.current, {
          center: defaultCenter,
          zoom: initialCoordinates ? 14 : 9,
        });

        setMap(mapInstance);

        mapInstance.setOptions({
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
        });

        if (showMarker && initialCoordinates) {
          const markerInstance = new googleMaps.maps.Marker({
            position: { lat: initialCoordinates.lat, lng: initialCoordinates.lng },
            map: mapInstance,
          });
          setMarker(markerInstance);
        }

        if (!showMarker) {
          mapInstance.addListener('click', (e) => {
            const { lat, lng } = e.latLng;
            // Remove the previous marker if it exists
            if (marker) {
              marker.setMap(null);
            }
            // Place a new marker
            const newMarker = new googleMaps.maps.Marker({
              position: { lat: lat(), lng: lng() },
              map: mapInstance,
            });
            setMarker(newMarker);
            setSelectedLocation({ lng: lng(), lat: lat() });
          });
        }
      } catch (error) {
        console.error('Error initializing Google Map:', error);
      }
    };

    initMap();

    return () => {
      if (map) {
        setMap(null);
        if (marker) {
          marker.setMap(null);
        }
        setMarker(null);
      }
    };
  }, [onLocationSelect, initialCoordinates, showMarker]);

  const handleConfirm = () => {
    if (selectedLocation) {
      onLocationSelect(selectedLocation);
    }
    onClose();
  };

  return (
    <div>
      <div ref={mapContainer} className="w-full h-64 sm:h-96" />
      {!showMarker && (
        <div className="flex justify-between mt-3">
          <Button
            onClick={handleConfirm}
            disabled={!selectedLocation}
            className="bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-400"
          >
            Confirm
          </Button>
          <Button
            onClick={onClose}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};

export default GoogleMap;