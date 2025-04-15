// src/components/client/MapboxMap.jsx
'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { toast } from 'sonner'; // Add this import
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

export default function MapboxMap({ onLocationSelect, onClose }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);
  const [lng, setLng] = useState(-0.1870); // Default to Accra, Ghana
  const [lat, setLat] = useState(5.6037);
  const [zoom, setZoom] = useState(9);
  const [isMounted, setIsMounted] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

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
          setLng(-0.1870);
          setLat(5.6037);
          toast.error('Unable to access your location. Defaulting to Accra, Ghana.', {
            duration: 3000,
            className: 'bg-red-600 text-white border border-red-800 rounded-xl shadow-md',
            descriptionClassName: 'text-sm font-medium',
          });
        }
      );
    } else {
      console.warn('Geolocation is not supported by this browser.');
      setLng(-0.1870);
      setLat(5.6037);
      toast.error('Geolocation not supported. Defaulting to Accra, Ghana.', {
        duration: 3000,
        className: 'bg-red-600 text-white border border-red-800 rounded-xl shadow-md',
        descriptionClassName: 'text-sm font-medium',
      });
    }
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !mapContainer.current || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.addControl(new mapboxgl.NavigationControl());

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      placeholder: 'Search for a location',
    });

    map.current.addControl(geocoder);

    marker.current = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map.current);

    map.current.on('click', (e) => {
      const { lng, lat } = e.lngLat;
      marker.current.setLngLat([lng, lat]);
      setLng(lng);
      setLat(lat);
      setSelectedLocation({ lng, lat });
    });

    geocoder.on('result', (e) => {
      const { center } = e.result;
      const [lng, lat] = center;
      marker.current.setLngLat([lng, lat]);
      setLng(lng);
      setLat(lat);
      setSelectedLocation({ lng, lat });
    });

    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    map.current.on('load', () => {
      map.current.resize();
    });

    map.current.on('error', (e) => {
      console.error('Mapbox error:', e);
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [isMounted, lng, lat, zoom]);

  const handleConfirm = () => {
    if (selectedLocation) {
      onLocationSelect(selectedLocation);
      onClose();
    }
  };

  return (
    <div>
      <div
        ref={mapContainer}
        style={{ height: '400px', width: '100%' }}
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