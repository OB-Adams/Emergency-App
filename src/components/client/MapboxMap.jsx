// src/components/client/MapboxMap.jsx
'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

export default function MapboxMap({ onLocationSelect, onClose }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null); // Ref to store the marker instance
  const [lng, setLng] = useState(-0.1278); // Default to London
  const [lat, setLat] = useState(51.5074);
  const [zoom, setZoom] = useState(9);
  const [isMounted, setIsMounted] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null); // Track the selected location

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords;
          setLng(longitude);
          setLat(latitude);
        },
        (error) => {
          console.error('Error getting user location:', error);
          // Fallback to default location (London) if geolocation fails
        }
      );
    } else {
      console.warn('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !mapContainer.current || map.current) return;

    // Initialize the map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl());

    // Add geocoder (search bar)
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      placeholder: 'Search for a location',
    });

    map.current.addControl(geocoder);

    // Add a marker at the initial location
    marker.current = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map.current);

    // Handle map click
    map.current.on('click', (e) => {
      const { lng, lat } = e.lngLat;
      marker.current.setLngLat([lng, lat]);
      setLng(lng);
      setLat(lat);
      setSelectedLocation({ lng, lat }); // Store the selected location
      // Do not close the modal here; wait for Confirm button
    });

    // Handle geocoder search result
    geocoder.on('result', (e) => {
      const { center } = e.result;
      const [lng, lat] = center;
      marker.current.setLngLat([lng, lat]);
      setLng(lng);
      setLat(lat);
      setSelectedLocation({ lng, lat }); // Store the selected location
      // Do not close the modal here; wait for Confirm button
    });

    // Update zoom state
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    // Force resize after map loads
    map.current.on('load', () => {
      map.current.resize();
    });

    map.current.on('error', (e) => {
      console.error('Mapbox error:', e);
    });

    // Cleanup on unmount
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [isMounted, lng, lat, zoom]);

  // Handle Confirm button click
  const handleConfirm = () => {
    if (selectedLocation) {
      onLocationSelect(selectedLocation); // Pass the selected location to the parent
      onClose(); // Close the modal
    }
  };

  return (
    <div>
      <div
        ref={mapContainer}
        style={{ height: '400px', width: '100%' }} // Removed the red border since the map is rendering
        aria-label="Interactive map for selecting a location"
      />
      {selectedLocation && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleConfirm}
            className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Confirm Location
          </button>
        </div>
      )}
    </div>
  );
}