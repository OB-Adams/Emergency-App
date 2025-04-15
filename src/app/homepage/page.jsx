// src/app/homepage/page.jsx
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import EmergencyType from "../../components/client/EmergencyType";
import Header from "../../components/client/Header";
import { useEffect, useState, useRef } from "react";
import { Button } from "../../components/ui/button";
import EmergencyDesc from "../../components/client/EmergencyDesc";
import { toast } from "sonner";
import MapboxAutocomplete from "../../components/client/MapboxAutocomplete";
import MapboxMap from "../../components/client/MapboxMap";

export default function Homepage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const modalRef = useRef(null); // Ref to handle click-outside-to-close

  // Handle loading state
  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  // Protect the route: redirect to login if unauthenticated
  if (status === 'unauthenticated') {
    router.push('/login');
    return null;
  }

  // State and logic
  const [emergencyType, setEmergencyType] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState(''); // Human-readable address
  const [coordinates, setCoordinates] = useState(null); // { lng, lat }
  const [isMapOpen, setIsMapOpen] = useState(false);

  // Reverse geocode coordinates to get a human-readable address
  const reverseGeocode = async (lng, lat) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`
      );
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        return data.features[0].place_name;
      }
      return 'Unknown location';
    } catch (error) {
      console.error('Error reverse geocoding:', error);
      return 'Error retrieving address';
    }
  };

  // Handle location change from autocomplete
  const handleLocationChange = async (address, coords = null) => {
    if (coords) {
      // If coordinates are provided (from autocomplete suggestion)
      setCoordinates(coords);
      setLocation(address);
    } else {
      // If only address is provided (manual typing), keep coordinates null
      setLocation(address);
      setCoordinates(null);
    }
  };

  // Handle location selection from map
  const handleLocationSelect = async ({ lng, lat }) => {
    const address = await reverseGeocode(lng, lat);
    setCoordinates({ lng, lat });
    setLocation(address);
    setIsMapOpen(false); // Close the modal
  };

  // Handle click outside to close the modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsMapOpen(false);
      }
    };

    if (isMapOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMapOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emergencyType || !location) {
      toast.error('Please select an emergency type and location.', {
        duration: 3000,
        className: 'bg-red-600 text-white border border-red-800 rounded-xl shadow-md',
        descriptionClassName: 'text-sm font-medium',
      });
      return;
    }
    console.log({ emergencyType, description, location, coordinates });
    try {
      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emergencyType, description, location, coordinates }),
      });
      const data = await response.json();
      if (data.success) {
        toast.success('SOS request sent successfully!', {
          duration: 3000,
          className: 'bg-green-500 text-white border border-green-700 rounded-xl shadow-md',
          descriptionClassName: 'text-sm font-medium',
        });
      } else {
        toast.error('Failed to send request.', {
          duration: 3000,
          className: 'bg-red-600 text-white border border-red-800 rounded-xl shadow-md',
          descriptionClassName: 'text-sm font-medium',
        });
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.', {
        duration: 3000,
        className: 'bg-red-600 text-white border border-red-800 rounded-xl shadow-md',
        descriptionClassName: 'text-sm font-medium',
      });
    }
  };

  const proofClick = async (e) => {
    e.preventDefault();
    toast.error('Feature Coming Soon.', {
      duration: 3000,
      className: 'bg-red-600 text-white border border-red-800 rounded-xl shadow-md',
      descriptionClassName: 'text-sm font-medium',
    });
  };

  // JSX
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <Header />
      <p className="text-red-600 text-center font-bold text-sm sm:text-base md:text-xl">
        Welcome, {session.user.name || 'Guest'}!
      </p>
      <main className="bg-white p-4 flex min-h-screen gap-14 rounded-2xl border border-gray-200 m-3.5">
        <div className="flex-1/2 m-2">
          <EmergencyType
            value={emergencyType}
            onChange={(newType) => {
              console.log('New emergency type selected:', newType);
              setEmergencyType(newType);
            }}
          />
          {emergencyType === "Other" && (
            <div className="mt-2.5 h-auto border border-red-600 w-full">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-2xl p-2 border-none focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Name the emergency: eg. Stuck in elevator"
              />
            </div>
          )}
          <EmergencyDesc
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex-1/2">
          <div>
            <h2 className="text-lg font-bold">Location</h2>
            <hr className="mt-2.5 mb-4 border-gray-300" />
            <div className="flex w-full items-center">
              <img
                src="/icons/location.svg"
                alt="map pin"
                className="w-6 h-6 mr-2.5"
              />
              <MapboxAutocomplete
                value={location}
                onChange={handleLocationChange}
              />
              <Button
                variant="outline"
                className="text-red-600 border-red-600 hover:bg-red-100 ml-2.5"
                onClick={() => setIsMapOpen(true)}
              >
                Change
              </Button>
            </div>
          </div>

          {/* Custom Modal */}
          {isMapOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div
                ref={modalRef}
                className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full mx-4 border border-red-600"
              >
                <h2 className="text-lg font-bold mb-4">Select Location</h2>
                <MapboxMap
                  onLocationSelect={handleLocationSelect}
                  onClose={() => setIsMapOpen(false)}
                />
                <Button
                  className="mt-4 bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700"
                  onClick={() => setIsMapOpen(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}

          <div className="mt-6">
            <h2 className="text-lg font-bold mb-2">Attach proof</h2>
            <hr className="mt-2.5 mb-4 border-gray-300" />
            <div className="border-2 border-red-600 h-50 rounded-lg p-4 flex justify-around items-center">
              <button
                onClick={proofClick}
                className="flex flex-col items-center hover:bg-red-50 p-5 text-center"
              >
                <img
                  src="/icons/camera.png"
                  alt="Camera"
                  className="mb-1 w-16 h-16"
                />
                <span className="text-lg text-red-600">Click Pictures</span>
              </button>
              <button
                onClick={proofClick}
                className="flex flex-col items-center hover:bg-red-50 p-5 text-center"
              >
                <img
                  src="/icons/video.png"
                  alt="Video"
                  className="w-16 h-16 mb-1"
                />
                <span className="text-lg text-red-600">Video Recording</span>
              </button>
              <button
                onClick={proofClick}
                className="flex flex-col items-center hover:bg-red-50 p-5 text-center"
              >
                <img
                  src="/icons/voice.png"
                  alt="Mic"
                  className="w-16 h-16 mb-1"
                />
                <span className="text-lg text-red-600">Voice Recording</span>
              </button>
            </div>
            <p className="text-sm text-gray-500 text-center mt-2">**Coming Soon**</p>
            <Button
              onClick={handleSubmit}
              className="mt-6 bg-red-600 text-white px-6 py-2 rounded-3xl hover:bg-red-700 w-full md:w-auto"
            >
              Submit Emergency
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}