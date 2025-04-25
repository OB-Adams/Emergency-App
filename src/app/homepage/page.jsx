'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import EmergencyType from "../../components/client/EmergencyType";
import Header from "../../components/client/Header";
import { useEffect, useState, useRef } from "react";
import { Button } from "../../components/ui/button";
import EmergencyDesc from "../../components/client/EmergencyDesc";
import { toast } from "sonner";
import GooglePlacesAutocomplete from "../../components/client/GooglePlacesAutocomplete";
import GoogleMap from "../../components/client/GoogleMap";

export default function Homepage() {
  const { data: session, status } = useSession(); // Hook 1: useContext
  const router = useRouter(); // Hook 2: useContext
  const modalRef = useRef(null); // Hook 3: useRef

  // Define all hooks before any early returns
  const [emergencyType, setEmergencyType] = useState(''); // Hook 4: useState
  const [description, setDescription] = useState(''); // Hook 5: useState
  const [location, setLocation] = useState(''); // Hook 6: useState
  const [coordinates, setCoordinates] = useState(null); // Hook 7: useState
  const [isMapOpen, setIsMapOpen] = useState(false); // Hook 8: useState
  const [isFetchingLocation, setIsFetchingLocation] = useState(false); // Hook 9: useState

  useEffect(() => { // Hook 10: useEffect
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

  // Handle loading and authentication status after all hooks
  if (status === 'loading') {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  if (status === 'unauthenticated') {
    router.push('/login');
    return null;
  }

  // Rest of the component logic (only reached if status is 'authenticated')
  const reverseGeocode = async (lng, lat) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        return data.results[0].formatted_address;
      }
      return 'Unknown location';
    } catch (error) {
      console.error('Error reverse geocoding:', error);
      return 'Error retrieving address';
    }
  };

  const handleLocationChange = async (address, coords = null) => {
    if (coords) {
      setCoordinates(coords);
      setLocation(address);
    } else {
      setLocation(address);
      setCoordinates(null);
    }
  };

  const handleLocationSelect = async ({ lng, lat }) => {
    const address = await reverseGeocode(lng, lat);
    setCoordinates({ lng, lat });
    setLocation(address);
    setIsMapOpen(false);
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      setIsFetchingLocation(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { longitude, latitude } = position.coords;
          const address = await reverseGeocode(longitude, latitude);
          setCoordinates({ lng: longitude, lat: latitude });
          setLocation(address);
          setIsFetchingLocation(false);
          toast.success('Location updated to your current position.', {
            duration: 3000,
            className: 'bg-green-500 text-white border border-green-700 rounded-xl shadow-md',
            descriptionClassName: 'text-sm font-medium',
          });
        },
        (error) => {
          console.error('Error getting user location:', error);
          setIsFetchingLocation(false);
          toast.error('Unable to access your location. Please try again or use the map.', {
            duration: 3000,
            className: 'bg-red-600 text-white border border-red-800 rounded-xl shadow-md',
            descriptionClassName: 'text-sm font-medium',
          });
        }
      );
    } else {
      console.warn('Geolocation is not supported by this browser.');
      toast.error('Geolocation not supported by your browser.', {
        duration: 3000,
        className: 'bg-red-600 text-white border border-red-800 rounded-xl shadow-md',
        descriptionClassName: 'text-sm font-medium',
      });
    }
  };

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

  return (
    <div className="font-[family-name:var(--font-geist-sans)] min-h-screen">
      <Header />
      <p className="text-red-600 text-center font-bold text-sm sm:text-base md:text-lg lg:text-xl mt-2 sm:mt-4">
        Welcome, {session.user.name || 'Guest'}!
      </p>
      <main className="bg-white p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col lg:flex-row min-h-[calc(100vh-80px)] gap-4 sm:gap-6 md:gap-8 lg:gap-14 rounded-2xl border border-gray-200 m-2 sm:m-3.5">
        {/* Left Section: Emergency Type and Description */}
        <div className="w-full lg:w-1/2 m-1 sm:m-2">
          <EmergencyType
            value={emergencyType}
            onChange={(newType) => {
              console.log('New emergency type selected:', newType);
              setEmergencyType(newType);
            }}
          />
          {emergencyType === "Other" && (
            <div className="mt-2 sm:mt-2.5 h-auto border border-red-600 w-full">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-2xl p-2 sm:p-3 border-none focus:outline-none focus:ring-2 focus:ring-red-500 text-sm sm:text-base"
                placeholder="Name the emergency: eg. Stuck in elevator"
              />
            </div>
          )}
          <EmergencyDesc
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Right Section: Location and Proof */}
        <div className="w-full lg:w-1/2">
          {/* Location Section */}
          <div>
            <h2 className="text-base sm:text-lg md:text-xl font-bold">Location</h2>
            <hr className="mt-2 mb-3 sm:mt-2.5 sm:mb-4 border-gray-300" />
            <div className="flex flex-col sm:flex-row w-full items-start sm:items-center gap-2 sm:gap-0">
              <div className="flex items-center w-full">
                <img
                  src="/icons/location.svg"
                  alt="map pin"
                  className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-2.5"
                />
                <GooglePlacesAutocomplete
                  value={location}
                  onChange={handleLocationChange}
                />
              </div>
              <Button
                variant="outline"
                className="text-red-600 border-red-600 hover:bg-red-100 w-full sm:w-auto text-sm sm:text-base sm:ml-2.5"
                onClick={() => setIsMapOpen(true)}
              >
                Change
              </Button>
            </div>
            <div className="mt-2">
              {isFetchingLocation ? (
                <p className="text-gray-600 text-xs sm:text-sm">Fetching your location...</p>
              ) : (
                <button
                  onClick={handleUseCurrentLocation}
                  className="text-red-600 text-xs sm:text-sm hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 ml-0 sm:ml-10"
                  aria-label="Use your current location"
                >
                  Use Current Location
                </button>
              )}
            </div>
          </div>

          {/* Map Modal */}
          {isMapOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div
                ref={modalRef}
                className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full h-full sm:h-auto sm:max-w-3xl mx-2 sm:mx-4 border border-red-600"
              >
                <h2 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4">Select Location</h2>
                <GoogleMap
                  onLocationSelect={handleLocationSelect}
                  onClose={() => setIsMapOpen(false)}
                />
                <Button
                  className="mt-3 sm:mt-4 bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 w-full sm:w-auto text-sm sm:text-base"
                  onClick={() => setIsMapOpen(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}

          {/* Attach Proof Section */}
          <div className="mt-4 sm:mt-6">
            <h2 className="text-base sm:text-lg md:text-xl font-bold mb-2">Attach Proof</h2>
            <hr className="mt-2 mb-3 sm:mt-2.5 sm:mb-4 border-gray-300" />
            <div className="border-2 border-red-600 rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row justify-around items-center gap-2 sm:gap-4">
              <button
                onClick={proofClick}
                className="flex flex-col items-center hover:bg-red-50 p-3 sm:p-5 text-center"
              >
                <img
                  src="/icons/camera.png"
                  alt="Camera"
                  className="mb-1 w-12 h-12 sm:w-16 sm:h-16"
                />
                <span className="text-sm sm:text-lg text-red-600">Images</span>
              </button>
              <button
                onClick={proofClick}
                className="flex flex-col items-center hover:bg-red-50 p-3 sm:p-5 text-center"
              >
                <img
                  src="/icons/video.png"
                  alt="Video"
                  className="mb-1 w-12 h-12 sm:w-16 sm:h-16"
                />
                <span className="text-sm sm:text-lg text-red-600">Video Recording</span>
              </button>
              <button
                onClick={proofClick}
                className="flex flex-col items-center hover:bg-red-50 p-3 sm:p-5 text-center"
              >
                <img
                  src="/icons/voice.png"
                  alt="Mic"
                  className="mb-1 w-12 h-12 sm:w-16 sm:h-16"
                />
                <span className="text-sm sm:text-lg text-red-600">Voice Recording</span>
              </button>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 text-center mt-2">**Coming Soon**</p>
            <Button
              onClick={handleSubmit}
              className="mt-4 sm:mt-6 bg-red-600 text-white px-4 sm:px-6 py-2 rounded-3xl hover:bg-red-700 w-full sm:w-full text-sm sm:text-base"
            >
              Submit Emergency
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}